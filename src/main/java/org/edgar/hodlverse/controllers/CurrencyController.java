package org.edgar.hodlverse.controllers;

import org.edgar.hodlverse.services.CurrencyService;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CurrencyController {
    private final CurrencyService currencyService;

    public CurrencyController(CurrencyService currencyService) {
        this.currencyService = currencyService;
    }


}
