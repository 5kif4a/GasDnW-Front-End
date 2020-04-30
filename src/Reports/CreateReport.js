import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import API from "../Utils/API";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import DropdownList from "./DropdownList";
import {toast, ToastContainer} from "react-toastify";
import LoadingOverlay from "react-loading-overlay";

async function getData(endpoint) {
    const res = await API.get(endpoint);
    return res.data;
}

async function postData(endpoint, data) {
    return await API.post(endpoint, data);
}


export default (props) => {
    let history = useHistory();
    let qs = props.location.search;
    if (qs !== undefined) {
        let qs_params = new URLSearchParams(qs);
        var case_id = qs_params.get("case_id");
        var log_id = qs_params.get("log_id");
    }

    const [cases, setCases] = useState([]);
    const [logs, setLogs] = useState([]);
    const [caseID, setCaseID] = useState(case_id || undefined);
    const [logID, setLogID] = useState(log_id || undefined);
    const [reportContent, setReportContent] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    function backToReports() {
        history.push('/reports')
    }

    function sendReport() {
        if (validate()) {
            let data = {
                content: reportContent,
                case_id: caseID,
                log_id: logID
            };
            setIsCreating(true);
            postData('reports', data)
                .then(res => {
                    console.log(res);
                    toast.success("Report created.", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                })
                .catch(err => {
                    toast.error("Error was occured.", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    console.log(err);
                }).finally(() => {
                setIsCreating(false);
            });
        }
    }

    function validate() {
        return (caseID !== undefined || logID !== undefined) && reportContent.length > 0
    }

    function caseHandler(event) {
        setCaseID(event.target.value);
    }

    function logHandler(event) {
        setLogID(event.target.value);
    }

    function reportContentHandler(event) {
        setReportContent(event.target.value);
    }

    useEffect(() => {
        getData('cases').then(res => {
            if (res.length > 0) {
                let data = res.map(el => {
                    let item = el;
                    item['content'] = `Datetime: ${new Date(el.date_time).toLocaleString()} - Level: ${el.level}`;
                    return item
                });
                setCases(data);
            }
        });

        getData('logs').then(res => {
            if (res.length > 0) {
                let data = res.map(el => {
                    let item = el;
                    item['content'] = `Datetime: ${new Date(el.date_time).toLocaleString()} - Location: ${el.location} - Recognized objects: ${el.recognized_objects}`;
                    return item
                });
                setLogs(data);
            }
        });

    }, []);

    return (
        <LoadingOverlay
            active={isCreating}
            spinner
            text='Sending data to server...'>
            <ToastContainer/>
            <div className="container-fluid animated fadeIn">
                <div className="row pt-2">
                    <div className="col-sm">
                        <h1>Create report</h1>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col">
                        <div className="d-flex justify-content-start">
                            <button className="btn btn-secondary btn-lg" onClick={backToReports}>
                                <FontAwesomeIcon icon={faArrowLeft}/>
                                &nbsp;
                                Back to reports
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col">
                        <form>
                            <h3 className="text-white">Report Filling Form</h3>
                            <div className="form-group my-2">
                                <label htmlFor="content" className="text-white">Report content</label>
                                <textarea
                                    id="content"
                                    className="form-control"
                                    value={reportContent}
                                    onChange={(e) => reportContentHandler(e)}
                                    rows="5"
                                    required={true}
                                />
                                <label htmlFor="case" className="text-white mt-2">Select case</label>
                                <DropdownList
                                    id="case"
                                    value={caseID}
                                    list={cases}
                                    onChange={(e) => caseHandler(e)}
                                />
                                <label htmlFor="log" className="text-white mt-2">Select camera log</label>
                                <DropdownList
                                    id="log"
                                    value={logID}
                                    list={logs}
                                    onChange={(e) => logHandler(e)}
                                />
                                <button
                                    className="btn btn-primary btn-lg mt-3"
                                    onClick={sendReport}
                                >
                                    <FontAwesomeIcon icon={faPlusSquare}/>
                                    &nbsp;
                                    Create report
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </LoadingOverlay>
    )
}

