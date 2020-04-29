import React from "react";
import {baseURL} from "../Utils/API";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationTriangle, faRedo, faTable, faVideo} from "@fortawesome/free-solid-svg-icons";
import VideoStream from "./VideoStream";
import $ from "jquery";

// Tooltip activating
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});



export default function CCTV() {
    return (
        <div className="container-fluid animated fadeIn">
            <div className="row pt-2">
                <div className="col-sm">
                    <h1>CCTV</h1>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col">
                    <VideoStream src={baseURL + "camera/0"}/>
                </div>
                <div className="col">
                    <VideoStream src={baseURL + "camera/1"}/>
                </div>
            </div>
        </div>
    );
}
