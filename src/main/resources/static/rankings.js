const rankingData = [
    {
        rank: 1,
        coin: "Bitcoin",
        price: "$43,200",
        marketCap: "$820B",
        change: "+2.5%",
        logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=024",
        trend: "https://via.placeholder.com/50x25?text=📈"
    },
    {
        rank: 2,
        coin: "Ethereum",
        price: "$3,100",
        marketCap: "$370B",
        change: "-1.2%",
        logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=024",
        trend: "https://via.placeholder.com/50x25?text=📉"
    },
    {
        rank: 3,
        coin: "Solana",
        price: "$142.50",
        marketCap: "$56B",
        change: "+5.8%",
        logo: "https://cryptologos.cc/logos/solana-sol-logo.png?v=024",
        trend: "https://via.placeholder.com/50x25?text=📈"
    }
];

const rankingTable = document.getElementById("rankingCards");

rankingData.forEach(item => {
    const row = `
    <tr>
        <td>${item.rank}</td>
        <td>
            <div class="d-flex align-items-center">
                <img src="${item.logo}" alt="${item.coin}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover; margin-right: 8px;">
                <span>${item.coin}</span>
            </div>
        </td>
        <td>${item.price}</td>
        <td>${item.marketCap}</td>
        <td class="${item.change.includes('-') ? 'text-danger' : 'text-success'}">
            ${item.change}
        </td>
        <td><img src="${item.trend}" alt="trend" class="trend-chart"></td>
    </tr>
`;
    rankingTable.innerHTML += row;

});
