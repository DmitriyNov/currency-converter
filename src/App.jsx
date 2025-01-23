import { useEffect, useState } from 'react';
import {getExchangeRate} from "./API/appAPI";
import './App.css';
import Converter from './components/Converter';
import ExchangeRate from "./components/ExchangeRate";

function App() {
  const [page, setPage] = useState("converter");

  function changePage () {
    if (page === "converter") {
      setPage("exchange");
    } else {
      setPage("converter");
    }
  }

  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    getExchangeRate ((response) => {
      let currentExchangeRate = Object.values(response.Valute);
      currentExchangeRate.push(
        {
          CharCode: "RUR",
          Name: "Российский рубль",
          Value: 1,
          Nominal: 1,
        }
      );
      currentExchangeRate = currentExchangeRate.sort((a, b) => {
        if (a.CharCode < b.CharCode) {
          return -1;
        }
        if (a.CharCode > b.CharCode) {
          return 1;
        }
        return 0;
      });
      setExchangeRate(currentExchangeRate);
      console.log(currentExchangeRate);
    });
  }, []);

  return (
    <div className="App">
      <header className="header">
        <span className="header__title">
          Конвертер валют
        </span>
        <span className="header__switch_link" onClick={changePage}>
          {(page === "converter") ? "к курсам валют" : "к конвертеру валют"}
        </span>
      </header>
      <div className="widget">
        {(page === "converter" && exchangeRate !== null) ? 
        <Converter exchangeRate={exchangeRate} /> : 
        (page === "exchange" && exchangeRate !== null) ? 
        <ExchangeRate exchangeRate={exchangeRate} /> : 
        <></>}
      </div>
      
    </div>
  );
}

export default App;
