import React, {useEffect, useState} from "react";
import Case from "./Case";
import API from "../Utils/API";
import Spinner from "../Utils/Spinner";
import {Link} from "react-router-dom";


export default () => {
    const [isLoading, setLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);
    const [cases, setCases] = useState([]);


    async function getCases() {
        await API.get('cases').then(res => {
                if (res.status === 204) {
                    setIsEmpty(true);
                    setCases([]);
                } else setCases(res.data);
            }
        ).finally(() => setLoading(false));
    }

    useEffect(() => {
        getCases()
    }, []);

    return (
        <>
            {
                isLoading ? <Spinner/> :
                    <div className="list-group animated fadeInUp pb-3">
                        {cases.slice(0, 5).map((c, index) => {
                            return <Case
                                key={index}
                                id={c.id}
                                link={`/logs/cases/${c.id}`}
                                level={c.level}
                                date={c.date_time}
                                note={c.note}
                            />
                        })}
                        <Link to={{
                            pathname: '/logs/cases',
                            state: {
                                endpoint: 'cases'
                            }
                        }} className="list-group-item list-item">
                            <div className="d-flex justify-content-center">
                                {isEmpty ? "No recent cases. View anyway" : "View all"}
                            </div>
                        </Link>
                    </div>
            }
        </>
    )
}
