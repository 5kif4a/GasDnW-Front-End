import React from "react";
import {baseURL} from "../Utils/API";
import VideoStream from "./VideoStream";

const cameraURL = process.env.REACT_APP_CAMERA_API_URL;

export default function CCTV() {
    return (
        <div className="container-fluid animated fadeIn">
            <div className="row pt-2">
                <div className="col">
                    <h1>CCTV</h1>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col my-1">
                    <VideoStream src={baseURL + "camera/0"}/>
                </div>
                <div className="col my-1">
                    <VideoStream src={cameraURL + 'camera'}/>
                </div>
            </div>
        </div>
    );
}
