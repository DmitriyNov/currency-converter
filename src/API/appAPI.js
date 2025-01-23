import createRequest from "./createRequest";

export function getExchangeRate (callback) {
    createRequest({
        url: "https://www.cbr-xml-daily.ru/daily_json.js",
        data: {
            method: "GET",
        },
        callback: callback,
    });
}