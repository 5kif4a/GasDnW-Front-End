import React, {useEffect, useState} from "react";
import {MDBBtn, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from "mdbreact";
import createPlotlyComponent from "react-plotly.js/factory";
import Plotly from "plotly.js-finance-dist";
import API from "../../Utils/API";
import {useHistory, useParams} from "react-router-dom";

const Plot = createPlotlyComponent(Plotly);

async function getData(endpoint) {
    const res = await API.get(endpoint);
    return res.data;
}

const layout = {
    height: 200,
    font: {
        color: "white"
    },
    margin: {t: 20, b: 70, l: 30, r: 0},
    plot_bgcolor: "#282724",
    paper_bgcolor: "#3C3F41",
    barmode: 'group',
    legend: {
        x: 0,
        y: 1.3,
        orientation: "h"
    }
};

const levels = {
    'low': "badge-info",
    'moderate': "badge-primary",
    'dangerous': "badge-warning",
    'emergency': "badge-danger"
};

const CaseModal = ({location}) => {
    let history = useHistory();
    const params = useParams();
    const {state = {}} = location;
    const id = state.id || params.id;

    if (params.id !== undefined) {
        state.modal = true;
    }


    const [modal_, setModal] = useState(false);
    const [case_, setCase] = useState({});
    const [mq2DatesList, setMQ2DatesList] = useState([]);
    const [dhtDatesList, setDHTDatesList] = useState([]);
    const [LPGValues, setLPGValues] = useState([]);
    const [COValues, setCOValues] = useState([]);
    const [SmokeValues, setSmokeValues] = useState([]);
    const [TempValues, setTempValues] = useState([]);
    const [HudimityValues, setHudimityValues] = useState([]);

    const LPGData = {
        x: mq2DatesList,
        y: LPGValues,
        type: "bar",
        name: "LPG, ppm",
        bar: {
            color: "#0000ff"
        }
    };
    const COData = {
        x: mq2DatesList,
        y: COValues,
        type: "bar",
        name: "CO, ppm",
        marker: {
            color: "#ff0000",
        }
    };
    const SmokeData = {
        x: mq2DatesList,
        y: SmokeValues,
        type: "bar",
        name: "smoke, ppm",
        marker: {
            color: "#00ff00"
        }
    };

    const TempData = {
        x: dhtDatesList,
        y: TempValues,
        type: "lines",
        name: "Temperature, C",
        marker: {
            color: "#FFA500"
        }
    };

    const HudimityData = {
        x: dhtDatesList,
        y: HudimityValues,
        type: "lines",
        name: "Hudimity, %",
        line: {
            color: "#EE82EE"
        }
    };


    const mq2data = [LPGData, COData, SmokeData];
    const dhtdata = [TempData, HudimityData];


    function get_detail_info() {
        getData(`cases/${id}`).then(data => {
                let mq2DatesList = data['mq2_data_list'].map(el => el.date_time);
                let dhtDatesList = data['dht_data_list'].map(el => el.date_time);

                let lpgvalues = data['mq2_data_list'].map(el => el.lpg);
                let covalues = data['mq2_data_list'].map(el => el.co);
                let smokevalues = data['mq2_data_list'].map(el => el.smoke);

                let tempvalues = data['dht_data_list'].map(el => el.temp);
                let hudimityvalues = data['dht_data_list'].map(el => el.hudimity);

                let case_ = data['case'];

                setMQ2DatesList(mq2DatesList);
                setDHTDatesList(dhtDatesList);

                setLPGValues(lpgvalues);
                setCOValues(covalues);
                setSmokeValues(smokevalues);

                setTempValues(tempvalues);
                setHudimityValues(hudimityvalues);
                setCase(case_);
                setModal(state.modal);
            }
        )
    }

    function onClose() {
        setModal(false);
        history.push('/logs/cases');
    }

    function onCreateReport() {
        setModal(false);
        history.push(`/reports/add?case_id=${id}`);
    }

    useEffect(() => {
        get_detail_info();
    }, []);

    return (
        <>{
            modal_ ? <MDBModal
                isOpen={modal_}
                toggle={onClose}
                contentClassName="bg-dark"
                centered
                size="lg"
            >
                <MDBModalHeader
                    toggle={onClose}
                >Detail info
                </MDBModalHeader>
                <MDBModalBody>
                    <div className="container">
                        <div className="row">
                            <div className="col-8">
                                <h5><span className="badge badge-light">Gas concentration</span></h5>
                                <Plot
                                    className="w-100"
                                    data={mq2data}
                                    layout={layout}
                                    config={{responsive: true, displayModeBar: false}}
                                />
                                <h5><span className="badge badge-light">Air temperature and hudimity</span></h5>
                                <Plot
                                    className="w-100"
                                    data={dhtdata}
                                    layout={layout}
                                    config={{responsive: true, displayModeBar: false}}
                                />
                            </div>
                            <div className="col-4">
                                <p className="text-white mb-1">Level: <span
                                    className={"bagde badge-pill " + levels[case_.level]}>{case_.level}</span></p>
                                <p className="text-white text-wrap">{case_.note}</p>
                                <p className="mt-auto text-white">Date: {new Date(case_.date_time).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={onClose}>Close</MDBBtn>
                    <MDBBtn color="primary" onClick={onCreateReport}>Create report</MDBBtn>
                </MDBModalFooter>
            </MDBModal> : null
        }
        </>)
};

export default CaseModal;
