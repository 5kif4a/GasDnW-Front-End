import React, {Component} from "react";
import {Link} from "react-router-dom";
import ReportsTable from "./ReportsTable";

export default class Reports extends Component {
    render() {
        return (
            <div className="container-fluid animated fadeIn">
                <div className="row pt-2">
                    <div className="col-sm">
                        <h1>Reports</h1>
                    </div>
                    <div
                        className="col-sm d-flex justify-content-end align-self-center">
                        <Link to="/reports/add" className="btn btn-report btn-lg">
                            Create report
                        </Link>
                    </div>
                </div>
                <hr/>
                <ReportsTable/>
            </div>
        );
    }
}
