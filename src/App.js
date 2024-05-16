// App.js
import React from 'react';
import './App.css';
import StocksData from './StocksData';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Stock Data</h1>
                <StocksData />
            </header>
        </div>
    );
}

export default App;