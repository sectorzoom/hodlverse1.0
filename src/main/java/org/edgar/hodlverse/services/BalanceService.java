package org.edgar.hodlverse.services;

import org.edgar.hodlverse.entities.Balance;
import org.edgar.hodlverse.repositories.BalanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BalanceService {

    @Autowired
    private BalanceRepository balanceRepository;

    // Crear un nuevo balance
    public Balance createBalance(Balance balance) {
        return balanceRepository.save(balance);
    }

    // Obtener un balance por su ID
    public Optional<Balance> getBalanceById(Long balanceId) {
        return balanceRepository.findById(balanceId);
    }

    // Obtener todos los balances de una wallet
    public List<Balance> getBalancesByWalletId(Long walletId) {
        return balanceRepository.findByWalletWalletId(walletId);
    }

    // Obtener todos los balances de una divisa
    public List<Balance> getBalancesByCurrencyId(Long currencyId) {
        return balanceRepository.findByCurrencyCurrencyId(currencyId);
    }

    // Actualizar un balance
    public Balance updateBalance(Balance balance) {
        return balanceRepository.save(balance);
    }

    // Eliminar un balance por su ID
    public void deleteBalance(Long balanceId) {
        balanceRepository.deleteById(balanceId);
    }
}
