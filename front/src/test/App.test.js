import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { act } from 'react-test-renderer';

import axios from "axios";
jest.mock("axios");

const CHART_NAME = "Stocks chart";

const errorData = {
  status: "ko",
  message: "server down"
}
const stocksData = {
  status: "ok",
  message: [
    {
      "timestamp": "2022-07-01T12:23:27.109Z",
      "index": 0,
      "stocks": "19.595"
    },
    {
      "timestamp": "2022-06-30T12:23:27.114Z",
      "index": 1,
      "stocks": "16.221"
    },
    {
      "timestamp": "2022-06-29T12:23:27.114Z",
      "index": 2,
      "stocks": "21.774"
    },
  ]
}
beforeEach(async() => {
  axios.get.mockResolvedValue({ data: stocksData });
  await act(async () => render(<App />));
});

describe('App component with data fill', () => {
  jest.setTimeout(60000);

  test('it should renders header  ', () => {
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  }); 
  test('it should renders chart name ', () => {
    const chart = screen.getByTestId('chart');
    expect(chart).toBeInTheDocument();
    expect(screen.getByText(CHART_NAME)).toBeInTheDocument();
  });
  test("it should renders table ", () => {
    
    const stockTable = screen.getByTestId('stock-table');
    expect(stockTable).toBeInTheDocument();
  });

  test("it should renders cell for each item ", async () => {
    
    const stockList = await screen.findAllByTestId('stock-item');
    expect(stockList).toHaveLength(3);
  });

 
  test('it should renders footer  ', () => {
    
    const footer = screen.getByTestId('custom-footer');
    expect(footer).toBeInTheDocument();
  }); 
})


describe('App component with error fill', () => {
  test('it should renders  error component', async () => {
    axios.get.mockResolvedValue({ data: errorData });
    await act(async () => render(<App />));
    const errorComponent = screen.getByTestId('error-message');
    expect(errorComponent).toBeInTheDocument();
  });
})