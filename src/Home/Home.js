import React from 'react';
import Summary from "./Summary";
import Cases from "../Cases/Cases";
import LogsMainPage from "./LogsMainPage";

export default () => <div className="container-fluid text-white animated fadeIn">
    <div className="row text-center">
        <div className="d-none d-sm-block d-sm-none d-md-block col-md col-lg">
            <h1 className="m-0">Gas Detection and Warning</h1>
            <h3 className="m-0">Gas leak monitoring system</h3>
        </div>
    </div>
    <hr className="bg-white"/>
    <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
            <div className="d-flex justify-content-between align-items-center">
                <h2>Summary</h2>
                <a href="/monitoring" className="badge badge-light">View monitoring data</a>
            </div>
            <Summary/>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
            <div className="d-flex justify-content-between align-items-center">
                <h2>Last Cases</h2>
                <span className="badge badge-light">last 30 days</span>
            </div>
            <Cases/>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
            <div className="d-flex justify-content-between align-items-center">
                <h2>Camera Logs</h2>
                <a href="/cctv" className="badge badge-light">Go to cameras</a>
            </div>
            <LogsMainPage/>
        </div>
    </div>
</div>
