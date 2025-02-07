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
    let chartDom = document.getElementById("chart-container");

    if (!chartDom) {
        console.error("❌ No se encontró el contenedor del gráfico.");
        return;
    }

    let myChart = echarts.init(chartDom);

    // 🔹 Generación de datos (100 días de ganancias aleatorias)
    let base = new Date(2024, 0, 1).getTime();
    let oneDay = 24 * 3600 * 1000;
    let data = [];

    for (let i = 0; i < 100; i++) {
        let time = base + i * oneDay;
        let value = Math.round(Math.random() * 200 + 50);
        data.push([time, value]);
    }

    console.log("📊 Datos generados:", data);

    let option = {
        title: {
            left: 'center',
            text: 'Ganancias por Día ($)'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                let date = new Date(params[0].value[0]);
                let value = params[0].value[1];
                return `📅 Día ${date.getDate()} - 💰 $${value}`;
            }
        },
        xAxis: {
            type: 'time',
            name: 'Día',
            nameLocation: 'middle',
            nameGap: 30,
            axisLabel: {
                formatter: function (value) {
                    return new Date(value).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
                }
            }
        },
        yAxis: {
            type: 'value',
            name: 'Dinero ($)',
            nameLocation: 'middle',
            nameGap: 50,
            axisLabel: {
                formatter: function (value) {
                    return '$' + value;
                }
            }
        },
        dataZoom: [
            { type: 'inside', start: 0, end: 100 },
            { start: 0, end: 100 }
        ],
        series: [
            {
                name: 'Ganancias',
                type: 'line',
                smooth: false,  // ❌ Evita curvas
                symbol: 'none',
                lineStyle: {
                    color: '#061428', // 🔹 Color de la línea (rojo-naranja)
                    width: 2  // 🔹 Grosor de la línea
                },
                areaStyle: {
                    color: 'rgba(126, 172, 237, 0.3)' // 🔹 Color del fondo con transparencia
                },
                data: data
            }
        ],
        toolbox: {
            show: true,
            feature: {
                restore: {},
                saveAsImage: {}
            }
        }
    };

    try {
        myChart.setOption(option);
    } catch (error) {
        console.error("❌ Error al cargar el gráfico:", error);
    }
});
