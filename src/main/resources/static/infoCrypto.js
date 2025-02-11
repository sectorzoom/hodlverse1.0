window.onload = function () {
    // ================================
    // GRÁFICO DE EVOLUCIÓN DE PRECIOS
    // ================================

    // Obtenemos el contexto 2D del canvas donde se dibujará el gráfico.
    const ctxPrice = document.getElementById('crypto-chart').getContext('2d');

    // Creamos un gradiente vertical para el fondo de la línea.
    const gradientPrice = ctxPrice.createLinearGradient(0, 0, 0, 400);
    gradientPrice.addColorStop(0, 'rgba(6, 20, 40, 0.9)'); // Color superior (más opaco)
    gradientPrice.addColorStop(1, 'rgba(6, 20, 40, 0.2)'); // Color inferior (más transparente)

    // Etiquetas para el eje X (en este ejemplo, los meses).
    const priceLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
    // Datos de precio (uno por cada etiqueta).
    const prices = [680, 700, 650, 720, 800, 750, 820, 780, 850];

    // Creamos el gráfico usando Chart.js.
    new Chart(ctxPrice, {
        // Tipo de gráfico: 'line' (gráfico de líneas).
        type: 'line',
        data: {
            // Las etiquetas se usan en el eje X.
            labels: priceLabels,
            // Configuración de los datasets (en este caso, un solo dataset).
            datasets: [{
                label: 'Bitcoin Price ($)',         // Etiqueta que se mostrará en la leyenda y tooltips.
                data: prices,                         // Datos del gráfico.
                fill: true,                           // Rellenar el área debajo de la línea.
                backgroundColor: gradientPrice,       // Fondo con el gradiente creado.
                borderColor: 'rgb(6, 20, 40)',         // Color de la línea.
                borderWidth: 2,                       // Grosor de la línea.
                pointRadius: 5,                       // Tamaño de los puntos de datos.
                pointBackgroundColor: 'rgb(6, 20, 40)',// Color de los puntos.
                tension: 0.3                          // Curvatura de la línea (0: recta, 1: muy curvada).
            }]
        },
        options: {
            responsive: true,                       // Se adapta al tamaño del contenedor.
            maintainAspectRatio: false,             // Permite que la altura sea flexible.
            scales: {
                x: {
                    title: {display: true, text: 'Months'},  // Título del eje X.
                    ticks: {                                 // Opciones de las etiquetas en el eje X.
                        maxRotation: 45,                       // Rotación máxima.
                        minRotation: 30,                       // Rotación mínima.
                        autoSkip: true,                        // Se omiten etiquetas si es necesario para no sobrecargar.
                        maxTicksLimit: 8                       // Máximo número de etiquetas a mostrar.
                    }
                },
                y: {
                    title: {display: true, text: 'Price ($)'}, // Título del eje Y.
                    beginAtZero: false,                           // El eje Y no empieza en 0.
                    ticks: {
                        // Formatea las etiquetas del eje Y para que se vean como precios.
                        callback: function (value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,                        // Muestra la leyenda.
                    position: 'top',                      // Ubicación de la leyenda.
                    labels: {
                        color: 'rgb(6, 20, 40)'             // Color del texto de la leyenda.
                    }
                },
                tooltip: {
                    enabled: true,                        // Activa los tooltips.
                    mode: 'nearest',                      // Muestra el tooltip del punto más cercano.
                    intersect: false,                     // Aparece incluso si no intersecta exactamente el punto.
                    backgroundColor: 'rgba(255,255,255,0.9)', // Fondo claro para el tooltip.
                    titleColor: '#000',                   // Color del título en el tooltip.
                    bodyColor: '#000',                    // Color del contenido.
                    borderColor: '#ddd',                  // Color del borde del tooltip.
                    borderWidth: 1,                       // Grosor del borde.
                    callbacks: {
                        // Función para el título del tooltip.
                        title: function (tooltipItems) {
                            // Muestra el mes (la etiqueta) como título.
                            return 'Date: ' + tooltipItems[0].label;
                        },
                        // Función para el contenido (etiqueta) del tooltip.
                        label: function (context) {
                            const price = context.parsed.y;  // Precio del punto.
                            return 'Price: $' + price.toLocaleString();
                        }
                    }
                }
            }
        }
    });

    // ================================
    // GRÁFICO DE EVOLUCIÓN DE VOLUMEN
    // ================================

    // Obtenemos el contexto 2D del canvas para el gráfico de volumen.
    const ctxVolume = document.getElementById('volume-chart').getContext('2d');
    // Usamos las mismas etiquetas (meses) para el eje X.
    const volumeLabels = priceLabels;
    // Datos de volumen correspondientes a cada mes.
    const volumes = [50000, 55000, 60000, 65000, 70000, 75000, 80000, 75000, 85000];

    // Creamos el gráfico de barras para el volumen.
    new Chart(ctxVolume, {
        type: 'bar', // Tipo de gráfico: 'bar' para barras.
        data: {
            labels: volumeLabels,
            datasets: [{
                label: 'Volume',                        // Etiqueta para la leyenda.
                data: volumes,                          // Datos del volumen.
                backgroundColor: 'rgba(6, 20, 40, 0.7)',  // Color de las barras.
                borderColor: 'rgb(6, 20, 40)',            // Color del borde de las barras.
                borderWidth: 1                          // Grosor del borde.
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {display: true, text: 'Months'},
                    ticks: {
                        maxRotation: 45,
                        minRotation: 30,
                        autoSkip: true,
                        maxTicksLimit: 8
                    }
                },
                y: {
                    title: {display: true, text: 'Volume'},
                    beginAtZero: true,                       // El eje Y empieza en 0.
                    ticks: {
                        callback: function (value) {
                            return value.toLocaleString();       // Formatea los números para mejor legibilidad.
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    titleColor: '#000',
                    bodyColor: '#000',
                    borderColor: '#ddd',
                    borderWidth: 1
                    // En este gráfico de volumen, no se han personalizado los callbacks, pero se pueden agregar de manera similar.
                }
            }
        }
    });
};

const confirmModal = new bootstrap.Modal(document.getElementById('confirm-modal'));
const purchaseModal = new bootstrap.Modal(document.getElementById('purchase-modal'));

document.getElementById('buy-btn').addEventListener('click', () => confirmModal.show());

document.getElementById('confirm-buy').addEventListener('click', () => {
    confirmModal.hide();
    setTimeout(() => purchaseModal.show(), 500); // Pequeño delay para mejor transición
});function setupTransaction(buttonId, confirmId, finalizeId, amountId, action) {
    const actionText = action === "buy" ? "Purchase" : "Sale";
    const confirmModalEl = document.getElementById(`confirm-${action}-modal`);
    const actionModalEl = document.getElementById(`${action}-modal`);

    if (!confirmModalEl || !actionModalEl) {
        console.error(`❌ Modal not found for action: ${action}`);
        return;
    }

    const confirmModal = new bootstrap.Modal(confirmModalEl);
    const actionModal = new bootstrap.Modal(actionModalEl);

    const button = document.getElementById(buttonId);
    if (!button) {
        console.error(`❌ Button with ID "${buttonId}" not found.`);
        return;
    }

    button.addEventListener("click", () => confirmModal.show());

    document.getElementById(confirmId).addEventListener("click", () => {
        confirmModal.hide();
        setTimeout(() => actionModal.show(), 500);
    });

    document.getElementById(finalizeId).addEventListener("click", () => {
        let amount = document.getElementById(amountId).value;
        if (amount && amount > 0) {
            actionModal.hide();
            alert(`✅ ${actionText} successful! You ${action === "buy" ? "bought" : "sold"} ${amount} BTC.`);
        } else {
            alert("⚠️ Please enter a valid amount.");
        }
    });
}

// Configurar eventos para compra y venta
setupTransaction("buy-btn", "confirm-buy", "finalize-purchase", "crypto-amount", "buy");
setupTransaction("sell-btn", "confirm-sell", "finalize-sale", "selling-amount", "sell");
console.log(document.getElementById("sell-btn")); // Verifica si el botón de venta existe
console.log(document.getElementById("confirm-sell")); // Verifica si el botón de confirmación de venta existe
console.log(document.getElementById("finalize-sale")); // Verifica si el botón de finalización de venta existe
console.log(document.getElementById("sell-modal")); // Verifica si el modal de venta existe
console.log(document.getElementById("confirm-sell-modal")); // Verifica si el modal de confirmación de venta existe


document.getElementById("dropdownMenu").addEventListener("click", function(event) {
    window.location.href = "highlights.html";
});
