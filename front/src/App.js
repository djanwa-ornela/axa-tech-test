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
        //console.log(response)
        console.log("response", response)
        console.log("response data ", response.data.status)

        if (response.data.status === "ok") {
          setApiError(false);
          setChartData({
            name: CHART_NAME,
            color: CHART_COLOR,
            items: response.data.message
          })
        } else {
          console.log("response.data.error", response.data.error);
          setApiErrorMessage(response.data.error);
          setApiError(true);
        }
      })
      .catch(err => {
        console.log("err", err)
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
      (<ErrorMessage message={apiErrorMessage}>
      </ErrorMessage>) :
      <div>
        <Chart
          data={[chartData]}
          dimensions={dimensions}
        /> 
        <div>{CHART_NAME}</div>
        <table border="1" data-testid="stock-table">
          <tr >
            {chartData.items.map((data, index) => {
            return (
              <td data-testid="stock-item">
                 <input className="cell-input"  type="number" key={data.index} defaultValue={data.stocks} onChange={e => updateStockData(e.target.value, index)}
              ></input>
              </td>
                         )
          })}
          
          </tr>
        </table>
      </div>
  );
}
