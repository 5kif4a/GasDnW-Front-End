import React, {useEffect, useState} from "react";
import API from "../Utils/API";
import Spinner from "../Utils/Spinner";
import Log from "./LogHomePage";

function LogsMainPage() {
    const [isLoading, setLoading] = useState(true);
    const [logs, setLogs] = useState([]);

    async function getLogs() {
        await API.get('logs').then(res => {
                setLogs(res.data);
                setLoading(false);
            }
        );
    }

    useEffect(() => {
        getLogs()
    }, []);

    return (
        <>
            {
                isLoading ? <Spinner/> :
                    <div className="list-group animated fadeInUp">
                        {logs.slice(-5).map((c, index) => {
                            return <Log
                                key={index}
                                link={"#"}
                                camera={c.camera}
                                date={c.created_at}
                                note={c.note}
                            />
                        })}
                        <a href="/logs/camera_logs" className="list-group-item list-item">
                            <div className="d-flex justify-content-center">
                                View all
                            </div>
                        </a>
                    </div>
            }
        </>
    )
}

export default LogsMainPage;
