// src/StocksData.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StocksData from './StocksData';

// Mock fetch response
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({
            data: [
                {
                    open: "5265.09",
                    close: "5357",
                    high: "5464.35",
                    low: "5184.48"
                }
            ]
        }),
    })
);

test('fetches and displays stock data', async () => {
    const { getByTestId, queryByTestId } = render(<StocksData />);

    const input = getByTestId('app-input');
    const button = getByTestId('submit-button');

    fireEvent.change(input, { target: { value: '5-January-2000' } });
    fireEvent.click(button);

    await waitFor(() => expect(queryByTestId('stock-data')).toBeInTheDocument());

    expect(getByTestId('stock-data')).toHaveTextContent('Open: 5265.09');
    expect(getByTestId('stock-data')).toHaveTextContent('Close: 5357');
    expect(getByTestId('stock-data')).toHaveTextContent('High: 5464.35');
    expect(getByTestId('stock-data')).toHaveTextContent('Low: 5184.48');
});

test('displays no results message when no data found', async () => {
    // Mock fetch response for no data
    global.fetch.mockImplementationOnce(() =>
        Promise.resolve({
            json: () => Promise.resolve({
                data: []
            }),
        })
    );

    const { getByTestId, queryByTestId } = render(<StocksData />);

    const input = getByTestId('app-input');
    const button = getByTestId('submit-button');

    fireEvent.change(input, { target: { value: '31-December-1999' } });
    fireEvent.click(button);

    await waitFor(() => expect(queryByTestId('no-result')).toBeInTheDocument());

    expect(getByTestId('no-result')).toHaveTextContent('No Results Found');
});
