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

document.addEventListener("DOMContentLoaded", function() {
    var ctx = document.getElementById('radarChart').getContext('2d');

    var radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ["Bitcoin", "Ethereum", "Cardano", "Solana", "Polkadot", "Dogecoin"],
            datasets: [{
                label: "Crypto Wallet",
                data: [0.8, 0.6, 0.5, 0.7, 0.4, 0.3],
                backgroundColor: "#E0EBFB", // Color de fondo de las áreas
                borderColor: "#061428", // Color del borde
                borderWidth: 2,
                pointBackgroundColor: "rgba(0, 123, 255, 1)", // Color de los puntos
                pointBorderColor: "#fff", // Borde de los puntos
                pointHoverBackgroundColor: "#fff", // Color de fondo del punto al pasar el ratón
                pointHoverBorderColor: "rgba(0, 123, 255, 1)", // Borde del punto al pasar el ratón
            }]
        },
        options: {
            responsive: true,
            scale: {
                ticks: {
                    beginAtZero: true,  // Empieza en 0
                    max: 1,             // Valor máximo
                    stepSize: 0.2       // Espaciado entre las marcas
                },
                pointLabels: {
                    fontSize: 14,       // Tamaño de la fuente de las etiquetas
                }
            },
            plugins: {
                tooltip: {
                    enabled: true,  // Habilitar tooltips (información al pasar el ratón)
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ": " + tooltipItem.raw * 100 + "%";  // Mostrar el valor como porcentaje
                        }
                    },
                    backgroundColor: "white",
                    titleColor: "black",
                    bodyColor: "black",
                    borderColor: "#ddd",
                    borderWidth: 1
                }
            }
        }
    });
});
