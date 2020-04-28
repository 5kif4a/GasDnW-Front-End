import React, {Component} from "react";
import {Link} from "react-router-dom";
import ReportsTable from "./ReportsTable";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";

export default class Reports extends Component {
    render() {
        return (
            <div className="container-fluid animated fadeIn">
                <div className="row pt-2">
                    <div className="col-sm">
                        <h1>Reports</h1>
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
                <ReportsTable/>
            </div>
        );
    }
}
