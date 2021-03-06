import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import Spinner from "../Utils/Spinner";

export default props => {
    let history = useHistory();
    const [src, setSrc] = useState(props.src);
    const [loaded, setLoaded] = useState(false);

    function imgOnError(e) {
        e.target.onError = null;
        e.target.className = e.target.className + " animated flash";
        e.target.src = "../img/no-connection.png";
        console.log('error')
    }

    function createReport() {
        history.push("/reports/add")
    }

    function reconnect() {
        setSrc(props.src + "?t=" + new Date().getTime())
    }

    function goToLogs() {
        history.push("/logs/camera_logs")
    }

    let image = <img
        src={src}
        onLoad={() => setLoaded(true)}
        alt={"No connection"}
        className="img-fluid w-100 mt-2"
        onError={imgOnError}
    />;

    return (
        <>
            <div className="d-flex justify-content-start mx-auto">
                <button
                    className="btn btn-secondary mr-1"
                    onClick={goToLogs}
                >Go to logs
                </button>
                <button
                    className="btn btn-success mr-1"
                    onClick={reconnect}
                >Reconnect
                </button>
                <button
                    className="btn btn-report mr-1"
                    onClick={createReport}
                >Create report
                </button>
            </div>
            {!loaded && <Spinner/>}
            {image}
        </>
    );
}
