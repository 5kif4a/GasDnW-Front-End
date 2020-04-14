import React, {useEffect, useState} from "react";
import Case from "./Case";
import API from "../Utils/API";
import Spinner from "../Utils/Spinner";


export default () => {
    const [isLoading, setLoading] = useState(true);
    const [cases, setCases] = useState([]);

    async function getCases() {
        await API.get('cases').then(res => {
                setCases(res.data);
                setLoading(false);
            }
        );
    }

    useEffect(() => {
        getCases()
    }, []);

    return (
        <>
            {
                isLoading ? <Spinner/> :
                    <div className="list-group animated fadeInUp">
                        {cases.slice(-5).map((c, index) => {
                            return <Case
                                key={index}
                                link={"#"}
                                level={c.level}
                                date={c.date_time}
                                note={c.note}
                            />
                        })}
                        <a href="/logs/cases" className="list-group-item list-item">
                            <div className="d-flex justify-content-center">
                                View all
                            </div>
                        </a>
                    </div>
            }
        </>
    )
}
