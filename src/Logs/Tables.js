import React, {useEffect, useState} from "react";
import {MDBBtn, MDBDataTable} from "mdbreact";
import API from "../Utils/API";
import Spinner from "../Utils/Spinner";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const cases_columns = [
    {
        label: 'Note',
        field: 'note',
        sort: 'asc'
    },
    {
        label: 'Level',
        field: 'level',
        sort: 'asc'
    },
    {
        label: 'Date',
        field: 'date_time',
        sort: 'asc'
    },
    {
        label: 'More info',
        field: 'detail'
    }
];
const camera_logs_columns = [
    {
        label: 'Camera',
        field: 'camera',
        sort: 'asc'
    },
    {
        label: 'Recognized objects',
        field: 'note',
        sort: 'asc'
    },
    {
        label: 'Date',
        field: 'created_at',
        sort: 'asc'
    },
    {
        label: 'More info',
        field: 'detail'
    }
];

async function getData(endpoint, timeout) {
    const res = await API.get(endpoint);
    return res.data;
}

function Table(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState([]);
    const data = {
        columns: props.columns,
        rows: rows
    };

    useEffect(() => {
        getData(props.endpoint).then(data => {
            let rows = data.map(el => {
                let item = {
                    note: el['note'],
                    detail: <MDBBtn color="info" size="sm">View details <FontAwesomeIcon icon={faInfoCircle}/></MDBBtn>
                };
                if (props.endpoint === 'cases') {
                    item['level'] = el['level'];
                    item['date_time'] = new Date(el['date_time']).toLocaleString();
                }
                if (props.endpoint === 'logs') {
                    item['camera'] = el['camera'];
                    item['created_at'] = new Date(el['created_at']).toLocaleString();
                }
                return item;
            });
            setRows(rows);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    return (
        <>
            {isLoading ? <Spinner/> :
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
            }
        </>
    )
}

const CasesTable = () => <Table columns={cases_columns} endpoint="cases"/>;
const CameraLogsTable = () => <Table columns={camera_logs_columns} endpoint="logs"/>

export {CasesTable, CameraLogsTable}
