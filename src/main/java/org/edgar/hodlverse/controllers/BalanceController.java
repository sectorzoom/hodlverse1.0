package org.edgar.hodlverse.controllers;

import org.edgar.hodlverse.entities.Balance;
import org.edgar.hodlverse.services.BalanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/balances")
public class BalanceController {

    @Autowired
    private BalanceService balanceService;

    // Obtener todos los balances de una wallet
    @GetMapping("/wallet/{walletId}")
    public List<Balance> getBalancesByWalletId(@PathVariable Long walletId) {
        return balanceService.getBalancesByWalletId(walletId);
    }

    // Obtener todos los balances de una divisa
    @GetMapping("/currency/{currencyId}")
    public List<Balance> getBalancesByCurrencyId(@PathVariable Long currencyId) {
        return balanceService.getBalancesByCurrencyId(currencyId);
    }

    // Obtener un balance por su ID
    @GetMapping("/{id}")
    public Optional<Balance> getBalanceById(@PathVariable Long id) {
        return balanceService.getBalanceById(id);
    }

    // Crear un nuevo balance
    @PostMapping
    public Balance createBalance(@RequestBody Balance balance) {
        return balanceService.createBalance(balance);
    }

    // Actualizar un balance existente
    @PutMapping("/{id}")
    public Balance updateBalance(@RequestBody Balance balance, @PathVariable Long id) {
        // Buscar el balance existente
        Optional<Balance> existingBalance = balanceService.getBalanceById(id);

        if (existingBalance.isPresent()) {
            Balance updatedBalance = existingBalance.get();
            // Actualizar los campos necesarios, excepto el ID
            updatedBalance.setWalletAmount(balance.getWalletAmount()); // Ejemplo de campo a actualizar
            updatedBalance.setDescription(balance.getDescription()); // Otro campo

            // Guardar los cambios
            return balanceService.updateBalance(updatedBalance);
        } else {
            throw new RuntimeException("Balance con ID " + id + " no encontrado.");
        }
    }


    // Eliminar un balance por su ID
    @DeleteMapping("/{id}")
    public void deleteBalance(@PathVariable Long id) {
        balanceService.deleteBalance(id);
    }
}

