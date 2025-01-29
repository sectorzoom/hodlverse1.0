document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".awards-carousel");
    const itemsWrapper = document.querySelector(".awards-items-wrapper");
    const items = Array.from(document.querySelectorAll(".awards-item"));

    // Función para duplicar elementos y garantizar desplazamiento continuo
    function duplicateItems() {
        const carouselWidth = carousel.offsetWidth;

        while (itemsWrapper.scrollWidth < carouselWidth * 10) {
            items.forEach(item => {
                const clone = item.cloneNode(true);
                itemsWrapper.appendChild(clone);
            });
        }
    }

    // Llama a la función para garantizar suficientes elementos
    duplicateItems();

    let scrollSpeed = 1; // Ajusta la velocidad de desplazamiento

    function scrollCarousel() {
        carousel.scrollLeft += scrollSpeed;

        // Si el primer conjunto de elementos sale completamente de la vista, se reposiciona
        if (carousel.scrollLeft >= itemsWrapper.scrollWidth / 2) {
            carousel.scrollLeft -= itemsWrapper.scrollWidth / 2;
        }
    }

    // Inicia el desplazamiento continuo
    setInterval(scrollCarousel, 80);
});

document.addEventListener("DOMContentLoaded", () => {
    const offcanvas = document.querySelector("#offcanvasRight");

    // Escuchar el evento `show.bs.collapse` para detectar cuándo se abre un dropdown
    offcanvas.addEventListener("show.bs.collapse", (event) => {
        // Seleccionar todas las secciones colapsables dentro del offcanvas
        const dropdowns = offcanvas.querySelectorAll(".collapse");

        // Cerrar todas las secciones excepto la que se está abriendo
        dropdowns.forEach((dropdown) => {
            if (dropdown !== event.target) {
                bootstrap.Collapse.getOrCreateInstance(dropdown).hide();
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    var chartDom = document.getElementById('marketCapChart');
    var myChart = echarts.init(chartDom);

    // Obtener los datos de las últimas 24 horas de Bitcoin
    fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1')
        .then(response => response.json())
        .then(data => {
            // Extraer los precios y las marcas de tiempo
            let prices = data.prices; // Precios de Bitcoin con la marca de tiempo
            let timeStamps = prices.map(item => new Date(item[0]).toLocaleTimeString()); // Convertir timestamps a horas
            let priceValues = prices.map(item => item[1]); // Extraer solo los valores de los precios

            var option = {
                grid: {left: 0, right: 0, top: 10, bottom: 0},
                xAxis: {
                    type: 'category',
                    data: timeStamps, // Las horas de las 24 horas
                    axisLabel: {
                        interval: 6, // Muestra etiquetas cada 6 horas
                        rotate: 45
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '${value}'
                    }
                },
                series: [{
                    data: priceValues, // Los precios de Bitcoin
                    type: 'line',
                    smooth: true, // Línea suave para una mejor visualización
                    lineStyle: {
                        width: 2,
                        color: '#FF9900' // Color para la línea (amarillo anaranjado)
                    },
                    areaStyle: {
                        opacity: 0.3,
                        color: 'rgba(255, 153, 0, 0.2)' // Fondo semitransparente
                    }
                }]
            };

            myChart.setOption(option);
        })
        .catch(error => console.error("Error al obtener los datos:", error));
});