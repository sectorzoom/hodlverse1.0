document.addEventListener("DOMContentLoaded", function () {
    // Animar el Total Balance
    const totalBalanceElement = document.getElementById("total-balance");
    const finalBalance = 2350; // Valor final
    const duration = 2000; // Duración de la animación (en ms)
    const frameRate = 60; // Frames por segundo
    const increment = finalBalance / (duration / (2500 / frameRate));
    let currentBalance = 0;

    const updateBalance = setInterval(() => {
        currentBalance += increment;
        if (currentBalance >= finalBalance) {
            currentBalance = finalBalance;
            clearInterval(updateBalance);
        }
        totalBalanceElement.textContent = `$${Math.floor(currentBalance).toLocaleString()}`;
    }, 2500 / frameRate);

    // Animar la Barra de Progreso
    const progressBar = document.getElementById("progress-bar");
    const finalProgress = 75; // Porcentaje final
    let currentProgress = 0;
    const progressIncrement = finalProgress / (duration / (2500 / frameRate));

    const updateProgressBar = setInterval(() => {
        currentProgress += progressIncrement;
        if (currentProgress >= finalProgress) {
            currentProgress = finalProgress;
            clearInterval(updateProgressBar);
        }
        progressBar.style.width = `${currentProgress}%`;
        progressBar.setAttribute("aria-valuenow", Math.floor(currentProgress));
    }, 2500 / frameRate);
});

document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("balanceChart").getContext("2d");

    // Generar etiquetas de los últimos 30 días
    const labels = [];
    const dataValues = [];
    for (let i = 29; i >= 1; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit" }));
        dataValues.push(Math.floor(Math.random() * 1000) + 1850 * (Math.random() > 0.5 ? 1 : -1)); // Valores alrededor de 2350
    }

    // Asegurar que el último valor sea 2350
    labels.push(new Date().toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit" }));
    dataValues.push(2350);

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Balance (€)",
                data: dataValues,
                backgroundColor: dataValues.map(value => value >= 0 ? "#4CAF50" : "#FF5733"),
                borderWidth: 1,
            }],
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    backgroundColor: "white",
                    titleColor: "black",
                    bodyColor: "black",
                    borderColor: "#ddd",
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
});
document.getElementById("dropdownMenu").addEventListener("click", function(event) {
    window.location.href = "highlights.html";
});
