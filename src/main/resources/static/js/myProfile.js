let balance = 0;
let totalBalance = 1200; // Valor del balance
const totalBalanceElement = document.getElementById('total-balance');
const progressBar = document.getElementById('balance-progress');

// Función para animar el número
function animateBalance() {
    let step = totalBalance / 100;
    let interval = setInterval(function () {
        if (balance < totalBalance) {
            balance += step;
            totalBalanceElement.textContent = `$${balance.toFixed(2)}`;
            // Actualizar la barra de progreso
            const progress = (balance / totalBalance) * 100;
            progressBar.style.width = `${progress}%`;
        } else {
            clearInterval(interval);
        }
    }, 30); // Tiempo de intervalo
}

// Iniciar animación después de un pequeño retraso
setTimeout(animateBalance, 500);

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
