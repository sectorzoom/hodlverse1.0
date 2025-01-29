package org.edgar.hodlverse.services;

import org.edgar.hodlverse.entities.Currency;
import org.edgar.hodlverse.repositories.CurrencyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CurrencyService {

    private final CurrencyRepository currencyRepository;

    public CurrencyService(CurrencyRepository currencyRepository) {
        this.currencyRepository = currencyRepository;
    }

    // Obtener todas las monedas
    public List<Currency> findAll() {
        return currencyRepository.findAll();
    }

    // Guardar una nueva moneda
    public Currency save(Currency currency) {
        return currencyRepository.save(currency);
    }

    // Buscar una moneda por su ID
    public Optional<Currency> findById(Long id) {
        return currencyRepository.findById(id);
    }

    // Buscar una moneda por su nombre (insensible a mayúsculas/minúsculas)
    public Optional<Currency> findByName(String name) {
        return currencyRepository.findByNameIgnoreCase(name.trim());
    }

    // Eliminar una moneda por su ID
    public void deleteById(Long id) {
        currencyRepository.deleteById(id);
    }
}
