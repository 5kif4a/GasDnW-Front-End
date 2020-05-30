import React, {useEffect, useState} from "react";
import API from "../Utils/API";
import Spinner from "../Utils/Spinner";
import Log from "./LogHomePage";

function LogsMainPage() {
    const [isLoading, setLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);
    const [logs, setLogs] = useState([]);

    async function getLogs() {
        await API.get('logs').then(res => {
                if (res.status === 204) {
                    setIsEmpty(true);
                    setLogs([]);
                }
                else setLogs(res.data);
            }
        ).finally(() => setLoading(false));
    }

    useEffect(() => {
        getLogs()
    }, []);

    return (
        <>
            {
                isLoading ? <Spinner/> :
                    <div className="list-group animated fadeInUp pb-3">
                        {logs.slice(0, 5).map((c, index) => {
                            return <Log
                                key={index}
                                link={`/logs/camera_logs/${c.id}`}
                                camera={c.camera_id}
                                date={c.date_time}
                                note={c.recognized_objects}
                            />
                        })}
                        <a href="/logs/camera_logs" className="list-group-item list-item">
                            <div className="d-flex justify-content-center">
                                {isEmpty ? "No last recognized objects. View anyway" : "View all"}
                            </div>
                        </a>
                    </div>
            }
        </>
    )
}

export default LogsMainPage;
