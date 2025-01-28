package org.edgar.hodlverse.controllers;

import org.edgar.hodlverse.entities.History;
import org.edgar.hodlverse.repositories.HistoryRepository;
import org.edgar.hodlverse.services.HistoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/history") // Ruta base para el controlador
public class HistoryController {

    private final HistoryService historyService;

    public HistoryController(HistoryRepository repository, HistoryService historyService) {
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
                .orElseThrow(() -> new RuntimeException("Historial con ID " + id + " no encontrado."));
    }

    // Actualizar una entrada de historial existente
    @PutMapping("/{id}")
    public History replaceHistory(@RequestBody History newHistory, @PathVariable Long id) {
        return historyService.findById(id)
                .map(history -> {
                    history.setCurrency(newHistory.getCurrency());
                    history.setPrice(newHistory.getPrice());
                    history.setDate(newHistory.getDate());
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
        historyService.deleteById(id);
    }
}
