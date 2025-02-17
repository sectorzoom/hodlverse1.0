/* PIE CHART */
document.addEventListener("DOMContentLoaded", function() {
    // Espera a que el DOM esté completamente cargado antes de ejecutar el código

    // Obtener el elemento del DOM donde se renderizará el gráfico
    let chartDom = document.getElementById('cryptoPieChart');

    // Inicializar el gráfico con el elemento obtenido
    let myChart = echarts.init(chartDom);

    // Definir la configuración del gráfico
    let option;

    option = {
        tooltip: {
            trigger: 'item' // Muestra información cuando se pasa el mouse sobre un elemento del gráfico
        },
        legend: {
            top: '5%', // Posiciona la leyenda en la parte superior
            left: 'center' // Centra la leyenda horizontalmente
        },
        series: [
            {
                name: 'CryptoCoin', // Nombre de la serie de datos
                type: 'pie', // Tipo de gráfico: pastel
                radius: ['30%', '70%'], // Define el radio interno y externo del gráfico (tipo anillo)
                avoidLabelOverlap: false, // Evita que las etiquetas se solapen
                itemStyle: {
                    borderRadius: 10, // Bordes redondeados en cada segmento
                    borderColor: '#fff', // Color del borde de cada segmento
                    borderWidth: 2 // Ancho del borde
                },
                label: {
                    show: false, // Oculta las etiquetas dentro del gráfico
                    position: 'center' // Posiciona las etiquetas en el centro (si estuvieran visibles)
                },
                emphasis: {
                    label: {
                        show: true, // Muestra la etiqueta al hacer hover sobre un segmento
                        fontSize: 20, // Tamaño de fuente más grande en hover
                        fontWeight: 'bold' // Hace la fuente en negrita en hover
                    }
                },
                labelLine: {
                    show: false // Oculta las líneas de conexión entre etiquetas y segmentos
                },
                data: [
                    { value: 1048, name: 'Bitcoin', image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png' },
                    { value: 735, name: 'Ethereum', image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' },
                    { value: 580, name: 'Cardano', image: 'https://cryptologos.cc/logos/cardano-ada-logo.png' },
                    { value: 484, name: 'Solana', image: 'https://cryptologos.cc/logos/solana-sol-logo.png' },
                    { value: 300, name: 'Dogecoin', image: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png' }
                ]
            }
        ]
    };

    // Aplicar la configuración al gráfico y renderizarlo
    myChart.setOption(option);
});
