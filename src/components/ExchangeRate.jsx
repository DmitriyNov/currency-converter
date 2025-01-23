import { useState, useEffect } from "react";

export default function ExchangeRate (props) {

    const {exchangeRate} = props;

    const [valute, setValute] = useState(
        exchangeRate.find((item) => item.CharCode === "RUR")
    );

    function selectValute (event) {
        setValute(exchangeRate.find((item) => item.CharCode === event.target.value));
    }

    const [currentRatio, setCurrentRatio] = useState(1 / (valute.Value/valute.Nominal));

    useEffect(() => {
        setCurrentRatio(1 / (valute.Value/valute.Nominal));
        console.log(exchangeRate)
    }, [valute]);

    return (
        <div className="exchange_rate"> 
            <div className="exchange_rate__block">
                <span>
                    Базовая валюта
                </span>
                <select className="converter__from-select" value={valute.CharCode} onChange={selectValute}>
                    {exchangeRate.map((item, i) => (
                        <option className={"converter__from-option" + " " + (valute.CharCode === item.CharCode ? "converter__from-option_selected" : "")} key={i} value={item.CharCode} >
                            {item.CharCode}
                        </option>
                    ))}
                </select>
            </div>
            <div className="exchange_rate__block">
                <span>
                    Курс валют
                </span>
                <div className="exchange_rate__list">
                    {exchangeRate.map((item, i) => (
                        (item.CharCode !== valute.CharCode) ?
                        <div className="exchange_rate__item" key={i} >
                            <span>
                                {item.CharCode}
                            </span>
                            <span>
                                {Number((item.Value/item.Nominal)*currentRatio).toFixed(3)}
                            </span>
                        </div>
                        : <></>
                    ))}
                </div>
            </div>
        </div>
    )
}