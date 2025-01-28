document.addEventListener("DOMContentLoaded", function () {
    // Animar el Total Balance
    const totalBalanceElement = document.getElementById("total-balance");
    const finalBalance = 2350; // Valor final
    const duration = 2000; // Duración de la animación (en ms)
    const frameRate = 60; // Frames por segundo
    const increment = finalBalance / (duration / (1000 / frameRate));
    let currentBalance = 0;

    const updateBalance = setInterval(() => {
        currentBalance += increment;
        if (currentBalance >= finalBalance) {
            currentBalance = finalBalance;
            clearInterval(updateBalance);
        }
        totalBalanceElement.textContent = `$${Math.floor(currentBalance).toLocaleString()}`;
    }, 1000 / frameRate);

    // Animar la Barra de Progreso
    const progressBar = document.getElementById("progress-bar");
    const finalProgress = 75; // Porcentaje final
    let currentProgress = 0;
    const progressIncrement = finalProgress / (duration / (1000 / frameRate));

    const updateProgressBar = setInterval(() => {
        currentProgress += progressIncrement;
        if (currentProgress >= finalProgress) {
            currentProgress = finalProgress;
            clearInterval(updateProgressBar);
        }
        progressBar.style.width = `${currentProgress}%`;
        progressBar.setAttribute("aria-valuenow", Math.floor(currentProgress));
    }, 1000 / frameRate);
});
