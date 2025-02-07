package org.edgar.hodlverse.services;

import org.edgar.hodlverse.entities.Balance;
import org.edgar.hodlverse.entities.Currency;
import org.edgar.hodlverse.entities.History;
import org.edgar.hodlverse.entities.Wallet;
import org.edgar.hodlverse.repositories.HistoryRepository;
import org.edgar.hodlverse.repositories.WalletRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class WalletService {

    private final WalletRepository walletRepository;
    private final HistoryRepository historyRepository;

    public WalletService(WalletRepository walletRepository, HistoryRepository historyRepository) {
        this.walletRepository = walletRepository;
        this.historyRepository = historyRepository;
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
}