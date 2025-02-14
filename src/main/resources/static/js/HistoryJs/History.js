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
                History.histories = data.map(h => new History(
                    h.historyId, h.currentPrice, h.marketCap, h.marketCapRank, h.totalVolume,
                    h.high24h, h.low24h, h.priceChange24h, h.priceChangePercentage24h,
                    h.marketCapChange24h, h.marketCapChangePercentage24h, h.totalSupply,
                    h.lastUpdated, h.currency
                ));
                console.log('Historial actualizado:', History.histories);
                if (callback) callback(History.histories);
            },
            error: (error) => {
                console.error('Error al obtener el historial:', error);
            }
        });
    }

    // 📊 Obtener la suma total del Market Cap de todas las monedas
    static async getTotalMarketCap() {
        try {
            const response = await $.ajax({
                url: '/history/total-market-cap',
                type: 'GET'
            });
            return response;
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            return null;
        }
    }

    // 🔊 Obtener la suma total del volumen de todas las monedas
    static async getTotalVolume() {
        try {
            const response = await $.ajax({
                url: '/history/total-volume',
                type: 'GET'
            });
            return response;
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            return null;
        }
    }
}

window.History = History;

// =============================
// 🔥 Cargar automáticamente el historial al iniciar
// =============================
$(document).ready(function () {
    History.loadHistories((histories) => {
        console.log('Historial cargado en la aplicación:', histories);
    });

    // Obtener Market Cap total
    History.getTotalMarketCap((totalMarketCap) => {
        console.log('Market Cap Total al inicio:', totalMarketCap);
    });

    // Obtener Total Volume
    History.getTotalVolume((totalVolume) => {
        console.log('Total Volume al inicio:', totalVolume);
    });
});
