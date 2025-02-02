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
    const ctx = document.getElementById("areaChart").getContext("2d");

    // Datos del gráfico
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [{
            label: "Balance",
            data: [15000, 20000, 28000, 23000, 14000, 18000], // Valores simulados
            fill: true,
            borderColor: "#061428",
            backgroundColor: "#E0EBFB",
            tension: 0.3, // Suaviza la línea
            pointRadius: 3, // Puntos pequeños
            pointBackgroundColor: "#fff"
        }]
    };

    // Configuración del gráfico
    const config = {
        type: "line",
        data: data,
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    backgroundColor: "white",
                    titleColor: "black",
                    bodyColor: "black",
                    bodyFont: { size: 14 },
                    padding: 8,
                    displayColors: false,
                    caretSize: 6,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value >= 1000 ? (value / 1000) + "k" : value;
                        }
                    }
                }
            }
        }
    };

    new Chart(ctx, config);
});