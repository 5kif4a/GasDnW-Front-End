import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Monitoring from "../Monitoring/Motinoring";
import CCTV from "../CCTV/CCTV";
import Logs from "../Logs/Logs";
import Report from "../Reports/Report";
import Reports from "../Reports/Reports";
import Home from "../Home/Home";
import NotFound from "../Utils/NotFound";
import Navbar from "../Navbar/Navbar";
import CreateReport from "../Reports/CreateReport";

export default function Base() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route exact path={"/"} component={Home}/>
                    <Route path={"/monitoring"} component={Monitoring}/>
                    <Route path={"/CCTV"} component={CCTV}/>
                    <Route path={"/logs/cases"} component={Logs}/>
                    <Route path={"/logs/camera_logs"} component={Logs}/>
                    <Route path={"/reports/add"} exact component={CreateReport}/>
                    <Route path={"/reports/:id"} exact component={Report}/>
                    <Route path={"/reports"} component={Reports}/>
                    <Route render={NotFound} />
                </Switch>
            </BrowserRouter>
        </>
    );
}
