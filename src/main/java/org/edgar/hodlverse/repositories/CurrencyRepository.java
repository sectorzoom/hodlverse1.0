package org.edgar.hodlverse.repositories;

import org.edgar.hodlverse.entities.Currency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CurrencyRepository extends JpaRepository<Currency, Long> {
    // Métodos personalizados (si los necesitas)
    Optional<Currency> findByTicker(String ticker);// Buscar divisa por su ticker (ej: "BTC")
    Optional<Currency> findByNameIgnoreCase(String name);
}