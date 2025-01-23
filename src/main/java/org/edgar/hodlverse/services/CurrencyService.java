package org.edgar.hodlverse.services;

import org.edgar.hodlverse.entities.Currency;
import org.edgar.hodlverse.repositories.CurrencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CurrencyService {

    @Autowired
    private CurrencyRepository currencyRepository;

    // Crear una nueva divisa
    public Currency createCurrency(Currency currency) {
        return currencyRepository.save(currency);
    }

    // Obtener una divisa por su ID
    public Optional<Currency> getCurrencyById(Long currencyId) {
        return currencyRepository.findById(currencyId);
    }

    // Obtener todas las divisas
    public List<Currency> getAllCurrencies() {
        return currencyRepository.findAll();
    }

    // Buscar una divisa por su ticker
    public Optional<Currency> getCurrencyByTicker(String ticker) {
        return currencyRepository.findByTicker(ticker);
    }

    // Actualizar una divisa
    public Currency updateCurrency(Currency currency) {
        return currencyRepository.save(currency);
    }

    // Eliminar una divisa por su ID
    public void deleteCurrency(Long currencyId) {
        currencyRepository.deleteById(currencyId);
    }
}
