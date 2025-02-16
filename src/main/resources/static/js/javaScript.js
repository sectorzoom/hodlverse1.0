document.getElementById("dropdownMenu").addEventListener("click", function (event) {
    window.location.href = "highlights.html";
});

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
    const button = document.getElementById("dropdownButton");
    const menu = document.getElementById("dashboard-collapse");

    button.addEventListener("mouseenter", function () {
        menu.classList.add("show"); // Abre el menú
    });

    menu.addEventListener("mouseleave", function () {
        menu.classList.remove("show"); // Cierra el menú al salir
    });

    // Opcional: Cerrar el menú si el mouse sale del botón y menú
    button.addEventListener("mouseleave", function () {
        setTimeout(() => {
            if (!menu.matches(":hover")) {
                menu.classList.remove("show");
            }
        }, 200);
    });

    function formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    }

    async function fetchInfo() {
        try {
            const totalMarket = await History.getTotalMarketCap();
            const totalVolume = await History.getTotalVolume();

            // Seleccionamos todos los elementos con la clase "marketCapValue"
            const marketCapElements = document.querySelectorAll(".marketCapValue");
            if (marketCapElements.length > 0) {
                marketCapElements.forEach(el => {
                    el.innerHTML = formatCurrency(totalMarket);
                });
            } else {
                console.warn('⚠️ Elemento(s) con clase "marketCapValue" no encontrado(s) en el DOM');
            }

            // Seleccionamos todos los elementos con la clase "trendingCoinsValue"
            const trendingCoinsElements = document.querySelectorAll(".trendingCoinsValue");
            if (trendingCoinsElements.length > 0) {
                trendingCoinsElements.forEach(el => {
                    el.innerHTML = formatCurrency(totalVolume);
                });
            } else {
                console.warn('⚠️ Elemento(s) con clase "trendingCoinsValue" no encontrado(s) en el DOM');
            }

        } catch (error) {
            console.error('❌ Error en fetchInfo:', error);
        }
    }

    fetchInfo();

});