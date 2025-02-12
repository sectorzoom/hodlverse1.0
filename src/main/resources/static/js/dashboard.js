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
    let chartDom = document.getElementById("chart-container");

    if (!chartDom) {
        console.error("❌ No se encontró el contenedor del gráfico.");
        return;
    }

    let myChart = echarts.init(chartDom);

    // 🔹 Generación de datos (100 días de ganancias aleatorias)
    let base = new Date(2024, 0, 1).getTime();
    let oneDay = 24 * 3600 * 1000;
    let data = [];

    for (let i = 0; i < 100; i++) {
        let time = base + i * oneDay;
        let value = Math.round(Math.random() * 200 + 50);
        data.push([time, value]);
    }

    console.log("📊 Datos generados:", data);

    let option = {
        title: {
            text: 'Balance Evolution',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                let date = new Date(params[0].value[0]);
                let day = date.getDate().toString().padStart(2, '0');
                let month = (date.getMonth() + 1).toString().padStart(2, '0');
                let year = date.getFullYear();
                let value = params[0].value[1];

                return `${day}-${month}-${year} <br/> Balance: <b>$${value}</b>`;
            }
        },
        grid: {
            bottom: 95  // ⬆ Aumentamos espacio inferior para la barra de zoom
        },
        xAxis: {
            type: 'time',
            name: 'Day',
            nameLocation: 'middle',
            nameTextStyle: {
                color: '#061428'
            },
            nameGap: 30,
            axisLabel: {
                formatter: function (value) {
                    return new Date(value).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
                }
            }
        },
        yAxis: {
            type: 'value',
            name: 'Balance',
            nameLocation: 'middle',
            nameGap: 50,
            axisLabel: {
                formatter: function (value) {
                    return '$' + value;
                }
            }
        },
        dataZoom: [
            { type: 'inside', start: 0, end: 100 },
            { start: 0, end: 100 }
        ],
        series: [
            {
                type: 'line',
                symbol: 'none',
                lineStyle: {
                    color: '#061428',
                    width: 2
                },
                areaStyle: {
                    color: 'rgba(126, 172, 237, 0.3)' // 🔹 Color del fondo con transparencia
                },
                data: data
            }
        ],
        toolbox: {
            show: true,
            feature: {
                restore: {},
                saveAsImage: {}
            }
        }
    };

    try {
        myChart.setOption(option);
    } catch (error) {
        console.error("❌ Error al cargar el gráfico:", error);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const calendarContainer = document.getElementById("calendar");
    const daysRemainingText = document.getElementById("daysRemaining");
    const timeRemainingText = document.getElementById("timeRemaining");

    const today = new Date();
    const currentDay = today.getDate();
    const markedDay = 20; // Cambia este número según el día que desees marcar
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    // Crear fecha objetivo (inicio del día marcado, es decir, a las 00:00:00)
    const targetDate = new Date(today.getFullYear(), today.getMonth(), markedDay, 0, 0, 0);

    // Calcular la diferencia en milisegundos desde este momento hasta el inicio del día marcado
    const timeDiff = targetDate - today;

    // Calcular correctamente los días, horas y minutos restantes
    const remainingDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const remainingHours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const remainingMinutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    // Mostrar la cuenta regresiva con los valores correctos
    daysRemainingText.textContent = `${remainingDays} Días`;
    timeRemainingText.textContent = `${remainingHours} horas, ${remainingMinutes} minutos`;

    // Crear el calendario
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.textContent = day;

        if (day < currentDay) {
            dayElement.classList.add("past");
        } else if (day === currentDay) {
            dayElement.classList.add("today");
        } else if (day === markedDay) {
            dayElement.classList.add("marked");
        } else {
            dayElement.classList.add("remaining");
        }

        calendarContainer.appendChild(dayElement);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Datos de progreso iniciales
    const partidas = [
        { nombre: "2022", porcentaje: 40 }, // Partida anterior
        { nombre: "2023", porcentaje: 75 }, // Partida actual
    ];

    // Elementos de progreso de partidas
    const partidaAnteriorText = document.getElementById("partidaAnteriorText");
    const partidaActualText = document.getElementById("partidaActualText");
    const lineaAnterior = document.getElementById("past");
    const lineaActual = document.getElementById("now");

    // Elementos de la barra de progreso circular
    const progressCircle = document.getElementById("progressCircle");
    const progressText = document.getElementById("progressText");

    // Función para actualizar las partidas (una sola vez)
    function actualizarPartidas() {
        if (!partidaAnteriorText || !partidaActualText || !lineaAnterior || !lineaActual) {
            console.error("Uno o más elementos no fueron encontrados.");
            return;
        }

        partidaAnteriorText.textContent = partidas[0].nombre;
        partidaActualText.textContent = partidas[1].nombre;

        // Ajustar la altura de las líneas según el porcentaje
        lineaAnterior.style.height = `${partidas[0].porcentaje }px`;
        lineaActual.style.height = `${partidas[1].porcentaje }px`;
    }

    // Función para animar la barra de progreso circular (una sola vez)
    function animarProgresoCircular() {
        const nuevoOffset = 314 - (partidas[1].porcentaje / 100) * 314;
        progressCircle.style.transition = "stroke-dashoffset 1.5s ease-in-out";
        progressCircle.style.strokeDashoffset = nuevoOffset;
        progressText.textContent = `${partidas[1].porcentaje}%`;
    }
    // Llamar a la función una sola vez después de cargar
    setTimeout(() => {
        actualizarPartidas();
        animarProgresoCircular();
    }, 1000); // Retraso de 1 segundo para dar un efecto inicial

    async function fetchTransactionsById() {
        try {
            const userId = await User.getUserId(); // Obtener ID del usuario
            console.log('✅ ID del usuario:', userId);

            const transactions = await Transaction.getTransactionsByUserId(userId); // Obtener transacciones
            console.log('✅ Transacciones del usuario:', transactions);

            // Llenar la tabla con las transacciones
            populateTransactionTable(transactions);

        } catch (error) {
            console.error('❌ Error en fetchTransactionsById:', error);
        }
    }
    fetchTransactionsById();

    function populateTransactionTable(transactions) {
        const tableBody = document.getElementById("transactionTableBody");
        tableBody.innerHTML = ""; // Limpiar la tabla antes de agregar datos

        transactions.forEach(transaction => {
            const row = document.createElement("tr");

            row.innerHTML = `
            <td class="col-4"><img src="${transaction.destinationCurrency.image}" alt="Logo de ${transaction.destinationCurrency.name}" height="24">${transaction.destinationCurrency.name}</td>
            <td class="col-2 text-center">${transaction.transactionType}</td>
            <td class="col-3 text-end">${transaction.originUnitPrice.toFixed(2)} USD</td>
            <td class="col-2 text-end ${transaction.destinationUnitPrice >= transaction.originUnitPrice ? 'text-success' : 'text-danger'}">
                ${((transaction.destinationUnitPrice - transaction.originUnitPrice) / transaction.originUnitPrice * 100).toFixed(2)}%
            </td>
        `;

            tableBody.appendChild(row);
        });

        console.log("✅ Tabla actualizada con transacciones.");
    }

});