 async function confirmBuy(){
     const queryString = window.location.search;
     const urlParams = new URLSearchParams(queryString);
     const ticker = urlParams.get('ticker');

     async function fetchCryptoData() {
         let cryptoFinal;
         try {
             const cryptos = await Currency.loadCurrencies();
             console.log(cryptos);
             cryptos.forEach(crypto => {
                 if (crypto.ticker === ticker) {
                     cryptoFinal = crypto;
                 }
             });
             return cryptoFinal;
         } catch (error) {
             console.error("Error fetching data from API:", error);
             return null;
         }
     }
     let cryptoFinal = await fetchCryptoData();

     async function loadCryptoInfo() {
         try {
             const crypto = await History.getLatestHistoryByCurrencyId(cryptoFinal.currencyId);
             return crypto;
         } catch (error) {
             console.error("Error fetching data from API:", error);
             return null;
         }
     }
     const crypto = await loadCryptoInfo();

     async function getUser() {
         try {
             const userId = await User.getUserId();
             console.log(userId);
             return userId
         } catch (error) {
             console.error('❌ Error al obtener el usuario:', error);
             return null; // Devuelve un array vacío en caso de error
         }
     }
     let userId = await getUser();
     // Ejemplo de cómo construir los datos de una transacción:
     const transactionData = {
         transactionId: 85,
         transactionType: 'buy', // Puede ser "buy", "sell" o "exchange"
         originTransactionAmount: crypto.currentPrice,        // Usar string para evitar problemas de precisión en BigDecimal
         destinationTransactionAmount: parseFloat(document.getElementById("buy-amount").value) || 0,
         originUnitPrice: 1,
         destinationUnitPrice: crypto.currentPrice,
         transactionDate: new Date().toISOString().split('T')[0], // Formato "YYYY-MM-DD"
         user: {
             userId: userId // ID del usuario (asegúrate de tener este valor)
         },
         originCurrency: {
             currencyId: 3 // ID de la moneda de origen
         },
         destinationCurrency: {
             currencyId: cryptoFinal.currencyId // ID de la moneda de destino
         }
     };

// Luego, puedes enviar estos datos utilizando la función createTransaction
     Transaction.createTransaction(transactionData, (data) => {
         console.log("Transacción creada:", data);
     });

    Transaction = new Transaction();
 }

document.addEventListener('DOMContentLoaded', async function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ticker = urlParams.get('ticker');

    async function fetchCryptoData() {
        let cryptoFinal;
        try {
            const cryptos = await Currency.loadCurrencies();
            console.log(cryptos);
            cryptos.forEach(crypto => {
                if (crypto.ticker === ticker) {
                    cryptoFinal = crypto;
                }
            });
            return cryptoFinal;
        } catch (error) {
            console.error("Error fetching data from API:", error);
            return null;
        }
    }
    let cryptoFinal = await fetchCryptoData();

    async function loadCryptoInfo() {
        try {
            const crypto = await History.getLatestHistoryByCurrencyId(cryptoFinal.currencyId);
            return crypto;
        } catch (error) {
            console.error("Error fetching data from API:", error);
            return null;
        }
    }
    const crypto = await loadCryptoInfo();
    console.log(crypto);
    document.getElementById('icon').src = crypto.currency.image;
    document.getElementById('icon').alt = "Icono de " + crypto.currency.name;
    let currencyName = document.querySelectorAll('.cryptoName');
    currencyName.forEach(el => {
        el.innerHTML = crypto.currency.name;
    });
    let currencyPrice = document.querySelectorAll('.crypto-price');
    currencyPrice.forEach(el => {
        el.innerHTML = "$" + crypto.currentPrice;
    });
    document.getElementById("market-cap-rank").innerText = crypto.marketCapRank;
    document.getElementById("market-cap").innerText = "$" + crypto.marketCap;
    document.getElementById("volume").innerText = "$" + crypto.totalVolume;
    document.getElementById("total-supply").innerText = "$" + crypto.totalSupply;
    document.getElementById("change-24h").innerText = "$" + crypto.priceChange24h;
    document.getElementById("change-24h-percentage").innerText = crypto.priceChangePercentage24h + "%";
    document.getElementById("high-24").innerText = "$" + crypto.high24h;
    document.getElementById("low-24").innerText = "$" + crypto.low24h;







});
    /*  BUY/SELL CRYPTO EVENT */
document.addEventListener('DOMContentLoaded', function () {
    let actionType = '';
    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    const buyModal = new bootstrap.Modal(document.getElementById('buyModal'));
    const sellModal = new bootstrap.Modal(document.getElementById('sellModal'));

    document.getElementById('buy-btn').addEventListener('click', function () {
        actionType = 'buy';
        confirmationModal.show();
    });

    document.getElementById('sell-btn').addEventListener('click', function () {
        actionType = 'sell';
        confirmationModal.show();
    });

    document.getElementById('confirm-action').addEventListener('click', function () {
        confirmationModal.hide();
        setTimeout(() => {
            if (actionType === 'buy') {
                buyModal.show();
            } else if (actionType === 'sell') {
                sellModal.show();
            }
        }, 300);
    });

    // Function to update the estimated total based on the input amount and current price
    function updateTotal(inputId, outputId) {
        const amount = parseFloat(document.getElementById(inputId).value) || 0;
        const currentPrice = parseFloat(document.getElementById('currentPriceBuy').innerText.replace('$', '')) || 0;
        const total = amount * currentPrice;
        document.getElementById(outputId).innerText = `$${total.toFixed(2)}`;
    }

    document.getElementById('buy-amount').addEventListener('input', function () {
        updateTotal('buy-amount', 'buy-total-price');
    });

    document.getElementById('sell-amount').addEventListener('input', function () {
        updateTotal('sell-amount', 'sell-total-price');
    });

    document.getElementById('confirm-buy').addEventListener('click', function () {
        // Aquí iría la lógica real de compra
        alert('Purchase confirmed!');

        buyModal.hide();
    });

    document.getElementById('confirm-sell').addEventListener('click', function () {
        // Aquí iría la lógica real de venta
        alert('Sale confirmed!');
        sellModal.hide();
    });
});

/*TOOLTIP INFO */
// Inicializar tooltips
let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

// /* API CAROUSEL NEWS */
//
// async function loadCryptoNews() {
//     try {
//         // Realizamos la solicitud a la API de CryptoPanic con el token de autenticación
//         const response = await fetch("https://cryptopanic.com/api/v1/posts/?auth_token=a4c7721b1d6af749de0f98cd0412b15e62d326a3", {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//
//         // Esperamos la respuesta en formato JSON
//         const data = await response.json();
//
//         // Verificamos si la respuesta tiene los resultados
//         if (data.results) {
//             // Llamamos a la función para mostrar las noticias en el carrusel
//             displayNewsCarousel(data.results);
//         } else {
//             console.log("No news available.");
//         }
//     } catch (error) {
//         console.error("Error fetching news:", error);
//     }
// }
//
// function displayNewsCarousel(news) {
//     // Seleccionamos el contenedor del carrusel
//     const carouselInner = document.querySelector("#cryptoNewsCarousel .carousel-inner");
//
//     // Limpiamos cualquier contenido anterior en el carrusel
//     carouselInner.innerHTML = "";
//
//     // Iteramos sobre las noticias y añadimos los elementos al carrusel
//     news.slice(0, 5).forEach((article, index) => {
//         // Establecemos el primer artículo como activo
//         const isActive = index === 0 ? "active" : "";
//
//         // Construimos el HTML para cada artículo
//         const newsItem = `
//             <div class="carousel-item ${isActive}">
//                 <img src="${article.thumbnail || 'placeholder.jpg'}" class="d-block w-100" alt="${article.title}">
//                 <div class="carousel-caption d-none d-md-block">
//                     <h5>${article.title}</h5>
//                     <p>${article.text || "No description available."}</p>
//                     <a href="${article.url}" class="btn btn-primary" target="_blank">Read More</a>
//                 </div>
//             </div>
//         `;
//
//         // Añadimos el artículo al carrusel
//         carouselInner.innerHTML += newsItem;
//     });
// }
//
// // Llamamos a la función loadCryptoNews cuando el contenido de la página se haya cargado completamente
// document.addEventListener("DOMContentLoaded", loadCryptoNews);
