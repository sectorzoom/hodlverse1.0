package org.edgar.hodlverse.services;

import org.edgar.hodlverse.entities.History;
import org.edgar.hodlverse.repositories.HistoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HistoryService {

    private final HistoryRepository historyRepository;

    public HistoryService(HistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }

    // Obtener todas las entradas de historial
    public List<History> findAll() {
        return historyRepository.findAll();
    }

    // Guardar una nueva entrada de historial
    public History save(History history) {
        return historyRepository.save(history);
    }

    // Buscar una entrada de historial por su ID
    public Optional<History> findById(Long id) {
        return historyRepository.findById(id);
    }

    // Eliminar una entrada de historial por su ID
    public void deleteById(Long id) {
        historyRepository.deleteById(id);
    }

    // Obtener todas las monedas ordenadas por priceChangePercentage24h de forma descendente
    public List<History> getCurrenciesOrderedByPriceChangePercentage() {
        return historyRepository.findAllByOrderByPriceChangePercentage24hDesc();
    }

    // Obtener todas las monedas ordenadas por priceChangePercentage24h de forma ascendente
    public List<History> getCurrenciesOrderedByPriceChangePercentageAsc() {
        return historyRepository.findAllByOrderByPriceChangePercentage24hAsc();
    }

    //Obtener todas las monedas ordenadas por marketCapRank de forma ascendente
    public List<History> getCoinsOrderedByMarketCapRankAsc(){
        return historyRepository.findAllByOrderByMarketCapRankAsc();
    }

    // Obtener todas las monedas ordenadas por totalVolume de forma descendente
    public List<History> getCurrenciesOrderedByTotalVolumeDesc() {
        return historyRepository.findAllByOrderByTotalVolumeDesc();
    }

}