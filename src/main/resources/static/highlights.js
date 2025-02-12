document.addEventListener("DOMContentLoaded", function () {
    const toggleSwitch = document.getElementById("toggleRankingSwitch");

    if (!toggleSwitch) {
        console.error("No se encontró el switch.");
        return;
    }

    toggleSwitch.addEventListener("click", function () {
        console.log("Switch clicked!"); // Para comprobar que el evento funciona
        const rankingSection = document.getElementById("rankingCards");

        if (!rankingSection) {
            console.error("No se encontró la sección de rankings.");
            return;
        }

        rankingSection.classList.toggle("hidden");
        this.nextElementSibling.textContent = this.checked ? "Show Rankings" : "Hide Rankings";
    });
});

document.addEventListener("DOMContentLoaded", () => {
    fetch("/history/topWinners")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const list = document.querySelector(".list-unstyled");
            list.innerHTML = ""; // Limpiar la lista antes de añadir nuevos datos
            console.log(data);

            data.forEach(coin => {
                let listItem = `
                    <li class="row py-1 mt-2 mb-2 card-item">
                        <div class="col-6 d-flex align-items-center">
                            <img src="https://cryptologos.cc/logos/${coin.currency.toLowerCase()}-logo.png" 
                                 alt="${coin.currency}" height="24" class="me-3">
                            <a href="infoCrypto.html" class="text-decoration-none text-dark">
                                <p class="mb-0">${coin.currency}</p>
                            </a>
                        </div>
                        <div class="col-3 text-end">$${coin.currentPrice.toFixed(2)}</div>
                        <div class="col-3 text-end ${coin.priceChangePercentage24h >= 0 ? 'text-success' : 'text-danger'} fw-bold">
                            ${coin.priceChangePercentage24h.toFixed(2)}%
                        </div>
                    </li>
                `;
                list.innerHTML += listItem;
            });
        })
        .catch(error => console.error("Error al obtener los datos:", error));
});
