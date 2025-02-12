class History {
    constructor(historyId, currentPrice, marketCap, marketCapRank, totalVolume, high24h, low24h, priceChange24h, priceChangePercentage24h, marketCapChange24h, marketCapChangePercentage24h, totalSupply, lastUpdated, currency) {
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

    // Lista donde se almacenan todas las entradas de historial
    static histories = [];

    // 🔄 Cargar todas las entradas del historial desde la API
    static loadHistories(callback) {
        $.ajax({
            url: '/history',
            type: 'GET',
            success: (data) => {
                // 🚨 Vaciar la lista antes de llenarla
                History.histories.length = 0;

                data.forEach(h => History.histories.push(new History(
                    h.historyId, h.currentPrice, h.marketCap, h.marketCapRank, h.totalVolume,
                    h.high24h, h.low24h, h.priceChange24h, h.priceChangePercentage24h,
                    h.marketCapChange24h, h.marketCapChangePercentage24h, h.totalSupply,
                    h.lastUpdated, h.currency
                )));

                console.log('Historial actualizado:', History.histories);
                if (callback) callback(History.histories);
            },
            error: (error) => {
                console.error('Error al obtener el historial:', error);
            }
        });
    }

    // 🔍 Obtener una entrada de historial por ID
    static getHistoryById(historyId, callback) {
        $.ajax({
            url: `/history/${historyId}`,
            type: 'GET',
            success: (data) => {
                let history = new History(
                    data.historyId, data.currentPrice, data.marketCap, data.marketCapRank, data.totalVolume,
                    data.high24h, data.low24h, data.priceChange24h, data.priceChangePercentage24h,
                    data.marketCapChange24h, data.marketCapChangePercentage24h, data.totalSupply,
                    data.lastUpdated, data.currency
                );
                console.log('Historial obtenido:', history);
                if (callback) callback(history);
            },
            error: (error) => {
                console.error(`Error al obtener el historial con ID ${historyId}:`, error);
            }
        });
    }

    // ➕ Crear una nueva entrada de historial
    static createHistory(historyData, callback) {
        $.ajax({
            url: '/history',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(historyData),
            success: (data) => {
                let history = new History(
                    data.historyId, data.currentPrice, data.marketCap, data.marketCapRank, data.totalVolume,
                    data.high24h, data.low24h, data.priceChange24h, data.priceChangePercentage24h,
                    data.marketCapChange24h, data.marketCapChangePercentage24h, data.totalSupply,
                    data.lastUpdated, data.currency
                );
                History.histories.push(history);
                console.log('Historial creado:', history);
                if (callback) callback(history);
            },
            error: (error) => {
                console.error('Error al crear la entrada de historial:', error);
            }
        });
    }

    // 🔄 Actualizar una entrada de historial
    static updateHistory(historyId, updatedData, callback) {
        $.ajax({
            url: `/history/${historyId}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedData),
            success: (data) => {
                let index = History.histories.findIndex(h => h.historyId === historyId);
                if (index !== -1) {
                    History.histories[index] = new History(
                        data.historyId, data.currentPrice, data.marketCap, data.marketCapRank, data.totalVolume,
                        data.high24h, data.low24h, data.priceChange24h, data.priceChangePercentage24h,
                        data.marketCapChange24h, data.marketCapChangePercentage24h, data.totalSupply,
                        data.lastUpdated, data.currency
                    );
                    console.log('Historial actualizado:', History.histories[index]);
                }
                if (callback) callback(data);
            },
            error: (error) => {
                console.error('Error al actualizar el historial:', error);
            }
        });
    }

    // ❌ Eliminar una entrada de historial
    static deleteHistory(historyId, callback) {
        $.ajax({
            url: `/history/${historyId}`,
            type: 'DELETE',
            success: () => {
                History.histories = History.histories.filter(h => h.historyId !== historyId);
                console.log(`Historial con ID ${historyId} eliminado.`);
                if (callback) callback();
            },
            error: (error) => {
                console.error('Error al eliminar el historial:', error);
            }
        });
    }

    // 📈 Obtener criptomonedas con mayor crecimiento
    static getTopWinners(callback) {
        $.ajax({
            url: '/history/topWinners',
            type: 'GET',
            success: (data) => {
                console.log('Criptos con mayor crecimiento:', data);
                if (callback) callback(data);
            },
            error: (error) => {
                console.error('Error al obtener los top winners:', error);
            }
        });
    }

    // 📉 Obtener criptomonedas con mayores pérdidas
    static getTopLosers(callback) {
        $.ajax({
            url: '/history/topLosers',
            type: 'GET',
            success: (data) => {
                console.log('Criptos con mayores pérdidas:', data);
                if (callback) callback(data);
            },
            error: (error) => {
                console.error('Error al obtener los top losers:', error);
            }
        });
    }

    // 🔥 Obtener criptos ordenadas por Market Cap Rank (Trending)
    static getTrendingCoins(callback) {
        $.ajax({
            url: '/history/trending-coins',
            type: 'GET',
            success: (data) => {
                console.log('Monedas en tendencia:', data);
                if (callback) callback(data);
            },
            error: (error) => {
                console.error('Error al obtener las monedas en tendencia:', error);
            }
        });
    }

    // 🔊 Obtener criptos con mayor volumen
    static getHighestVolume(callback) {
        $.ajax({
            url: '/history/highest-volume',
            type: 'GET',
            success: (data) => {
                console.log('Monedas con mayor volumen:', data);
                if (callback) callback(data);
            },
            error: (error) => {
                console.error('Error al obtener monedas con mayor volumen:', error);
            }
        });
    }

    // 📊 Obtener precios diarios de una moneda
    static getDailyPrices(currencyId, date, callback) {
        let url = `/history/${currencyId}/daily-prices`;
        if (date) {
            url += `?date=${date}`;
        }

        $.ajax({
            url: url,
            type: 'GET',
            success: (data) => {
                console.log(`Precios diarios para la moneda ${currencyId}:`, data);
                if (callback) callback(data);
            },
            error: (error) => {
                console.error('Error al obtener los precios diarios:', error);
            }
        });
    }
}

// =============================
// 🔥 Cargar automáticamente el historial al iniciar
// =============================
$(document).ready(function () {
    History.loadHistories((histories) => {
        console.log('Historial cargado en la aplicación:', histories);
    });
});
