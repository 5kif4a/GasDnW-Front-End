import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import API, {baseURL} from "../Utils/API";
import Spinner from "../Utils/Spinner";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faEnvelope, faFilePdf, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import createPlotlyComponent from "react-plotly.js/factory";
import Plotly from "plotly.js-finance-dist";
import fileDownload from "js-file-download";
import LoadingOverlay from 'react-loading-overlay';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from 'mdbreact';


const Plot = createPlotlyComponent(Plotly);

async function getData(endpoint) {
    const res = await API.get(endpoint);
    return res.data;
}

async function getPDF(endpoint) {
    const res = await API.get(endpoint, {responseType: "blob"});
    return res.data;
}

const layout = {
    font: {
        color: "white"
    },
    plot_bgcolor: "#282724",
    paper_bgcolor: "#3C3F41",
    margin: {t: 30, b: 70, l: 30, r: 30},
    legend: {
        x: 0,
        y: -0.1,
        orientation: "h"
    }
};

const CaseContent = props => {
    return (
        <>
            <p className="card-text">Case datetime: {new Date(props.datetime).toLocaleString()} -
                Level: {props.level}</p>
            <p className="card-text">Device location: {props.location}</p>
            <p className="card-text">Case note: {props.note}</p>
            <div className="row mb-2">
                <div className="col-sm-12 col-md-12 col-lg-6">
                    <h5><span className="badge badge-light">Gas concentration</span></h5>
                    <Plot
                        className="w-100"
                        data={props.mq2data}
                        layout={layout}
                        config={{responsive: true}}
                    />
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6">
                    <h5><span className="badge badge-light">Air temperature and hudimity</span></h5>
                    <Plot
                        className="w-100"
                        data={props.dhtdata}
                        layout={layout}
                        config={{responsive: true}}
                    />
                </div>
            </div>
        </>
    )
};

const LogContent = props => {
    return (
        <>
            <h5><span className="badge badge-light">Camera logs</span></h5>
            <p className="card-text">Log datetime: {new Date(props.datetime).toLocaleString()}</p>
            <p className="card-text">Camera location: {props.camera_location}</p>
            <p className="card-text">Recognized objects by camera: {props.recognized_objects}</p>
        </>
    )
};


export default (props) => {
    const history = useHistory();
    const id = props.match.params.id;
    const [isLoading, setIsLoading] = useState(true);
    const [isDownloading, setIsDownloading] = useState(false);
    const [email, setEmail] = useState("");
    const [mailModal, setMailModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [data, setData] = useState(null);
    const [GasLeakExist, setGasLeakExist] = useState(false);
    const [CameraDetectionExist, setCameraDetectionExist] = useState(false);
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
        type: "scatter",
        name: "LPG, ppm",
        marker: {
            color: "#0000ff"
        }
    };
    const COData = {
        x: mq2DatesList,
        y: COValues,
        type: "scatter",
        name: "CO, ppm",
        marker: {
            color: "#ff0000",
        }
    };
    const SmokeData = {
        x: mq2DatesList,
        y: SmokeValues,
        type: "scatter",
        name: "smoke, ppm",
        marker: {
            color: "#00ff00"
        }
    };
    const TempData = {
        x: dhtDatesList,
        y: TempValues,
        type: "scatter",
        name: "Temperature, C",
        marker: {
            color: "#FFA500"
        }
    };
    const HudimityData = {
        x: dhtDatesList,
        y: HudimityValues,
        type: "scatter",
        name: "Hudimity, %",
        marker: {
            color: "#EE82EE"
        }
    };

    const mq2data = [LPGData, COData, SmokeData];
    const dhtdata = [TempData, HudimityData];

    function backToReports() {
        history.push('/reports')
    }

    function emailHandler(event) {
        setEmail(event.target.value);
    }

    function sendMail() {
        setMailModal(false);
        fetch(baseURL + 'mail', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    report_id: id
                    , recipient_mail: email
                })
        })
            .then(res => {
                console.log(res);
                if (res.status === 500) {
                    toast.error("Error was occured.", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                } else {
                    toast.success("Mail sent.", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            })
            .catch(err => {
                console.log(err);
                toast.error("Error was occured.", {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
    }

    function downloadAsPDF() {
        setIsDownloading(true);
        getPDF(`/report/generate/${id}`).then(data => {
            fileDownload(data, `gasdnw report at ${new Date().toLocaleString()}.pdf`, "application/pdf");
            toast.success("Report generated.", {
                position: toast.POSITION.TOP_RIGHT
            });
        }).catch(err => {
            toast.error("Error was occured.", {
                position: toast.POSITION.TOP_RIGHT
            });
        }).finally(() => {
                setIsDownloading(false);
            }
        );
    }

    function deleteReport() {
        API.delete(`/reports/${id}`)
            .then(res => {
                console.log(res.data);
                backToReports();
            }).catch(err => {
            console.log(err);
            toast.error("Error was occured.", {
                position: toast.POSITION.TOP_RIGHT
            });
        })
    }

    useEffect(() => {
        getData(`/reports/${id}`).then(data => {
            setData(data);

            if (data['case_datetime'] !== undefined) {
                let mq2DatesList = data['mq2_data_list'].map(el => el.date_time);
                let dhtDatesList = data['dht_data_list'].map(el => el.date_time);

                let lpgvalues = data['mq2_data_list'].map(el => el.lpg);
                let covalues = data['mq2_data_list'].map(el => el.co);
                let smokevalues = data['mq2_data_list'].map(el => el.smoke);

                let tempvalues = data['dht_data_list'].map(el => el.temp);
                let hudimityvalues = data['dht_data_list'].map(el => el.hudimity);

                setMQ2DatesList(mq2DatesList);
                setDHTDatesList(dhtDatesList);

                setLPGValues(lpgvalues);
                setCOValues(covalues);
                setSmokeValues(smokevalues);

                setTempValues(tempvalues);
                setHudimityValues(hudimityvalues);

                setGasLeakExist(true);
            }

            if (data['log_datetime'] !== undefined) {
                setCameraDetectionExist(true);
            }

        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [id]);


    return (
        <LoadingOverlay
            active={isDownloading}
            spinner
            text='Generating report...'>
            <ToastContainer/>

            {mailModal ? <MDBContainer>
                <MDBModal
                    isOpen={mailModal}
                    toggle={() => setMailModal(false)}
                    centered
                    contentClassName="bg-dark"
                >
                    <MDBModalHeader toggle={() => setMailModal(false)}>Send report by email</MDBModalHeader>
                    <MDBModalBody>
                        <form>
                            <div className="form-group">
                                <label htmlFor="email"
                                       className="text-white"
                                >Recipient's Email address</label>
                                <input type="email"
                                       className="form-control"
                                       id="email"
                                       onChange={emailHandler}
                                       placeholder="Enter email"
                                       required
                                />
                            </div>
                        </form>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={() => setMailModal(false)}>Close</MDBBtn>
                        <MDBBtn color="primary" onClick={sendMail}>Send report</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer> : null}

            {deleteModal ? <MDBContainer>
                <MDBModal
                    isOpen={deleteModal}
                    toggle={() => setDeleteModal(false)}
                    centered
                    contentClassName="bg-dark"
                >
                    <MDBModalHeader toggle={() => setDeleteModal(false)}>Report deletion</MDBModalHeader>
                    <MDBModalBody>
                        <h4 className="text-white">Are you sure you want to delete the report?</h4>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={() => setDeleteModal(false)}>Close</MDBBtn>
                        <MDBBtn color="danger" onClick={deleteReport}>Delete report</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer> : null}

            <div className="container-fluid animated fadeIn">
                <div className="row pt-2">
                    <div className="col-sm">
                        <h1>Report detail info</h1>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col">
                        <div className="d-flex justify-content-start">
                            <button className="btn btn-secondary mr-1" onClick={backToReports}>
                                <FontAwesomeIcon icon={faArrowLeft}/>
                                &nbsp;
                                Back to reports
                            </button>
                            <button className="btn btn-info mr-1" onClick={downloadAsPDF}>
                                <FontAwesomeIcon icon={faFilePdf}/>
                                &nbsp;
                                Download as PDF
                            </button>
                            <button className="btn btn-primary mr-1" onClick={() => setMailModal(true)}>
                                <FontAwesomeIcon icon={faEnvelope}/>
                                &nbsp;
                                Send by email
                            </button>
                            <button className="btn btn-danger mr-1" onClick={() => setDeleteModal(true)}>
                                <FontAwesomeIcon icon={faTrashAlt}/>
                                &nbsp;
                                Delete report
                            </button>
                        </div>

                        {
                            isLoading ? <Spinner/> :
                                <div className="card bg-dark my-2 text-white">
                                    <h5 className="card-header">Report created
                                        at {new Date(data.created_at).toLocaleString()}</h5>
                                    <div className="card-body">
                                        <h5 className="card-title">Report content: {data.content}</h5>
                                        {/* Gas leak */}
                                        {GasLeakExist ?
                                            <CaseContent
                                                datetime={data.case_datetime}
                                                level={data.case_level}
                                                location={data.device_location}
                                                note={data.case_note}
                                                mq2data={mq2data}
                                                dhtdata={dhtdata}
                                            /> : null
                                        }
                                        {/* Camera detection */}
                                        {CameraDetectionExist ?
                                            <LogContent
                                                datetime={data.log_datetime}
                                                camera_location={data.camera_location}
                                                recognized_objects={data.log_recognized_objects}
                                            /> : null
                                        }
                                    </div>
                                </div>
                        }
                    </div>
                </div>

            </div>
        </LoadingOverlay>

    )
}
