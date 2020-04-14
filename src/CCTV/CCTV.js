import React from "react";
import {baseURL} from "../Utils/API";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationTriangle, faRedo, faTable, faVideo} from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";

// Tooltip activating
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

function VideoStream(props) {
    const state = {
        class: "img-fluid img-thumbnail rounded mx-auto d-block",
        src: props.src
    };

    function changeImageOnError(e) {
        e.target.onError = null;
        e.target.className = state.class + " animated flash";
        e.target.src = "../img/no-connection.png";
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="d-flex flex-column pr-2">
                <h3 className="text-center">
                    Camera{" "}
                    <span className="badge badge-primary">
            <FontAwesomeIcon icon={faVideo}/>
          </span>
                </h3>
                <img
                    src={state.src}
                    alt={"No connection"}
                    width={props.width}
                    height={props.height}
                    onError={changeImageOnError}
                    className={state.class}
                />
            </div>
            <div className="d-flex flex-column align-self-center">
                <button
                    type="button"
                    className="btn btn-primary mb-1"
                    data-toggle="tooltip"
                    data-placement="right"
                    title="Refresh"
                >
                    <FontAwesomeIcon icon={faRedo}/>
                </button>
                <button
                    type="button"
                    className="btn btn-info mb-1"
                    data-toggle="tooltip"
                    data-placement="right"
                    title="See Logs"
                >
                    <FontAwesomeIcon icon={faTable}/>
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    data-toggle="tooltip"
                    data-placement="right"
                    title="Report Emergency"
                    onClick={() => alert("ALARM!!!")}
                >
                    <FontAwesomeIcon icon={faExclamationTriangle}/>
                </button>
            </div>
        </div>
    );
}

export default function CCTV() {
    return (
        <div className="container animated fadeIn">
            <div className="row pt-2">
                <div className="col-sm">
                    <h1>CCTV</h1>
                </div>
            </div>
            <hr></hr>
            <div className="row">
                <div className="col">
                    <VideoStream src={baseURL + "camera/0"} width={300} height={300}/>
                </div>
                <div className="col">
                    <VideoStream src={baseURL + "camera/1"} width={300} height={300}/>
                </div>
            </div>
        </div>
    );
}
