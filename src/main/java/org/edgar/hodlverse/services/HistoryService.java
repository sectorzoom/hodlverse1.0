package org.edgar.hodlverse.services;

import org.edgar.hodlverse.entities.History;
import org.edgar.hodlverse.repositories.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class HistoryService {

    @Autowired
    private HistoryRepository historyRepository;

    // Crear un nuevo historial
    public History createHistory(History history) {
        return historyRepository.save(history);
    }

    // Obtener un historial por su ID
    public Optional<History> getHistoryById(Long historyId) {
        return historyRepository.findById(historyId);
    }

    // Obtener todos los historiales
    public List<History> getAllHistories() {
        return historyRepository.findAll();
    }

    // Obtener historiales por el ID de la divisa
    public List<History> getHistoriesByCurrencyId(Long currencyId) {
        return historyRepository.findByCurrencyId(currencyId);
    }

    // Obtener historiales por fecha
    public List<History> getHistoriesByDate(LocalDate date) {
        return historyRepository.findByDate(date);
    }

    // Actualizar un historial
    public History updateHistory(History history) {
        return historyRepository.save(history);
    }

    // Eliminar un historial por su ID
    public void deleteHistoryById(Long historyId) {
        historyRepository.deleteById(historyId);
    }

    // Eliminar historiales por el ID de la divisa
    public void deleteHistoriesByCurrencyId(Long currencyId) {
        List<History> histories = historyRepository.findByCurrencyId(currencyId);
        historyRepository.deleteAll(histories);
    }

    // Eliminar historiales anteriores a una fecha específica
    public void deleteHistoriesBeforeDate(LocalDate date) {
        List<History> oldHistories = historyRepository.findByDateBefore(date);
        historyRepository.deleteAll(oldHistories);
    }
}
