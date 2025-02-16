package org.edgar.hodlverse.controllers;

import org.edgar.hodlverse.entities.Currency;
import org.edgar.hodlverse.entities.Transaction;
import org.edgar.hodlverse.entities.Wallet;
import org.edgar.hodlverse.services.NotFoundException;
import org.edgar.hodlverse.services.TransactionService;
import org.edgar.hodlverse.services.WalletService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.List;

@RestController
@RequestMapping("/wallets") // Ruta base para el controlador
public class WalletController {

    private final WalletService walletService;
    private final TransactionService transactionService;

    public WalletController(WalletService walletService, TransactionService transactionService) {
        this.walletService = walletService;
        this.transactionService = transactionService;
    }

    // Obtener todas las billeteras
    @GetMapping
    public List<Wallet> all() {
        return walletService.findAll();
    }

    // Crear una nueva billetera
    @PostMapping
    public Wallet newWallet(@RequestBody Wallet newWallet) {
        return walletService.save(newWallet);
    }

    // Obtener una billetera específica por su ID
    @GetMapping("/{id}")
    public Wallet one(@PathVariable Long id) {
        return walletService.findById(id)
                .orElseThrow(() -> new NotFoundException("Billetera con ID " + id + " no encontrada."));
    }

    // Actualizar una billetera existente
    @PutMapping("/{id}")
    public Wallet replaceWallet(@RequestBody Wallet newWallet, @PathVariable Long id) {
        return walletService.findById(id)
                .map(wallet -> {
                    wallet.setWalletName(newWallet.getWalletName());
                    wallet.setCreationDate(newWallet.getCreationDate());
                    wallet.setUser(newWallet.getUser());
                    return walletService.save(wallet);
                })
                .orElseGet(() -> {
                    newWallet.setWalletId(id);
                    return walletService.save(newWallet);
                });
    }

    // Eliminar una billetera por su ID
    @DeleteMapping("/{id}")
    public void deleteWallet(@PathVariable Long id) {
        if (walletService.findById(id).isEmpty()) {
            throw new NotFoundException("Wallet con ID " + id + " no encontrada.");
        }
        walletService.deleteById(id);
    }

    @GetMapping("/totalBalance/{userId}")
    public ResponseEntity<BigDecimal> getWalletValue(@PathVariable Long userId) {
        BigDecimal totalValue = walletService.calculateTotalWalletValueInUSD(userId);
        return ResponseEntity.ok(totalValue);
    }

    @GetMapping("/{userId}/currencies")
    public List<Currency> getCurrenciesByUserId(@PathVariable Long userId) {
        return walletService.getCurrenciesByUserId(userId);
    }

    // Endpoint para calcular el balance total de un usuario en una fecha específica
    @GetMapping("/user/{userId}/balance/on/{date}")
    public ResponseEntity<BigDecimal> getUserBalanceOnSpecificDate(
            @PathVariable Long userId,
            @PathVariable String date) {

        try {
            // Parsear la fecha desde la URL
            LocalDate targetDate = LocalDate.parse(date);

            // Obtener el balance actual del usuario
            BigDecimal currentBalance = walletService.calculateTotalWalletValueInUSD(userId);

            // Obtener todas las transacciones del usuario ordenadas por fecha descendente
            List<Transaction> transactions = transactionService.findTransactionsByUserIdAndTransactionDateGreaterThanEqual(userId, targetDate);

            // Retroceder en el tiempo aplicando los cambios inversos de cada transacción
            BigDecimal historicalBalance = calculateHistoricalBalance(currentBalance, transactions, targetDate);

            return ResponseEntity.ok(historicalBalance);

        } catch (NotFoundException e) {
            // Manejar caso donde no se encuentran datos
            return ResponseEntity.status(404).body(BigDecimal.ZERO);

        } catch (Exception e) {
            // Manejar otros errores
            return ResponseEntity.badRequest().body(BigDecimal.ZERO);
        }
    }

    // Método privado para calcular el balance histórico
    private BigDecimal calculateHistoricalBalance(BigDecimal currentBalance, List<Transaction> transactions, LocalDate targetDate) {
        // Inicializar el balance con el valor actual
        BigDecimal balance = currentBalance;

        // Recorrer las transacciones en orden cronológico inverso
        for (Transaction transaction : transactions) {
            if (!transaction.getTransactionDate().isBefore(targetDate)) {
                // Si la transacción ocurrió después o en la fecha objetivo, omitirla
                continue;
            }

            // Ajustar el balance según el tipo de transacción
            switch (transaction.getTransactionType()) {
                case "buy":
                    // Restar el monto gastado y sumar el monto recibido
                    balance = balance.subtract(transaction.getOriginTransactionAmount().multiply(transaction.getOriginUnitPrice()));
                    balance = balance.add(transaction.getDestinationTransactionAmount().multiply(transaction.getDestinationUnitPrice()));
                    break;

                case "sell":
                    // Sumar el monto recibido y restar el monto enviado
                    balance = balance.add(transaction.getOriginTransactionAmount().multiply(transaction.getOriginUnitPrice()));
                    balance = balance.subtract(transaction.getDestinationTransactionAmount().multiply(transaction.getDestinationUnitPrice()));
                    break;

                case "exchange":
                    // Restar el monto enviado y sumar el monto recibido
                    balance = balance.subtract(transaction.getOriginTransactionAmount().multiply(transaction.getOriginUnitPrice()));
                    balance = balance.add(transaction.getDestinationTransactionAmount().multiply(transaction.getDestinationUnitPrice()));
                    break;

                default:
                    // Ignorar transacciones con tipos desconocidos
                    continue;
            }
        }

        return balance;
    }
}
