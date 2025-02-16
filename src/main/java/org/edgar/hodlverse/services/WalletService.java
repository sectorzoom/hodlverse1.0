package org.edgar.hodlverse.services;

import org.edgar.hodlverse.entities.*;
import org.edgar.hodlverse.repositories.HistoryRepository;
import org.edgar.hodlverse.repositories.TransactionRepository;
import org.edgar.hodlverse.repositories.WalletRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WalletService {

    private final WalletRepository walletRepository;
    private final HistoryRepository historyRepository;
    private final TransactionRepository transactionRepository;
    private final TransactionService transactionService;

    public WalletService(WalletRepository walletRepository, HistoryRepository historyRepository, TransactionRepository transactionRepository, TransactionService transactionService) {
        this.walletRepository = walletRepository;
        this.historyRepository = historyRepository;
        this.transactionRepository = transactionRepository;
        this.transactionService = transactionService;
    }

    // Obtener todas las billeteras
    public List<Wallet> findAll() {
        return walletRepository.findAll();
    }

    // Guardar una nueva billetera
    public Wallet save(Wallet wallet) {
        return walletRepository.save(wallet);
    }

    // Buscar una billetera por su ID
    public Optional<Wallet> findById(Long id) {
        return walletRepository.findById(id);
    }

    // Eliminar una billetera por su ID
    public void deleteById(Long id) {
        walletRepository.deleteById(id);
    }

    public BigDecimal calculateTotalWalletValueInUSD(Long userId) {
        Wallet wallet = walletRepository.findByUserUserId(userId)
                .orElseThrow(() -> new RuntimeException("Wallet not found for user: " + userId));

        List<Balance> balances = wallet.getBalances();
        BigDecimal totalValue = BigDecimal.ZERO;

        for (Balance balance : balances) {
            Currency currency = balance.getCurrency();
            BigDecimal exchangeRate = getLatestExchangeRate(currency);

            BigDecimal valueInUSD = balance.getWalletAmount().multiply(exchangeRate);
            totalValue = totalValue.add(valueInUSD);
        }

        return totalValue;
    }

    private BigDecimal getLatestExchangeRate(Currency currency) {
        return historyRepository.findTopByCurrencyOrderByLastUpdatedDesc(currency)
                .map(History::getCurrentPrice)
                .orElseThrow(() -> new RuntimeException("Exchange rate not found for currency: " + currency.getTicker()));
    }

    public List<Currency> getCurrenciesByUserId(Long userId) {
        Optional<Wallet> walletOpt = walletRepository.findByUserUserId(userId);

        if (walletOpt.isEmpty()) {
            throw new RuntimeException("No se encontró una billetera para el usuario con ID: " + userId);
        }

        Wallet wallet = walletOpt.get();

        return wallet.getBalances().stream()
                .map(Balance::getCurrency) // Obtener las divisas de cada balance
                .distinct() // Evitar duplicados
                .collect(Collectors.toList());
    }

    public BigDecimal calculateUserBalanceOnDate(Long userId, LocalDate targetDate) {
        // Obtener todas las transacciones del usuario hasta la fecha objetivo
        List<Transaction> transactions = transactionService.findTransactionsByUserIdAndTransactionDateGreaterThanEqual(userId, targetDate);

        if (transactions.isEmpty()) {
            // Si no hay transacciones, el balance es 0
            return BigDecimal.ZERO;
        }

        // Crear un mapa para almacenar las cantidades netas de cada divisa
        Map<org.edgar.hodlverse.entities.Currency, BigDecimal> balances = new HashMap<>();

        for (Transaction transaction : transactions) {
            // Sumar las cantidades recibidas (destinationCurrency)
            balances.merge(
                    transaction.getDestinationCurrency(),
                    transaction.getDestinationTransactionAmount(),
                    BigDecimal::add
            );

            // Restar las cantidades gastadas (originCurrency)
            balances.merge(
                    transaction.getOriginCurrency(),
                    transaction.getOriginTransactionAmount().negate(),
                    BigDecimal::add
            );
        }

        // Calcular el valor total en USD basado en los precios históricos
        BigDecimal totalBalance = BigDecimal.ZERO;

        for (Map.Entry<org.edgar.hodlverse.entities.Currency, BigDecimal> entry : balances.entrySet()) {
            org.edgar.hodlverse.entities.Currency currency = entry.getKey();
            BigDecimal quantity = entry.getValue();

            // Saltar si la cantidad es cero
            if (quantity.compareTo(BigDecimal.ZERO) == 0) {
                continue;
            }

            // Convertir LocalDate a LocalDateTime antes de llamar al repositorio
            LocalDateTime targetDateTime = targetDate.atStartOfDay();

            // Obtener el precio histórico de la divisa en la fecha objetivo
            Optional<History> historyOptional = historyRepository.findLatestHistoryByCurrencyBeforeDate(currency, LocalDate.from(targetDateTime));

            if (historyOptional.isPresent()) {
                History history = historyOptional.get();
                BigDecimal price = history.getCurrentPrice();
                totalBalance = totalBalance.add(quantity.multiply(price));
            } else {
                // Si no hay datos históricos, asumir un precio de 0 para esa divisa
                totalBalance = totalBalance.add(BigDecimal.ZERO);
            }
        }

        return totalBalance;
    }

}