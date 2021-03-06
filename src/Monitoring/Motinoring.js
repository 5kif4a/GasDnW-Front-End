import React from "react";
import DHTPlot from "../Plots/DHTPlots";
import MQ2Plot from "../Plots/MQ2Plot";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";

export default () => {
    return (
        <div className="container-fluid animated fadeIn">
            <div className="row pt-2">
                <div className="col">
                    <h1>Monitoring</h1>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col">
                    <div className="d-flex justify-content-start">
                        <Link to="/reports/add" className="btn btn-report btn-lg">
                            <FontAwesomeIcon icon={faPlusSquare}/>
                            &nbsp;
                            Create report
                        </Link>
                    </div>
                </div>
            </div>
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
