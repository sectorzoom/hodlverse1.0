package org.edgar.hodlverse.repositories;
import org.edgar.hodlverse.entities.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {
    List<History> findAllByOrderByPriceChangePercentage24hDesc(); // Ordenar por priceChangePercentage24h descendente
    List<History> findAllByOrderByPriceChangePercentage24hAsc(); // Ordenar por priceChangePercentage24h ascendente
    List<History> findAllByOrderByMarketCapRankAsc(); //Ordenar por marketCapRank de forma ascendente
    List<History> findAllByOrderByTotalVolumeDesc(); // Ordenar por totalVolume descendente

    @Query("SELECT h FROM History h WHERE h.currency.currencyId = :currencyId AND h.lastUpdated > :start ORDER BY h.lastUpdated ASC")
    Optional<History> findFirstByCurrencyIdAndLastUpdatedAfterOrderByLastUpdatedAsc(@Param("currencyId") Long currencyId, @Param("start") LocalDateTime start);

    @Query("SELECT h FROM History h WHERE h.currency.currencyId = :currencyId AND h.lastUpdated < :end ORDER BY h.lastUpdated DESC")
    Optional<History> findFirstByCurrencyIdAndLastUpdatedBeforeOrderByLastUpdatedDesc(@Param("currencyId") Long currencyId, @Param("end") LocalDateTime end);

}

