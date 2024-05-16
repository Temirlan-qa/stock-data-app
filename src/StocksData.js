// StocksData.js
import React, { useState } from 'react';

const StocksData = () => {
    const [date, setDate] = useState('');
    const [stockData, setStockData] = useState(null);
    const [noResults, setNoResults] = useState(false);

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleSearch = async () => {
        const response = await fetch(`https://jsonmock.hackerrank.com/api/stocks?date=${date}`);
        const data = await response.json();
        if (data.data && data.data.length > 0) {
            setStockData(data.data[0]);
            setNoResults(false);
        } else {
            setStockData(null);
            setNoResults(true);
        }
    };

    return (
        <div>
            <input
                type="text"
                data-testid="app-input"
                value={date}
                onChange={handleDateChange}
            />
            <button
                data-testid="submit-button"
                onClick={handleSearch}
            >
                Search
            </button>

            {stockData && (
                <ul data-testid="stock-data">
                    <li>Open: {stockData.open}</li>
                    <li>Close: {stockData.close}</li>
                    <li>High: {stockData.high}</li>
                    <li>Low: {stockData.low}</li>
                </ul>
            )}

            {noResults && (
                <div data-testid="no-result">No Results Found</div>
            )}
        </div>
    );
};

export default StocksData;
