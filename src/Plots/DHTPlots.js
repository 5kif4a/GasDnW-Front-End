import React, {useEffect, useState} from "react";
import API from "../Utils/API";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRedo} from "@fortawesome/free-solid-svg-icons";
import createPlotlyComponent from "react-plotly.js/factory";
import Plotly from "plotly.js-finance-dist";

const Plot = createPlotlyComponent(Plotly);

function Temperature() {
    // значения датчика
    const [currentValue, setCurrentValue] = useState('-');
    const [previosValue, setPreviosValue] = useState(currentValue);
    const [text, setText] = useState("Temperature, °C<br>" +
        "<span style='font-size:0.8em;color:gray'>Requesting data...</span>");

    const data = {
        value: currentValue,
        type: "indicator",
        mode: "number+delta",
        delta: {reference: previosValue},
        title: {
            text: text
        }
    };

    const layout = {
        height: 150,
        font: {
            color: "white"
        },
        margin: {t: 80, b: 0, l: 0, r: 0},
        plot_bgcolor: "#282724",
        paper_bgcolor: "#3A3A3E"
    };

    const config = {responsive: true};

    // запрос на получение данных с датчика
    async function getValue() {
        const res = await API.get("dht");
        return res.data;
    }

    // сбросить график (обновить)
    function refreshPlot() {
        // setCurrentValue('-');
        updatePlot();
    }

    // добавляем данные в график
    function updatePlot() {
        getValue()
            .then(res => {
                let last_update = new Date().toLocaleTimeString();
                let value = res['temp'];
                let date = new Date(res['date_time']).toLocaleString();

                setPreviosValue(currentValue);
                setCurrentValue(value);

                setText(`Temperature, °C<br>` +
                    `<span style='font-size:0.8em;color:gray'>Last update: ${last_update}<br>` +
                    `<span style='font-size:0.8em;color:gray'>Last measurement: ${date}</span>` +
                    `</span>`);
            })
            .catch(e => {
                // setTitle("No connection!");
            });
    }

    useEffect(() => {
        const interval = setInterval(() => {
            updatePlot();
        }, 3000);
        return () => clearInterval(interval);
    }, [data]);

    return (
        <div className="d-flex flex-column">
            <div className="d-flex justify-content-end py-1">
                <button className="btn btn-success" onClick={refreshPlot}>
                    <FontAwesomeIcon icon={faRedo}/>
                </button>
            </div>
            <Plot
                className="text-center"
                data={[data]}
                layout={layout}
                config={config}
            />
        </div>
    );
}

function Hudimity() {
    // значения датчика
    const [value, setValue] = useState(0);

    const [text, setText] = useState("Hudimity, °C<br>" +
        "<span style='font-size:0.8em;color:gray'>Requesting data...</span>");

    const data = {
        value: value,
        type: "indicator",
        mode: "gauge+number",
        gauge: {axis: {range: [0, 100]}},
        title: {
            text: text
        }
    };

    const layout = {
        height: 200,
        font: {
            color: "white"
        },
        margin: {t: 80, b: 15, l: 40, r: 40},
        plot_bgcolor: "#282724",
        paper_bgcolor: "#3A3A3E"
    };

    const config = {responsive: true};

    // запрос на получение данных с датчика
    async function getValue() {
        const res = await API.get("dht");
        return res.data;
    }

    // сбросить график (обновить)
    function refreshPlot() {
        // setValue(0);
        updatePlot();
    }

    // добавляем данные в график
    function updatePlot() {
        getValue()
            .then(res => {
                let value = res['temp'];
                setValue(value);
                setText(`Hudimity, °C`);
            })
            .catch(e => {
                setText("Hudimity, %<br>" +
                    "<span style='font-size:0.8em;color:gray'>No connection</span>");
            });
    }

    useEffect(() => {
        const interval = setInterval(() => {
            updatePlot();
        }, 3000);
        return () => clearInterval(interval);
    }, [data]);

    return (
        <div className="d-flex flex-column">
            <div className="d-flex justify-content-end py-1">
                <button className="btn btn-success" onClick={refreshPlot}>
                    <FontAwesomeIcon icon={faRedo}/>
                </button>
            </div>
            <Plot
                className="text-center"
                data={[data]}
                layout={layout}
                config={config}
            />
        </div>
    );
}

function DHTPlot() {
    return (
        <div className="d-flex flex-column animated fadeInRight">
            <Temperature/>
            <Hudimity/>
        </div>
    )
}

export default DHTPlot;
