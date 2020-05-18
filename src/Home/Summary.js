import React, {Component} from "react";
import Plotly from "plotly.js-finance-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import API from "../Utils/API";
import Spinner from "../Utils/Spinner";

const Plot = createPlotlyComponent(Plotly);

const selectorOptions = {
    buttons: [{
        step: 'month',
        stepmode: 'backward',
        count: 1,
        label: '1m'
    }, {
        step: 'month',
        stepmode: 'backward',
        count: 6,
        label: '6m'
    }, {
        step: 'year',
        stepmode: 'todate',
        count: 1,
        label: 'YTD'
    }, {
        step: 'year',
        stepmode: 'backward',
        count: 1,
        label: '1y'
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

export default class Summary extends Component {
    state = {
        isLoading: true,
        hudimity:
            {
                x: null,
                y: null,
                mode: 'lines',
                name: 'Hud, %'
            },
        temperature: {
            x: null,
            y: null,
            mode: 'lines',
            name: 'Temp, C'
        },
        lpg:
            {
                x: null,
                y: null,
                mode: 'lines',
                name: 'LPG, ppm'
            },
        co: {
            x: null,
            y: null,
            mode: 'lines',
            name: 'CO, ppm'
        },
        smoke: {
            x: null,
            y: null,
            mode: 'lines',
            name: 'Smoke, ppm'
        },
        layout: {
            font: {
                color: "white"
            },
            plot_bgcolor: "#282724",
            paper_bgcolor: "#3A3A3E",
            margin: {t: 30, b: 10, l: 25, r: 20},
            xaxis: {
                rangeselector: selectorOptions,
                rangeslider: {}
            },
            yaxis: {
                fixedrange: true
            },
            legend: {
                y: 1.11,
                orientation: "h"
            }
        },
        config: {responsive: true}
    };


    async getData() {
        let state = JSON.parse(JSON.stringify(this.state));

        await API.get('dhtlist').then(res => {
            const dates = res.data.map(el => new Date(el['date_time']));
            const hudimity = res.data.map(el => el['hudimity']);
            const temperature = res.data.map(el => el['temp']);

            state.hudimity.x = state.temperature.x = dates;
            state.hudimity.y = hudimity;
            state.temperature.y = temperature;
        });
        await API.get('mq2list').then(res => {
            const dates = res.data.map(el => new Date(el['date_time']));
            const lpg = res.data.map(el => el['lpg']);
            const co = res.data.map(el => el['co']);
            const smoke = res.data.map(el => el['smoke']);

            state.lpg.x = state.co.x = state.smoke.x = dates;
            state.lpg.y = lpg;
            state.co.y = co;
            state.smoke.y = smoke;
        }).finally(() => {
            state.isLoading = false;
        });
        this.setState(state);
    }


    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <>
                {
                    this.state.isLoading ? <Spinner/> :
                        <Plot className="w-100 h-75 animated fadeInLeft"
                              data={[this.state.hudimity,
                                  this.state.temperature,
                                  this.state.lpg,
                                  this.state.co,
                                  this.state.smoke]}
                              layout={this.state.layout}
                              config={this.state.config}
                        />}
            </>
        )
    }
}
