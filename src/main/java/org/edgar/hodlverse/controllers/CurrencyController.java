package org.edgar.hodlverse.controllers;

import org.edgar.hodlverse.entities.Currency;
import org.edgar.hodlverse.services.CurrencyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/currencies") // Ruta base para el controlador
public class CurrencyController {

    private final CurrencyService currencyService;

    public CurrencyController(CurrencyService currencyService) {
        this.currencyService = currencyService;
    }

    // Obtener todas las monedas
    @GetMapping
    public List<Currency> all() {
        return currencyService.findAll();
    }

    // Crear una nueva moneda
    @PostMapping
    public Currency newCurrency(@RequestBody Currency newCurrency) {
        return currencyService.save(newCurrency);
    }

    // Obtener una moneda específica por su ID
    @GetMapping("/{id}")
    public Currency one(@PathVariable Long id) {
        return currencyService.findById(id)
                .orElseThrow(() -> new RuntimeException("Moneda con ID " + id + " no encontrada."));
    }

    // Actualizar una moneda existente
    @PutMapping("/{id}")
    public Currency replaceCurrency(@RequestBody Currency newCurrency, @PathVariable Long id) {
        return currencyService.findById(id)
                .map(currency -> {
                    currency.setTicker(newCurrency.getTicker());
                    currency.setSymbol(newCurrency.getSymbol());
                    currency.setName(newCurrency.getName());
                    currency.setImage(newCurrency.getImage());
                    currency.setCurrentPrice(newCurrency.getCurrentPrice());
                    currency.setMarketCap(newCurrency.getMarketCap());
                    currency.setMarketCapRank(newCurrency.getMarketCapRank());
                    currency.setTotalVolume(newCurrency.getTotalVolume());
                    currency.setHigh24h(newCurrency.getHigh24h());
                    currency.setLow24h(newCurrency.getLow24h());
                    currency.setPriceChange24h(newCurrency.getPriceChange24h());
                    currency.setPriceChangePercentage24h(newCurrency.getPriceChangePercentage24h());
                    currency.setMarketCapChange24h(newCurrency.getMarketCapChange24h());
                    currency.setMarketCapChangePercentage24h(newCurrency.getMarketCapChangePercentage24h());
                    currency.setTotalSupply(newCurrency.getTotalSupply());
                    currency.setAth(newCurrency.getAth());
                    currency.setAthChangePercentage(newCurrency.getAthChangePercentage());
                    currency.setAthDate(newCurrency.getAthDate());
                    currency.setAtl(newCurrency.getAtl());
                    currency.setAtlChangePercentage(newCurrency.getAtlChangePercentage());
                    currency.setAtlDate(newCurrency.getAtlDate());
                    currency.setRoi(newCurrency.getRoi());
                    currency.setLastUpdated(newCurrency.getLastUpdated());
                    return currencyService.save(currency);
                })
                .orElseGet(() -> {
                    newCurrency.setCurrencyId(id);
                    return currencyService.save(newCurrency);
                });
    }

    // Eliminar una moneda por su ID
    @DeleteMapping("/{id}")
    public void deleteCurrency(@PathVariable Long id) {
        currencyService.deleteById(id);
    }
}
