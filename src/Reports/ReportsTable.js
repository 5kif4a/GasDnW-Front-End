import React, {useEffect, useState} from "react";
import {MDBContainer, MDBDataTable} from "mdbreact";
import API from "../Utils/API";
import Spinner from "../Utils/Spinner";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";

const columns = [
    {
        label: "#",
        field: "index",
        sort: "asc",
    },
    {
        label: 'Creation date',
        field: 'created_at',
        sort: 'asc'
    },
    {
        label: 'Content',
        field: 'content',
        sort: 'asc'
    },
    {
        label: 'Case datetime',
        field: 'case_datetime'
    },
    {
        label: 'Case level',
        field: 'case_datetime'
    },
    {
        label: 'Device location',
        field: 'device_location'
    },
    {
        label: 'Log datetime',
        field: 'log_datetime'
    },
    {
        label: 'Camera location',
        field: 'camera_location'
    },
    {
        label: 'Detail info',
        field: 'detail_info'
    }
];

async function getData(endpoint) {
    const res = await API.get(endpoint);
    return res.data;
}

const DetailViewLink = (props) =>
    <Link to={props.to}
          className="btn btn-primary">
        {props.children} &nbsp;
        <FontAwesomeIcon icon={faInfoCircle}/>
    </Link>;

export default () => {
    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState([]);

    const data = {
        columns: columns,
        rows: rows
    };

    useEffect(() => {
        getData("/reports").then(data => {
            let rows = data.map((el, index) => {
                let item = el;
                item["index"] = index + 1;
                item['detail_info'] = <DetailViewLink to={`/reports/${el.id}`}>View Details</DetailViewLink>;
                return item;
            });
            setRows(rows);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {

    }, []);

    return (
        <>
            {isLoading ? <Spinner/> :
                <MDBContainer fluid>
                    <MDBDataTable
                        dark
                        className="text-white my-2 animated fadeIn"
                        bordered
                        noBottomColumns
                        theadTextWhite
                        tbodyTextWhite
                        noRecordsFoundLabel="No matches"
                        responsive
                        data={data}/>
                </MDBContainer>
            }
        </>
    )
}
