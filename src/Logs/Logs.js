import React from "react";
import {Link, Route} from "react-router-dom";
import {CameraLogsTable, CasesTable} from "./Tables";
import CaseModal from "./Modals/CaseModal";
import LogModal from "./Modals/LogModal";

export default () => {
    if (window.location.pathname.split('/').length === 3) {
        var activeTab = window.location.pathname.split('/').slice(-2)[1];
    } else {
        var activeTab = window.location.pathname.split('/').slice(-2)[0];
    }
    const activeLink = (currentTab) => activeTab === currentTab ? 'nav-link active' : 'nav-link text-white';

    return (
        <div className="container-fluid animated fadeIn">
            <h1 className="py-2">Logs</h1>
            <ul className="nav nav-tabs nav-fill">
                <li className="nav-item">
                    <Link to={{
                        pathname: '/logs/cases',
                        state: {
                            endpoint: "cases"
                        }
                    }}
                          className={activeLink('cases')}
                    >
                        Cases
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={{
                        pathname: '/logs/camera_logs',
                        state: {
                            endpoint: "logs"
                        }
                    }}
                          className={activeLink('camera_logs')}
                    >
                        Camera Logs
                    </Link>
                </li>
            </ul>
            <div className="tab-content">
                <Route path={'/logs/cases'} component={CasesTable}/>
                <Route path={'/logs/camera_logs'} component={CameraLogsTable}/>
                <Route path={"/logs/cases/:id"} component={CaseModal}/>
                <Route path={"/logs/camera_logs/:id"} component={LogModal}/>
            </div>
        </div>
    )
}
