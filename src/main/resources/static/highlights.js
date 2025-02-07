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






