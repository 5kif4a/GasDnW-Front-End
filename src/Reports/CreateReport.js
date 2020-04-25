import React from "react";
import {useHistory} from "react-router-dom";

export default () => {
    let history = useHistory();

    function backToReports() {
        history.push('/reports')
    }

    return (
        <div className="container-fluid animated fadeIn">
            <div className="row pt-2">
                <div className="col-sm">
                    <h1>Create report</h1>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col">
                    <button className="btn btn-secondary btn-sm" onClick={backToReports}>Back to reports</button>
                </div>
            </div>
        </div>
    )
}

