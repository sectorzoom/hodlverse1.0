package org.edgar.hodlverse.controllers;

import org.edgar.hodlverse.entities.Currency;
import org.edgar.hodlverse.entities.Wallet;
import org.edgar.hodlverse.services.NotFoundException;
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

    public WalletController(WalletService walletService) {
        this.walletService = walletService;
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

    @GetMapping("/totalBalance/{userId}/on/{date}")
    public ResponseEntity<BigDecimal> getUserBalanceOnDate(
            @PathVariable Long userId,
            @PathVariable String date) {

        try {
            // Parsear la fecha desde la URL
            LocalDateTime targetDate = LocalDateTime.parse(date);

            // Calcular el balance total del usuario en la fecha especificada
            BigDecimal totalBalance = walletService.calculateUserBalanceOnDate(userId, LocalDate.from(targetDate));

            if (totalBalance.compareTo(BigDecimal.ZERO) == 0) {
                // Si el balance es 0, lanzar una excepción o devolver un mensaje informativo
                throw new NotFoundException("No se encontraron datos para el usuario con ID " + userId + " en la fecha " + date);
            }

            // Devolver el balance total como respuesta
            return ResponseEntity.ok(totalBalance);

        } catch (DateTimeParseException e) {
            // Manejar errores de formato de fecha
            return ResponseEntity.badRequest().body(BigDecimal.ZERO); // O puedes personalizar el mensaje de error
        } catch (NotFoundException e) {
            // Manejar casos donde no se encuentren datos
            return ResponseEntity.status(404).body(BigDecimal.ZERO); // O puedes personalizar el mensaje de error
        }
    }

}
