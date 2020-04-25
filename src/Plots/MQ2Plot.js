import React, {useEffect, useState} from "react";
import API from "../Utils/API";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faRedo, faStop} from "@fortawesome/free-solid-svg-icons";
import createPlotlyComponent from "react-plotly.js/factory";
import Plotly from "plotly.js-finance-dist";
import Spinner from "../Utils/Spinner";

const Plot = createPlotlyComponent(Plotly);

const selectorOptions = {
    buttons: [{
        step: 'hour',
        stepmode: 'todate',
        count: 12,
        label: '12h'
    },{
        step: 'day',
        stepmode: 'todate',
        count: 1,
        label: '1d'
    },{
        step: 'day',
        stepmode: 'todate',
        count: 3,
        label: '3d'
    },{
        step: 'day',
        stepmode: 'todate',
        count: 7,
        label: '1w'
    }, {
        step: 'month',
        stepmode: 'backward',
        count: 1,
        label: '1m'
    }, {
        step: 'all',
    }],
    font: {color: '#000000'},
    direction: 'left',
    pad: {'r': 10, 't': 10},
    showactive: true,
    type: 'buttons',
    xanchor: 'left',
    y: 1.2,
    yanchor: 'top'
};

// запрос на получение данных с датчика
async function getData(endpoint) {
    const res = await API.get(endpoint);
    return res.data;
}

export default () => {
    const [isLoading, setIsLoading] = useState(true);
    // даты получения информации с датчиков
    const [dates, setDates] = useState([]);
    // значения данных с датчика MQ2
    const [LPGValues, setLPGValues] = useState([]);
    const [COValues, setCOValues] = useState([]);
    const [SmokeValues, setSmokeValues] = useState([]);

    // Надпись графика
    const [title, setTitle] = useState("MQ2 Sensor Data");

    // включить/остановить обновление графика
    const [update, setUpdate] = useState(true);

    // данные для отрисовки на графике
    const LPGData = {
        x: dates,
        y: LPGValues,
        type: "scatter",
        name: "LPG, ppm",
        line: {
            color: "#0000ff"
        }
    };
    const COData = {
        x: dates,
        y: COValues,
        type: "scatter",
        name: "CO, ppm",
        line: {
            color: "#ff0000",
        }
    };
    const SmokeData = {
        x: dates,
        y: SmokeValues,
        type: "scatter",
        name: "smoke, ppm",
        line: {
            color: "#00ff00"
        }
    };

    const layout = {
        title: title,
        font: {
            color: "white"
        },
        plot_bgcolor: "#282724",
        paper_bgcolor: "#3A3A3E",
        margin: {t: 80, b: 20, l: 30, r: 30},
        xaxis: {
            rangeselector: selectorOptions,
            rangeslider: {}
        },
        yaxis: {
            fixedrange: true
        },
        legend: {
            x: 0.3,
            y: 1.2,
            orientation: "h"
        }
    };

    const config = {responsive: true};

    async function fillPlot() {
        getData('mq2list').then(data => {
            let dates = data.map(el => new Date(el['date_time']));
            let lpg = data.map(el => el['lpg']);
            let co = data.map(el => el['co']);
            let smoke = data.map(el => el['smoke']);

            setDates(dates);
            setLPGValues(lpg);
            setCOValues(co);
            setSmokeValues(smoke);
        })
    }

    // сбросить график (обновить)
    function refreshPlot() {
        fillPlot();
    }

    // добавляем данные в график
    function addData() {
        getData('mq2')
            .then(data => {
                setTitle("MQ2 Sensor Data");
                let date = new Date(data['date_time']);
                let lpg = data['lpg'];
                let co = data['co'];
                let smoke = data['smoke'];

                let last_date = dates.slice(-1)[0];
                if (last_date !== date) {
                    setLPGValues([...LPGValues, lpg]);
                    setCOValues([...COValues, co]);
                    setSmokeValues([...SmokeValues, smoke]);
                    setDates([...dates, date]);
                }
                setIsLoading(false);
            })
            .catch(e => {
                setTitle("No connection!");
            });
    }

    function toggleUpdating() {
        setUpdate(!update);
    }

    useEffect(() => {
        fillPlot();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (update) addData();
        }, 5000);
        return () => clearInterval(interval);
    }, [LPGData, COData, SmokeData]);

    return (
        <>
            {isLoading ? <Spinner/> :
                <div className="d-flex flex-column animated fadeInLeft h-75">
                    <div className="d-flex justify-content-between pb-1">
                        <p className="text-white">Updating: {update ? "enabled" : "disabled"}</p>
                        <div>
                            <button className={update ? "btn btn-danger" : "btn btn-primary"} onClick={toggleUpdating}>
                                <FontAwesomeIcon icon={update ? faStop : faPlay}/>
                            </button>
                            <button className="btn btn-success ml-1" onClick={refreshPlot}>
                                <FontAwesomeIcon icon={faRedo}/>
                            </button>
                        </div>
                    </div>
                    <Plot
                        className="w-100"
                        data={[LPGData, COData, SmokeData]}
                        layout={layout}
                        config={config}
                    />
                </div>}
        </>
    );
}
