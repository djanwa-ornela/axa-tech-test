import { render, screen ,waitFor} from '@testing-library/react';
import App from '../App';
import { act } from 'react-test-renderer';

import axios from "axios";
jest.mock("axios");

const CHART_NAME = "Stocks chart";

const stocks = {
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

  describe('App component', () => {
    jest.setTimeout(60000);

  test('it renders chart name ', async () => {
    axios.get.mockResolvedValue({ data: stocks });
    await act( async () => render(<App/>));
    console.log("screen", screen)
    expect(screen.getByText(CHART_NAME)).toBeInTheDocument();
  });
  test("it renders table ", async () => {
    axios.get.mockResolvedValue({ data: stocks });
    await act( async () => render(<App/>));
    const stockTable = screen.getByTestId('stock-table');
    expect(stockTable).toBeInTheDocument();
  }); 

  test("it renders cell for each item ", async () => {
      axios.get.mockResolvedValue({ data: stocks });
      await act( async () => render(<App/>));
      const stockList = await screen.findAllByTestId('stock-item');
      expect(stockList).toHaveLength(3);
    }); 

})