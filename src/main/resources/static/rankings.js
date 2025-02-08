// Ejemplos de datos para el ranking (puedes ampliar o sustituir por una API)
const rankingData = [
    {
        rank: 1,
        coin: "Bitcoin",
        price: "$42,300",
        marketCap: "$800B",
        change: "+3.5%",
        logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
        sparkline: [42000, 42200, 42300, 42450, 42600, 42500, 42400]
    },
    {
        rank: 2,
        coin: "Ethereum",
        price: "$2,850",
        marketCap: "$340B",
        change: "+2.8%",
        logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
        sparkline: [2800, 2820, 2830, 2840, 2850, 2840, 2835]
    },
    {
        rank: 3,
        coin: "Solana",
        price: "$98.50",
        marketCap: "$40B",
        change: "-1.2%",
        logo: "https://cryptologos.cc/logos/solana-sol-logo.png",
        sparkline: [100, 99, 98.5, 98, 97.5, 98, 98.5]
    },
    {
        rank: 4,
        coin: "Cardano",
        price: "$1.20",
        marketCap: "$40B",
        change: "+5.0%",
        logo: "https://cryptologos.cc/logos/cardano-ada-logo.png",
        sparkline: [1.15, 1.17, 1.18, 1.20, 1.22, 1.25, 1.20]
    },
    {
        rank: 5,
        coin: "Ripple",
        price: "$0.85",
        marketCap: "$40B",
        change: "-0.8%",
        logo: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
        sparkline: [0.87, 0.86, 0.85, 0.84, 0.83, 0.84, 0.85]
    },
    {
        rank: 6,
        coin: "Polkadot",
        price: "$27.50",
        marketCap: "$35B",
        change: "+1.8%",
        logo: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
        sparkline: [26, 26.5, 27, 27.5, 28, 27.8, 27.5]
    }
];

// Rellenar la tabla dinámicamente
const tbody = document.getElementById("rankingCards");
tbody.innerHTML = rankingData.map((item, index) => `
      <tr>
        <th scope="row">${item.rank}</th>
        <td>
          <div class="d-flex align-items-center">
            <span>${item.coin}</span>
          </div>
        </td>
        <td>${item.price}</td>
        <td>${item.marketCap}</td>
        <td class="${item.change.startsWith('+') ? 'text-success' : 'text-danger'}">${item.change}</td>
        <td>
          <canvas id="sparkline-${index}" class="sparkline-canvas"></canvas>
        </td>
      </tr>
    `).join("");

// Inicializar Chart.js para cada sparkline
rankingData.forEach((item, index) => {
    const ctx = document.getElementById(`sparkline-${index}`).getContext('2d');

    // Crear gradiente para el sparkline
    let gradient = ctx.createLinearGradient(0, 0, 0, 40);
    if (item.change.startsWith('+')) {
        gradient.addColorStop(0, 'rgba(40, 167, 69, 0.5)'); // verde
        gradient.addColorStop(1, 'rgba(40, 167, 69, 0)');
    } else {
        gradient.addColorStop(0, 'rgba(220, 53, 69, 0.5)'); // rojo
        gradient.addColorStop(1, 'rgba(220, 53, 69, 0)');
    }

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: item.sparkline.map((_, i) => i + 1),
            datasets: [{
                data: item.sparkline,
                borderColor: item.change.startsWith('+') ? '#28a745' : '#dc3545',
                backgroundColor: gradient,
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { display: false },
                y: { display: false }
            }
        }
    });
});