/** App.js */
import React from "react";
import ErrorMessage from "./components/ErrorMessage";
import axios from 'axios';
import Chart from "./components/Chart";
import Header from "./components/Header";
import FooterCustom from "./components/FooterCustom";

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
const SERVICE_UNAVAILABLE_ERROR_MESSAGE = "The service is temporarily unavailable";
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
    <>
      <Header />
      <div className="content">
        {apiError || chartData.items.length === 0 ?

          (<ErrorMessage data-testid="error-component" message={apiErrorMessage}>
          </ErrorMessage>) :
          <div>
            <div><b> {CHART_NAME}</b></div>
            <Chart
              data-testid="chart-component"
              data={[chartData]}
              dimensions={dimensions}
            />
            <div>You can interact with your charts by modifing inputs above</div>
            <table  className="table-chart" data-testid="stock-table">
                <tr >
                  {chartData.items.map((data, index) => {
                    return (
                      <td  className="row-chart" data-testid="stock-item" key={data.index} >
                        <input className="cell-input" type="number" defaultValue={data.stocks} onChange={e => updateStockData(e.target.value, index)}
                        ></input>
                      </td>
                    )
                  })}

                </tr>
            </table>
          </div>
        }
      </div>
      <FooterCustom />
    </>
  );
}
