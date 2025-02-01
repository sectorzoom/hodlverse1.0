// src/App.js
import React from 'react';
import TradingViewWidget from './TradingViewWidget'; // Importar el widget

function App() {
    return (
        <div className="App">
            <h1>Bitcoin Price Chart</h1>
            <p>Track Bitcoin's market evolution with the TradingView chart below.</p>
            <div style={{ height: "600px", width: "100%" }}>
                <TradingViewWidget />
            </div>
        </div>
    );
}

export default App;
