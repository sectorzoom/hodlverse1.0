package org.edgar.hodlverse.controllers;

import org.edgar.hodlverse.entities.Currency;
import org.edgar.hodlverse.services.CurrencyService;
import org.edgar.hodlverse.services.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/currencies") // Ruta base para el controlador
public class CurrencyController {

    private final CurrencyService currencyService;

    public CurrencyController(CurrencyService currencyService) {
        this.currencyService = currencyService;
    }

    // Obtener todas las monedas
    @GetMapping
    public ResponseEntity<List<Currency>> all() {
        List<Currency> currencies = currencyService.findAll();
        return ResponseEntity.ok(currencies);
    }

    // Crear una nueva moneda
    @PostMapping
    public ResponseEntity<Currency> newCurrency(@RequestBody Currency newCurrency) {
        Currency savedCurrency = currencyService.save(newCurrency);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCurrency);
    }

    // Obtener una moneda específica por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Currency> one(@PathVariable Long id) {
        Currency currency = currencyService.findById(id)
                .orElseThrow(() -> new NotFoundException("Moneda con ID " + id + " no encontrada."));
        return ResponseEntity.ok(currency);
    }

    // Actualizar una moneda existente
    @PutMapping("/{id}")
    public ResponseEntity<Currency> replaceCurrency(@RequestBody Currency newCurrency, @PathVariable Long id) {
        return currencyService.findById(id)
                .map(currency -> {
                    currency.setTicker(newCurrency.getTicker());
                    currency.setName(newCurrency.getName());
                    currency.setImage(newCurrency.getImage());
                    return ResponseEntity.ok(currencyService.save(currency));
                })
                .orElseGet(() -> {
                    newCurrency.setCurrencyId(id);
                    return ResponseEntity.status(HttpStatus.CREATED).body(currencyService.save(newCurrency));
                });
    }

    // Eliminar una moneda por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCurrency(@PathVariable Long id) {
        Currency currency = currencyService.findById(id)
                .orElseThrow(() -> new NotFoundException("Moneda con ID " + id + " no encontrada."));

        currencyService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    /*@GetMapping
    public List<Map<String, Object>> all() {
        return currencyService.findAll().stream()
                .map(currency -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("currencyId", currency.getCurrencyId());
                    map.put("ticker", currency.getTicker());
                    map.put("name", currency.getName());
                    map.put("image", currency.getImage());
                    return map;
                })
                .collect(Collectors.toList());
    }*/



}
