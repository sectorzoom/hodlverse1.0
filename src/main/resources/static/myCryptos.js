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

const ctx1 = document.getElementById('holdingsChart').getContext('2d');
new Chart(ctx1, {
    type: 'doughnut',
    data: {
        labels: ['BTC', 'USDT', 'ETH', 'USDC', 'XRP', 'Others'],
        datasets: [{
            data: [30.8, 19.2, 13.2, 9.1, 8.9, 18.8],
            backgroundColor: ['#FF9900', '#26A17B', '#627EEA', '#2775CA', '#346AA9', '#CCCCCC']
        }]
    }
});

const ctx2 = document.getElementById('performanceChart').getContext('2d');
new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['15:00', '18:00', '21:00'],
        datasets: [{
            data: [500, 520, 600],
            borderColor: '#061428',
            fill: false
        }]
    }
});