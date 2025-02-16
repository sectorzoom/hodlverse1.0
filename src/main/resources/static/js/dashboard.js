document.addEventListener("DOMContentLoaded", async function () {
    let chartDom = document.getElementById("chart-container");

    if (!chartDom) {
        console.error("❌ No se encontró el contenedor del gráfico.");
        return;
    }

    let myChart = echarts.init(chartDom);

    async function fetchStartDate() {
        try {
            const userId = await User.getUserId(); // Obtener ID del usuario
            const game = await Game.getActiveGameByUserId(userId);
            return new Date(game.startDate);
        } catch (error) {
            console.error('❌ Error al obtener el usuario:', error);
            return null;
        }
    }

    const startDate = await fetchStartDate();
    const endDate = new Date();

    let data = [];
    let current = new Date(startDate.getTime());

    while (current <= endDate) {
        let time = current.getTime();
        let value = Math.round(Math.random() * 200 + 50);
        data.push([time, value]);
        current.setDate(current.getDate() + 1);
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
                    return new Date(value).toLocaleDateString('es-ES', {day: '2-digit', month: 'short'});
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
            {type: 'inside', start: 0, end: 100},
            {start: 0, end: 100}
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

document.addEventListener("DOMContentLoaded", async function () {
    const calendarContainer = document.getElementById("calendar");
    const daysRemainingText = document.getElementById("daysRemaining");
    const timeRemainingText = document.getElementById("timeRemaining");

    async function fetchEndDate() {
        try {
            const userId = await User.getUserId(); // Obtener ID del usuario
            const game = await Game.getLastFinishedGameByUserId(userId); // Obtener el usuario por su ID
            return date = game.endDate;
        } catch (error) {
            console.error('❌ Error al obtener el usuario:', error);
            return null;
        }
    }

    const endDate = await fetchEndDate();
    console.log("📈 Fecha objetivo:", endDate);

    const today = new Date();
    const currentDay = today.getDate();
    const markedDay = 28; // Cambia este número según el día que desees marcar
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
        {nombre: "2022", porcentaje: 40}, // Partida anterior
        {nombre: "2023", porcentaje: 75}, // Partida actual
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
        lineaAnterior.style.height = `${partidas[0].porcentaje}px`;
        lineaActual.style.height = `${partidas[1].porcentaje}px`;
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

            const transactions = await Transaction.getLatestTransactionsByUserId(userId); // Obtener transacciones
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
            <td class="col-4"><img src="${transaction.destinationCurrency.image}" alt="Logo de ${transaction.destinationCurrency.name}" height="24"> ${transaction.destinationCurrency.name}</td>
            <td class="col-2 text-center">${transaction.transactionType}</td>
            <td class="col-3 text-end">${transaction.destinationUnitPrice.toFixed(2)}</td>
            <td class="col-3 text-end">$${transaction.destinationTransactionAmount.toFixed(2)}</td>
        `;

            tableBody.appendChild(row);
        });

        console.log("✅ Tabla actualizada con transacciones.");
    }

});
document.addEventListener("DOMContentLoaded", async () => {
    let user;

    async function getCryptos(){
        try{
            const userId = await User.getUserId(); // Obtener ID del usuario
            user = await User.getUserById(userId);
            const currencies = await Wallet.getWalletsCurrenciesById(userId);
            console.log(currencies);
            return currencies || []; // Retorna un array vacío si es null/undefined

        } catch (error) {
            console.error('❌ Error al obtener el usuario:', error);
            return []; // Devuelve un array vacío en caso de error
        }
    }
    const cryptos = await getCryptos();

    let currencies = await getCurrencies();

    async function getCurrencies(){
        try{
            const response = await $.ajax({
                url: `/wallets/${user.wallet.walletId}/currencies`,
                type: 'GET'
            });
            return response;
        } catch (error) {
            console.error('❌ Error al obtener el usuario:', error);
            return [];
        }
    }

    async function getTotalValue() {
        try {
            let promises = currencies.map(async (currency) => {
                const response = await $.ajax({
                    url: `/balances/total/${user.wallet.walletId}/${currency.currencyId}`,
                    type: 'GET'
                });
                return response; // Retorna el valor de la solicitud
            });

            let totalsValue = await Promise.all(promises); // Espera a que todas las promesas se resuelvan
            console.log("📊 totalValue cargado:", totalsValue);
            return totalsValue;
        } catch (error) {
            console.error('❌ Error al obtener los valores totales:', error);
            return [];
        }
    }


    let totalValue = await getTotalValue();
    console.log(totalValue);

    // Verifica que cryptos sea un array antes de iterar
    if (!Array.isArray(cryptos)) {
        console.error("❌ Error: cryptos no es un array", cryptos);
        return;
    }

    const container = document.getElementById("cryptosContainer");

    let contador = 0;
    // Genera y añade una card para cada crypto
    cryptos.forEach(crypto => {
        const card = document.createElement("div");
        card.classList.add("card", "crypto", "shadow-sm", "mb-2");
        let amount = totalValue[contador];
        console.log(amount);
        card.innerHTML = `
      <div class="card-body d-flex align-items-center justify-content-between">
        <div>
          <div class="mb-2">
            <h5 class="text">${crypto.name}</h5>
            <h5 class="text">${crypto.value}</h5>
            <div class="d-flex align-items-center gap-2">
              <h6 class="text-muted">${crypto.ticker}</h6>
              <h6 class="text-muted">${amount}</h6>
            </div>
          </div>
        </div>
        <div class="img-container">
          <img src="${crypto.image}" alt="${crypto.name}" height="55">
        </div>
      </div>
    `;
        container.appendChild(card);
        contador++;
    });
});
