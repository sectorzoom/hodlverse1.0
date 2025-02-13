package org.edgar.hodlverse.controllers;

import org.edgar.hodlverse.entities.Balance;
import org.edgar.hodlverse.services.BalanceService;
import org.edgar.hodlverse.services.NotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/balances") // Ruta base para el controlador
public class BalanceController {

    private final BalanceService balanceService;

    public BalanceController(BalanceService balanceService) {
        this.balanceService = balanceService;
    }

    // Obtener todos los balances
    @GetMapping
    public List<Balance> all() {
        return balanceService.findAll();
    }

    // Crear un nuevo balance
    @PostMapping
    public Balance newBalance(@RequestBody Balance newBalance) {
        return balanceService.save(newBalance);
    }

    // Obtener un balance específico por su ID
    @GetMapping("/{id}")
    public Balance findBalanceById(@PathVariable Long id) {
        return balanceService.findById(id)
                .orElseThrow(() -> new NotFoundException("Balance con ID " + id + " no encontrado."));
    }

    // Actualizar un balance existente
    @PutMapping("/{id}")
    public Balance replaceBalance(@RequestBody Balance newBalance, @PathVariable Long id) {
        return balanceService.findById(id)
                .map(balance -> {
                    balance.setWalletAmount(newBalance.getWalletAmount());
                    balance.setWallet(newBalance.getWallet());
                    balance.setCurrency(newBalance.getCurrency());
                    return balanceService.save(balance);
                })
                .orElseGet(() -> {
                    newBalance.setBalanceId(id);
                    return balanceService.save(newBalance);
                });
    }

    // Eliminar un balance por su ID
    @DeleteMapping("/{id}")
    public void deleteBalance(@PathVariable Long id) {
        if (balanceService.findById(id).isEmpty()) {
            throw new NotFoundException("Usuario con ID " + id + " no encontrado.");
        }
        balanceService.deleteById(id);
    }

    @GetMapping("/currency/{currencyId}")
    public List<Balance> balancesByCurrency(@PathVariable Long currencyId) {
        if (balanceService.findByCurrencyId(currencyId).isEmpty()) {
            throw new NotFoundException("Divisa con ID " + currencyId + " no encontrado.");
        }
        return balanceService.findByCurrencyId(currencyId);
    }

}
