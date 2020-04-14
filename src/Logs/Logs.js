import React from "react";
import {Link, Route, Switch} from "react-router-dom";
import {CameraLogsTable, CasesTable} from "./Tables";

export default () => {
    const activeTab = window.location.pathname.split('/').slice(-1)[0];
    const activeLink = (currentTab) => activeTab === currentTab ? 'nav-link active' : 'nav-link text-white';

    return (
        <div className="container animated fadeIn">
            <h1 className="py-2">Logs</h1>
            <ul className="nav nav-tabs nav-fill">
                <li className="nav-item">
                    <Link to={'/logs/cases'}
                          className={activeLink('cases')}
                    >
                        Cases
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={'/logs/camera_logs'}
                          className={activeLink('camera_logs')}
                    >
                        Camera Logs
                    </Link>
                </li>
            </ul>
            <div className="tab-content">
                <Switch>
                    <Route path={'/logs/cases'} exact component={CasesTable}/>
                    <Route path={'/logs/camera_logs'} component={CameraLogsTable}/>
                </Switch>
            </div>
        </div>
    )
}
