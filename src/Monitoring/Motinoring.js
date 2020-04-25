import React from "react";
import DHTPlot from "../Plots/DHTPlots";
import MQ2Plot from "../Plots/MQ2Plot";
import {Link} from "react-router-dom";

export default () => {
    return (
        <div className="container-fluid animated fadeIn">
            <div className="row pt-2">
                <div className="col-sm">
                    <h1>Monitoring</h1>
                </div>
                <div
                    className="col-sm d-flex justify-content-end align-self-center">
                    <Link to="/reports/add" className="btn btn-report btn-lg">
                        Create report
                    </Link>
                </div>
            </div>
            <hr/>
            <div className="row pt-2">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
                    <MQ2Plot/>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                    <DHTPlot/>
                </div>
            </div>
        </div>
    );
}
