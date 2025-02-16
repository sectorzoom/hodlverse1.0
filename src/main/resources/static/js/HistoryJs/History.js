class History {
    constructor(historyId, currentPrice, marketCap, marketCapRank, totalVolume, high24h, low24h, priceChange24h, priceChangePercentage24h, marketCapChange24h, marketCapChangePercentage24h, totalSupply, lastUpdated, currency) {
        // Validar los datos antes de inicializar el objeto
        History.validateHistoryData({
            historyId,
            currentPrice,
            marketCap,
            marketCapRank,
            totalVolume,
            high24h,
            low24h,
            priceChange24h,
            priceChangePercentage24h,
            marketCapChange24h,
            marketCapChangePercentage24h,
            totalSupply,
            lastUpdated,
            currency
        });

        this.historyId = historyId;
        this.currentPrice = currentPrice;
        this.marketCap = marketCap;
        this.marketCapRank = marketCapRank;
        this.totalVolume = totalVolume;
        this.high24h = high24h;
        this.low24h = low24h;
        this.priceChange24h = priceChange24h;
        this.priceChangePercentage24h = priceChangePercentage24h;
        this.marketCapChange24h = marketCapChange24h;
        this.marketCapChangePercentage24h = marketCapChangePercentage24h;
        this.totalSupply = totalSupply;
        this.lastUpdated = lastUpdated;
        this.currency = currency;
    }

    static validateHistoryData(historyData) {
        // Validar historyId
        if (typeof historyData.historyId !== 'number' || isNaN(historyData.historyId)) {
            throw new Error('historyId debe ser un número válido.');
        }

        // Validar currentPrice
        if (typeof historyData.currentPrice !== 'number' || isNaN(historyData.currentPrice)) {
            throw new Error('currentPrice debe ser un número válido.');
        }

        // Validar marketCap
        if (typeof historyData.marketCap !== 'number' || isNaN(historyData.marketCap)) {
            throw new Error('marketCap debe ser un número válido.');
        }

        // Validar marketCapRank
        if (typeof historyData.marketCapRank !== 'number' || isNaN(historyData.marketCapRank)) {
            throw new Error('marketCapRank debe ser un número válido.');
        }

        // Validar totalVolume
        if (typeof historyData.totalVolume !== 'number' || isNaN(historyData.totalVolume)) {
            throw new Error('totalVolume debe ser un número válido.');
        }

        // Validar high24h
        if (typeof historyData.high24h !== 'number' || isNaN(historyData.high24h)) {
            throw new Error('high24h debe ser un número válido.');
        }

        // Validar low24h
        if (typeof historyData.low24h !== 'number' || isNaN(historyData.low24h)) {
            throw new Error('low24h debe ser un número válido.');
        }

        // Validar priceChange24h
        if (typeof historyData.priceChange24h !== 'number' || isNaN(historyData.priceChange24h)) {
            throw new Error('priceChange24h debe ser un número válido.');
        }

        // Validar priceChangePercentage24h
        if (typeof historyData.priceChangePercentage24h !== 'number' || isNaN(historyData.priceChangePercentage24h)) {
            throw new Error('priceChangePercentage24h debe ser un número válido.');
        }

        // Validar marketCapChange24h
        if (typeof historyData.marketCapChange24h !== 'number' || isNaN(historyData.marketCapChange24h)) {
            throw new Error('marketCapChange24h debe ser un número válido.');
        }

        // Validar marketCapChangePercentage24h
        if (typeof historyData.marketCapChangePercentage24h !== 'number' || isNaN(historyData.marketCapChangePercentage24h)) {
            throw new Error('marketCapChangePercentage24h debe ser un número válido.');
        }

        // Validar totalSupply
        if (typeof historyData.totalSupply !== 'number' || isNaN(historyData.totalSupply)) {
            throw new Error('totalSupply debe ser un número válido.');
        }

        // Validar lastUpdated
        if (!(historyData.lastUpdated instanceof Date)) {
            throw new Error('lastUpdated debe ser una instancia de Date.');
        }

        // Validar currency
        if (!(historyData.currency instanceof Currency)) {
            throw new Error('currency debe ser una instancia de Currency.');
        }
    }

    // Lista donde se almacenan todas las entradas de historial
    static histories = [];

    // 🔄 Cargar todas las entradas del historial desde la API
    static loadHistories(callback) {
        $.ajax({
            url: '/history',
            type: 'GET',
            success: (data) => {
                History.histories = data.map(h => {
                    try {
                        History.validateHistoryData(h);
                        return new History(
                            h.historyId,
                            h.currentPrice,
                            h.marketCap,
                            h.marketCapRank,
                            h.totalVolume,
                            h.high24h,
                            h.low24h,
                            h.priceChange24h,
                            h.priceChangePercentage24h,
                            h.marketCapChange24h,
                            h.marketCapChangePercentage24h,
                            h.totalSupply,
                            new Date(h.lastUpdated),
                            new Currency(h.currency)
                        );
                    } catch (error) {
                        console.warn(`Entrada de historial omitida debido a datos inválidos:`, h, error.message);
                        return null;
                    }
                }).filter(h => h !== null); // Filtrar entradas nulas
                console.log('Historial actualizado:', History.histories);
                if (callback) callback(History.histories);
            },
            error: (error) => {
                console.error('Error al obtener el historial:', error);
            }
        });
    }

    // 🔍 Obtener una entrada de historial por su ID desde la API
    static getHistoryById(historyId, callback) {
        if (typeof historyId !== 'number' || isNaN(historyId)) {
            console.error('El ID de la entrada de historial debe ser un número válido.');
            return;
        }
        $.ajax({
            url: `/history/${historyId}`,
            type: 'GET',
            success: (data) => {
                try {
                    History.validateHistoryData(data);
                    let history = new History(
                        data.historyId,
                        data.currentPrice,
                        data.marketCap,
                        data.marketCapRank,
                        data.totalVolume,
                        data.high24h,
                        data.low24h,
                        data.priceChange24h,
                        data.priceChangePercentage24h,
                        data.marketCapChange24h,
                        data.marketCapChangePercentage24h,
                        data.totalSupply,
                        new Date(data.lastUpdated),
                        new Currency(data.currency)
                    );
                    console.log(`Entrada de historial obtenida:`, history);
                    if (callback) callback(history);
                } catch (error) {
                    console.error(`Error al validar la entrada de historial con ID ${historyId}:`, error.message);
                }
            },
            error: (error) => {
                console.error(`Error al obtener la entrada de historial con ID ${historyId}:`, error);
            }
        });
    }

    // ➕ Crear una nueva entrada de historial en la API
    static createHistory(currentPrice, marketCap, marketCapRank, totalVolume, high24h, low24h, priceChange24h, priceChangePercentage24h, marketCapChange24h, marketCapChangePercentage24h, totalSupply, lastUpdated, currency, callback) {
        let newHistory = {
            currentPrice,
            marketCap,
            marketCapRank,
            totalVolume,
            high24h,
            low24h,
            priceChange24h,
            priceChangePercentage24h,
            marketCapChange24h,
            marketCapChangePercentage24h,
            totalSupply,
            lastUpdated: lastUpdated.toISOString(),
            currency: currency
        };

        try {
            History.validateHistoryData(newHistory);
            $.ajax({
                url: '/history',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(newHistory),
                success: (data) => {
                    try {
                        History.validateHistoryData(data);
                        let history = new History(
                            data.historyId,
                            data.currentPrice,
                            data.marketCap,
                            data.marketCapRank,
                            data.totalVolume,
                            data.high24h,
                            data.low24h,
                            data.priceChange24h,
                            data.priceChangePercentage24h,
                            data.marketCapChange24h,
                            data.marketCapChangePercentage24h,
                            data.totalSupply,
                            new Date(data.lastUpdated),
                            new Currency(data.currency)
                        );
                        History.histories.push(history);
                        console.log('Nueva entrada de historial creada:', history);
                        if (callback) callback(history);
                    } catch (error) {
                        console.error('Error al validar la nueva entrada de historial:', error.message);
                    }
                },
                error: (error) => {
                    console.error('Error al crear la entrada de historial:', error);
                }
            });
        } catch (error) {
            console.error('Datos inválidos para crear la entrada de historial:', error.message);
        }
    }

    // 🔄 Actualizar una entrada de historial en la API
    static updateHistory(historyId, updatedData, callback) {
        if (typeof historyId !== 'number' || isNaN(historyId)) {
            console.error('El ID de la entrada de historial debe ser un número válido.');
            return;
        }

        try {
            History.validateHistoryData({ ...updatedData, historyId });
            $.ajax({
                url: `/history/${historyId}`,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(updatedData),
                success: (data) => {
                    try {
                        History.validateHistoryData(data);
                        let index = History.histories.findIndex(h => h.historyId === historyId);
                        if (index !== -1) {
                            History.histories[index] = new History(
                                data.historyId,
                                data.currentPrice,
                                data.marketCap,
                                data.marketCapRank,
                                data.totalVolume,
                                data.high24h,
                                data.low24h,
                                data.priceChange24h,
                                data.priceChangePercentage24h,
                                data.marketCapChange24h,
                                data.marketCapChangePercentage24h,
                                data.totalSupply,
                                new Date(data.lastUpdated),
                                new Currency(data.currency)
                            );
                            console.log('Entrada de historial actualizada:', History.histories[index]);
                        }
                        if (callback) callback(data);
                    } catch (error) {
                        console.error('Error al validar la entrada de historial actualizada:', error.message);
                    }
                },
                error: (error) => {
                    console.error('Error al actualizar la entrada de historial:', error);
                }
            });
        } catch (error) {
            console.error('Datos inválidos para actualizar la entrada de historial:', error.message);
        }
    }

    // ❌ Eliminar una entrada de historial de la API
    static deleteHistory(historyId, callback) {
        if (typeof historyId !== 'number' || isNaN(historyId)) {
            console.error('El ID de la entrada de historial debe ser un número válido.');
            return;
        }

        $.ajax({
            url: `/history/${historyId}`,
            type: 'DELETE',
            success: () => {
                History.histories = History.histories.filter(h => h.historyId !== historyId);
                console.log(`Entrada de historial con ID ${historyId} eliminada.`);
                if (callback) callback();
            },
            error: (error) => {
                console.error('Error al eliminar la entrada de historial:', error);
            }
        });
    }

    // 📊 Obtener la suma total del Market Cap de todas las monedas
    static getTotalMarketCap(callback) {
        $.ajax({
            url: '/history/total-market-cap',
            type: 'GET',
            success: (data) => {
                console.log('Total Market Cap:', data);
                if (callback) callback(data);
            },
            error: (error) => {
                console.error('Error al obtener el Total Market Cap:', error);
            }
        });
    }

    // 🔊 Obtener la suma total del volumen de todas las monedas
    static getTotalVolume(callback) {
        $.ajax({
            url: '/history/total-volume',
            type: 'GET',
            success: (data) => {
                console.log('Total Volume:', data);
                if (callback) callback(data);
            },
            error: (error) => {
                console.error('Error al obtener el Total Volume:', error);
            }
        });
    }

    // *** NUEVA FUNCIÓN PARA OBTENER LA ÚLTIMA ENTRADA DE HISTORY ***
    static getLatestHistory(callback) {
        $.ajax({
            url: '/history/latest', // Endpoint para obtener la última entrada de History
            type: 'GET',
            success: (data) => {
                try {
                    History.validateHistoryData(data);
                    let latestHistory = new History(
                        data.historyId,
                        data.currentPrice,
                        data.marketCap,
                        data.marketCapRank,
                        data.totalVolume,
                        data.high24h,
                        data.low24h,
                        data.priceChange24h,
                        data.priceChangePercentage24h,
                        data.marketCapChange24h,
                        data.marketCapChangePercentage24h,
                        data.totalSupply,
                        new Date(data.lastUpdated),
                        new Currency(data.currency)
                    );
                    console.log('Última entrada de historial obtenida:', latestHistory);
                    if (callback) callback(latestHistory);
                } catch (error) {
                    console.error('Error al validar la última entrada de historial:', error.message);
                }
            },
            error: (error) => {
                console.error('Error al obtener la última entrada de historial:', error);
            }
        });
    }

    // 📊 Obtener las mejores monedas (ordenadas por priceChangePercentage24h descendente)
    static getTopWinners(callback) {
        $.ajax({
            url: '/history/topWinners',
            type: 'GET',
            success: (data) => {
                const topWinners = data.map(h => new History(
                    h.historyId,
                    h.currentPrice,
                    h.marketCap,
                    h.marketCapRank,
                    h.totalVolume,
                    h.high24h,
                    h.low24h,
                    h.priceChange24h,
                    h.priceChangePercentage24h,
                    h.marketCapChange24h,
                    h.marketCapChangePercentage24h,
                    h.totalSupply,
                    new Date(h.lastUpdated),
                    new Currency(h.currency)
                ));
                console.log('Mejores monedas obtenidas:', topWinners);
                if (callback) callback(topWinners);
            },
            error: (error) => {
                console.error('Error al obtener las mejores monedas:', error);
            }
        });
    }

    // 🔻 Obtener las peores monedas (ordenadas por priceChangePercentage24h ascendente)
    static getTopLosers(callback) {
        $.ajax({
            url: '/history/topLosers',
            type: 'GET',
            success: (data) => {
                const topLosers = data.map(h => new History(
                    h.historyId,
                    h.currentPrice,
                    h.marketCap,
                    h.marketCapRank,
                    h.totalVolume,
                    h.high24h,
                    h.low24h,
                    h.priceChange24h,
                    h.priceChangePercentage24h,
                    h.marketCapChange24h,
                    h.marketCapChangePercentage24h,
                    h.totalSupply,
                    new Date(h.lastUpdated),
                    new Currency(h.currency)
                ));
                console.log('Peores monedas obtenidas:', topLosers);
                if (callback) callback(topLosers);
            },
            error: (error) => {
                console.error('Error al obtener las peores monedas:', error);
            }
        });
    }

    // 🔥 Obtener monedas tendencia (ordenadas por marketCapRank ascendente)
    static getTrendingCoins(callback) {
        $.ajax({
            url: '/history/trending-coins',
            type: 'GET',
            success: (data) => {
                const trendingCoins = data.map(h => new History(
                    h.historyId,
                    h.currentPrice,
                    h.marketCap,
                    h.marketCapRank,
                    h.totalVolume,
                    h.high24h,
                    h.low24h,
                    h.priceChange24h,
                    h.priceChangePercentage24h,
                    h.marketCapChange24h,
                    h.marketCapChangePercentage24h,
                    h.totalSupply,
                    new Date(h.lastUpdated),
                    new Currency(h.currency)
                ));
                console.log('Monedas tendencia obtenidas:', trendingCoins);
                if (callback) callback(trendingCoins);
            },
            error: (error) => {
                console.error('Error al obtener las monedas tendencia:', error);
            }
        });
    }
    // 🔄 Obtener la última entrada de historial por currencyId
    static getLatestHistoryByCurrencyId(currencyId, callback) {
        if (typeof currencyId !== 'number' || isNaN(currencyId)) {
            console.error('El ID de la moneda debe ser un número válido.');
            return;
        }

        $.ajax({
            url: `/history/latest/${currencyId}`, // Endpoint para obtener la última entrada de History por currencyId
            type: 'GET',
            success: (data) => {
                try {
                    History.validateHistoryData(data);
                    let latestHistory = new History(
                        data.historyId,
                        data.currentPrice,
                        data.marketCap,
                        data.marketCapRank,
                        data.totalVolume,
                        data.high24h,
                        data.low24h,
                        data.priceChange24h,
                        data.priceChangePercentage24h,
                        data.marketCapChange24h,
                        data.marketCapChangePercentage24h,
                        data.totalSupply,
                        new Date(data.lastUpdated),
                        new Currency(data.currency)
                    );
                    console.log(`Última entrada de historial obtenida para currencyId ${currencyId}:`, latestHistory);
                    if (callback) callback(latestHistory);
                } catch (error) {
                    console.error(`Error al validar la última entrada de historial para currencyId ${currencyId}:`, error.message);
                }
            },
            error: (error) => {
                console.error(`Error al obtener la última entrada de historial para currencyId ${currencyId}:`, error);
            }
        });
    }

}

// =============================
// 🔥 Cargar automáticamente todas las entradas de historial al iniciar
// =============================
$(document).ready(function () {
    History.loadHistories((histories) => {
        console.log('Historial cargado en la aplicación:', histories);
    });

    // Ejemplo de uso para obtener la última entrada de historial
    $('#getLatestHistory').click(() => {
        History.getLatestHistory((latestHistory) => {
            console.log('Última entrada de historial:', latestHistory);
        });
    });
});