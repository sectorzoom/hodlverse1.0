package org.edgar.hodlverse.controllers;

import org.edgar.hodlverse.entities.History;
import org.edgar.hodlverse.services.HistoryService;
import org.edgar.hodlverse.services.NotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/history") // Ruta base para el controlador
public class HistoryController {

    private final HistoryService historyService;

    public HistoryController(HistoryService historyService) {
        this.historyService = historyService;
    }

    // Obtener todas las entradas de historial
    @GetMapping
    public List<History> all() {
        return historyService.findAll();
    }

    // Crear una nueva entrada de historial
    @PostMapping
    public History newHistory(@RequestBody History newHistory) {
        return historyService.save(newHistory);
    }

    // Obtener una entrada de historial específica por su ID
    @GetMapping("/{id}")
    public History one(@PathVariable Long id) {
        return historyService.findById(id)
                .orElseThrow(() -> new NotFoundException("Historial con ID " + id + " no encontrado."));
    }

    // Actualizar una entrada de historial existente
    @PutMapping("/{id}")
    public History replaceHistory(@RequestBody History newHistory, @PathVariable Long id) {
        return historyService.findById(id)
                .map(history -> {
                    // Actualizar todos los campos
                    history.setCurrentPrice(newHistory.getCurrentPrice());
                    history.setMarketCap(newHistory.getMarketCap());
                    history.setMarketCapRank(newHistory.getMarketCapRank());
                    history.setTotalVolume(newHistory.getTotalVolume());
                    history.setHigh24h(newHistory.getHigh24h());
                    history.setLow24h(newHistory.getLow24h());
                    history.setPriceChange24h(newHistory.getPriceChange24h());
                    history.setPriceChangePercentage24h(newHistory.getPriceChangePercentage24h());
                    history.setMarketCapChange24h(newHistory.getMarketCapChange24h());
                    history.setMarketCapChangePercentage24h(newHistory.getMarketCapChangePercentage24h());
                    history.setTotalSupply(newHistory.getTotalSupply());
                    history.setLastUpdated(newHistory.getLastUpdated());
                    history.setCurrency(newHistory.getCurrency());
                    return historyService.save(history);
                })
                .orElseGet(() -> {
                    newHistory.setHistoryId(id);
                    return historyService.save(newHistory);
                });
    }

    // Eliminar una entrada de historial por su ID
    @DeleteMapping("/{id}")
    public void deleteHistory(@PathVariable Long id) {
        if (historyService.findById(id).isEmpty()) {
            throw new NotFoundException("Historial con ID " + id + " no encontrado.");
        }
        historyService.deleteById(id);
    }
}