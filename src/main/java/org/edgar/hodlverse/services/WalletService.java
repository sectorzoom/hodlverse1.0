package org.edgar.hodlverse.services;

import org.edgar.hodlverse.entities.Wallet;
import org.edgar.hodlverse.repositories.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WalletService {

    @Autowired
    private WalletRepository walletRepository;

    // Crear una nueva wallet
    public Wallet createWallet(Wallet wallet) {
        return walletRepository.save(wallet);
    }

    // Obtener una wallet por su ID
    public Optional<Wallet> getWalletById(Long walletId) {
        return walletRepository.findById(walletId);
    }

    // Obtener todas las wallets de un usuario
    public List<Wallet> getWalletsByUserId(Long userId) {
        return walletRepository.findByUserUserId(userId);
    }

    // Actualizar una wallet
    public Wallet updateWallet(Wallet wallet) {
        return walletRepository.save(wallet);
    }

    // Eliminar una wallet por su ID
    public void deleteWallet(Long walletId) {
        walletRepository.deleteById(walletId);
    }
}