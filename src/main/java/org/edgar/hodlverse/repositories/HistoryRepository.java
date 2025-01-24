package org.edgar.hodlverse.repositories;

import org.edgar.hodlverse.entities.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {
    List<History> findByCurrencyId(Long currencyId);

    List<History> findByDate(LocalDate date);

    List<History> findByDateBefore(LocalDate date);
    // Add custom queries here if needed
}

