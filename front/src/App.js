/** App.js */
import React from "react";
import ErrorMessage from "./components/ErrorMessage";
import axios from 'axios';

import Chart from "./components/Chart";
import { useState } from 'react';
import "./styles.css";

const dimensions = {
  width: 1000,
  height: 350,
  margin: {
    top: 30,
    right: 30,
    bottom: 30,
    left: 60
  }
};
const API_URL = "http://localhost:4000/stocks?limit=20";
const SERVICE_UNAVAILABLE_ERROR_MESSAGE = "Le service est momentanément indisponible";
const CHART_NAME = "Stocks chart";
const CHART_COLOR = "red";


export default function App() {
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState();
  const [chartData, setChartData] = useState({
    name: CHART_NAME,
    color: CHART_COLOR,
    items: []
  });

  React.useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        if (response.data.status === "ok") {
          setApiError(false);
          setChartData({
            name: CHART_NAME,
            color: CHART_COLOR,
            items: response.data.message
          })
        } else {
          setApiErrorMessage(response.data.message);
          setApiError(true);
        }
      })
      .catch(err => {
        setApiErrorMessage(SERVICE_UNAVAILABLE_ERROR_MESSAGE);
        setApiError(true)
      })
  }, [])


  // this function update the chart when table's input change
  const updateStockData = (value, index) => {
    let stockList = chartData.items
    let foundIndex = stockList.findIndex(data => data.index === index);
    stockList[foundIndex].stocks = value;
    setChartData({
      name: CHART_NAME,
      color: CHART_COLOR,
      items: stockList

    })
  }
  return (
    apiError || chartData.items.length === 0 ?
    
      (<ErrorMessage data-testid="error-component" message={apiErrorMessage}>
      </ErrorMessage>) :
      <div>
        <Chart
          data-testid="chart-component"
          data={[chartData]}
          dimensions={dimensions}
        />
        <div>{CHART_NAME}</div>
        <table border="1" data-testid="stock-table">
        <tbody>

          <tr >
            {chartData.items.map((data, index) => {
              return (
                <td data-testid="stock-item" key={data.index} >
                  <input className="cell-input" type="number" defaultValue={data.stocks} onChange={e => updateStockData(e.target.value, index)}
                  ></input>
                </td>
              )
            })}

          </tr>
          </tbody>
        </table>
      </div>
  );
}
