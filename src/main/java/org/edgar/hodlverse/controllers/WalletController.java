package org.edgar.hodlverse.controllers;

import org.edgar.hodlverse.entities.Wallet;
import org.edgar.hodlverse.services.NotFoundException;
import org.edgar.hodlverse.services.WalletService;
import org.springframework.web.bind.annotation.*;

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
}
