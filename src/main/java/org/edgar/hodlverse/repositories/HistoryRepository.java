package org.edgar.hodlverse.repositories;
import org.edgar.hodlverse.entities.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {
    List<History> findAllByOrderByPriceChangePercentage24hDesc(); // Ordenar por priceChangePercentage24h descendente
    List<History> findAllByOrderByPriceChangePercentage24hAsc(); // Ordenar por priceChangePercentage24h ascendente
    List<History> findAllByOrderByMarketCapRankAsc(); //Ordenar por marketCapRank de forma ascendente
    List<History> findAllByOrderByTotalVolumeDesc(); // Ordenar por totalVolume descendente

}

