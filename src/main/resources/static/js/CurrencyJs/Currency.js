class Currency {
    constructor(currencyId, name, ticker, image) {
        this.currencyId = currencyId;
        this.name = name;
        this.ticker = ticker;
        this.image = image;
    }

    // Lista donde se almacenan todas las monedas
    static currencies = [];

    // 🔄 Cargar todas las monedas desde la API (limpia la lista antes)
    static loadCurrencies(callback) {
        $.ajax({
            url: '/currencies',
            type: 'GET',
            success: (data) => {
                Currency.currencies = []; // Vacía la lista antes de llenarla
                data.forEach(c => Currency.currencies.push(new Currency(c.currencyId, c.name, c.ticker, c.image)));

                console.log('Lista de monedas recargada:', Currency.currencies);
                if (callback) callback(Currency.currencies);
            },
            error: (error) => {
                console.error('Error al obtener las monedas:', error);
            }
        });
    }

    // 🔍 Obtener una moneda por su ID desde la API
    static getCurrencyById(currencyId, callback) {
        $.ajax({
            url: `/currencies/${currencyId}`,
            type: 'GET',
            success: (data) => {
                let currency = new Currency(data.currencyId, data.name, data.ticker, data.image);
                console.log(`Moneda obtenida de la API:`, currency);
                if (callback) callback(currency);
            },
            error: (error) => {
                console.error(`Error al obtener la moneda con ID ${currencyId}:`, error);
            }
        });
    }

    // ➕ Crear una nueva moneda en la API
    static createCurrency(name, ticker, image, callback) {
        let newCurrency = { name, ticker, image };

        $.ajax({
            url: '/currencies',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newCurrency),
            success: (data) => {
                let currency = new Currency(data.currencyId, data.name, data.ticker, data.image);
                Currency.currencies.push(currency);
                console.log('Moneda creada y almacenada:', currency);
                if (callback) callback(currency);
            },
            error: (error) => {
                console.error('Error al crear la moneda:', error);
            }
        });
    }

    // 🔄 Actualizar una moneda en la API
    static updateCurrency(currencyId, name, ticker, image, callback) {
        let updatedCurrency = { name, ticker, image };

        $.ajax({
            url: `/currencies/${currencyId}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedCurrency),
            success: (data) => {
                let index = Currency.currencies.findIndex(c => c.currencyId === currencyId);
                if (index !== -1) {
                    Currency.currencies[index] = new Currency(data.currencyId, data.name, data.ticker, data.image);
                    console.log('Moneda actualizada:', Currency.currencies[index]);
                }
                if (callback) callback(data);
            },
            error: (error) => {
                console.error('Error al actualizar la moneda:', error);
            }
        });
    }

    // ❌ Eliminar una moneda de la API
    static deleteCurrency(currencyId, callback) {
        $.ajax({
            url: `/currencies/${currencyId}`,
            type: 'DELETE',
            success: () => {
                Currency.currencies = Currency.currencies.filter(c => c.currencyId !== currencyId);
                console.log(`Moneda con ID ${currencyId} eliminada.`);
                if (callback) callback();
            },
            error: (error) => {
                console.error('Error al eliminar la moneda:', error);
            }
        });
    }
}

// =============================
// 🔥 Cargar automáticamente todas las monedas al iniciar
// =============================
$(document).ready(function () {
    Currency.loadCurrencies((currencies) => {
        console.log('Monedas cargadas en la aplicación:', currencies);
    });
});
