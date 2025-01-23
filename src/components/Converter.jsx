import { useEffect, useState } from "react";

export default function Converter (props) {
    
    const {exchangeRate} = props;

    const [valuteFrom, setValuteFrom] = useState(
        exchangeRate.find((item) => item.CharCode === "RUR")
    );
    const [valuteTo, setValuteTo] = useState(
        exchangeRate.find((item) => item.CharCode === "USD")
    );

    const [currentRatio, setCurrentRatio] = useState((valuteFrom.Value/valuteFrom.Nominal) / (valuteTo.Value/valuteTo.Nominal));

    const [valueFrom, setValueFrom] = useState(1);
    const [valueTo, setValueTo] = useState(1*currentRatio);

    function tapValueFrom (event) {
        const currentValueFrom = event.currentTarget.value;
        const lastSymbol = currentValueFrom.toString().slice(-1);
        const filter = /^[0-9]/i;
        if (!filter.test(lastSymbol) && lastSymbol !== "") {
            return;
        }
        const currentValueTo = (Number(currentValueFrom)*currentRatio).toFixed(3);
        setValueFrom(currentValueFrom);
        setValueTo(currentValueTo);
    }

    function selectValuteFrom (event) {
        setValuteFrom(exchangeRate.find((item) => item.CharCode === event.target.value));
    }

    function selectValuteTo (event) {
        setValuteTo(exchangeRate.find((item) => item.CharCode === event.target.value));
    }

    useEffect(() => {
        setCurrentRatio((valuteFrom.Value/valuteFrom.Nominal) / (valuteTo.Value/valuteTo.Nominal));
    }, [valuteFrom]);

    useEffect(() => {
        setCurrentRatio((valuteFrom.Value/valuteFrom.Nominal) / (valuteTo.Value/valuteTo.Nominal));
    }, [valuteTo]);

    useEffect(() => {
        setValueTo((Number(valueFrom)*currentRatio).toFixed(3));
    }, [currentRatio]);

    function swapValute () {
        const currentValuteFrom = {...valuteFrom};
        const currentValuteTo = {...valuteTo};
        setValuteFrom(currentValuteTo);
        setValuteTo(currentValuteFrom);
    }

    return (
        <div className="converter">
            <div className="converter__from">
                <input className="converter__from-input" value={valueFrom} onChange={tapValueFrom}/>
                <select className="converter__from-select" value={valuteFrom.CharCode} onChange={selectValuteFrom}>
                    {exchangeRate.map((item, i) => (
                        <option className={"converter__from-option" + " " + (valuteTo.CharCode === item.CharCode ? "converter__from-option_selected" : "")} key={i} value={item.CharCode} >
                            {item.CharCode}
                        </option>
                    ))}
                </select>
            </div>
            <div className="converter__icon">
                <span className="material-symbols-outlined" onClick={swapValute}>
                    sync_alt
                </span>
            </div>
            <div className="converter__to">
                <input className="converter__to-input" value={valueTo} />
                <select className="converter__to-select" value={valuteTo.CharCode} onChange={selectValuteTo}>
                    {exchangeRate.map((item, i) => (
                        <option className={"converter__to-option" + " " + (valuteTo.CharCode === item.CharCode ? "converter__to-option_selected" : "")} key={i} value={item.CharCode} >
                            {item.CharCode}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}