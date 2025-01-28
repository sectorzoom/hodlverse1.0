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