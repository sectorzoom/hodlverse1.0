package org.edgar.hodlverse.repositories;

import org.edgar.hodlverse.entities.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, Long> {
    // Métodos personalizados (si los necesitas)
    List<Wallet> findByUserUserId(Long userId); // Buscar wallets por ID de usuario
}