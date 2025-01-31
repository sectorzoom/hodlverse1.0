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
    var chartDom = document.getElementById('marketChart');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
        title: {
            text: 'Market Candlestick Chart',
            left: 'center'
        },
        xAxis: {
            type: 'category',
            data: ['2025-02-02', '2025-02-01', '2025-01-31', '2025-01-30', '2025-01-29',
                '2025-01-28', '2025-01-27', '2025-01-26', '2025-01-25', '2025-01-24',
                '2025-01-23', '2025-01-22', '2025-01-21', '2025-01-20', '2025-01-19',
                '2025-01-18', '2025-01-17', '2025-01-16', '2025-01-15', '2025-01-14',
                '2025-01-13', '2025-01-12', '2025-01-11', '2025-01-10', '2025-01-09',
                '2025-01-08', '2025-01-07', '2025-01-06', '2025-01-05', '2025-01-04','2025-01-03', '2025-01-02', '2025-01-01', '2024-12-31', '2024-12-30',
                '2024-12-29', '2024-12-28', '2024-12-27', '2024-12-26', '2024-12-25',
                '2024-12-24', '2024-12-23', '2024-12-22', '2024-12-21', '2024-12-20',
                '2024-12-19', '2024-12-18', '2024-12-17', '2024-12-16', '2024-12-15' ]
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                type: 'candlestick',
                data: [
                    [12, 45, 7, 39],
                    [23, 8, 30, 14],
                    [36, 27, 18, 42],
                    [9, 30, 5, 47],
                    [41, 13, 32, 26],
                    [16, 48, 8, 22],
                    [29, 37, 6, 34],
                    [19, 21, 11, 40],
                    [44, 5, 31, 25],
                    [35, 28, 17, 49],
                    [5, 22, 47, 31],
                    [14, 39, 8, 42],
                    [27, 10, 36, 49],
                    [3, 44, 19, 25],
                    [35, 7, 18, 32],
                    [11, 30, 41, 24],
                    [6, 35, 16, 28],
                    [40, 6, 45, 21],
                    [9, 48, 33, 12],
                    [38, 20, 4, 23],
                    [13, 26, 4, 37],
                    [29, 43, 17, 5],
                    [21, 46, 9, 34],
                    [32, 15, 48, 6],
                    [11, 47, 3, 28],
                    [25, 7, 45, 39],
                    [19, 5, 30, 44],
                    [8, 40, 12, 31],
                    [22, 47, 16, 49],
                    [10, 35, 41, 14],
                    [24, 5, 37, 18], [9, 41, 27, 3], [20, 12, 45, 31], [14, 48, 6, 33], [11, 29, 43, 8],
                    [17, 35, 22, 50], [2, 39, 13, 46], [30, 10, 28, 44], [7, 26, 47, 32], [19, 42, 4, 49],
                    [15, 25, 36, 1], [40, 16, 21, 34], [23, 31, 5, 48], [12, 46, 7, 29], [38, 3, 18, 44],
                    [9, 50, 27, 13], [8, 35, 22, 41], [30, 2, 45, 19], [17, 14, 33, 28], [42, 10, 26, 49],
                ]
            }
        ]
    };

    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
});
