import React, {useEffect, useState} from "react";
import {MDBContainer, MDBDataTable} from "mdbreact";
import API from "../Utils/API";
import Spinner from "../Utils/Spinner";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

const cases_columns = [
    {
        label: "#",
        field: "index",
        sort: "asc",
    },
    {
        label: 'Date',
        field: 'date_time',
        sort: 'asc'
    },
    {
        label: 'Level',
        field: 'level',
        sort: 'asc'
    },
    {
        label: 'Detail info',
        field: 'link_detail'
    }
];


const camera_logs_columns = [
    {
        label: "#",
        field: "index",
        sort: "asc",
    },
    {
        label: 'Camera',
        field: 'camera_id',
        sort: 'asc'
    },
    {
        label: 'Location',
        field: 'location',
        sort: 'asc'
    },
    {
        label: 'Date',
        field: 'date_time',
        sort: 'asc'
    },
    {
        label: 'Recognized objects',
        field: 'recognized_objects',
        sort: 'asc'
    },
    {
        label: 'Detail info',
        field: 'link_detail'
    }
];

async function getData(endpoint) {
    const res = await API.get(endpoint);
    return res.data;
}

const ButtonViewDetail = (props) => <Link
    className="btn btn-primary"
    to={
        {
            pathname: `/logs/${props.endpoint}/${props.id}`,
            state: {
                id: props.id,
                modal: true,
            }

        }
    }>
    View details <FontAwesomeIcon icon={faInfoCircle}/>
</Link>;

function Table(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState([]);

    const data = {
        columns: props.endpoint === 'cases' ? cases_columns : camera_logs_columns,
        rows: rows
    };


    useEffect(() => {
        getData(props.endpoint).then(data => {
            let rows = data.map((el, index) => {
                let item = {
                    index: index + 1
                };
                if (props.endpoint === 'cases') {
                    item['level'] = el['level'];
                    item['note'] = el['note'];
                    item['date_time'] = new Date(el['date_time']).toLocaleString();
                    item['link_detail'] = <ButtonViewDetail endpoint={props.endpoint} id={el.id}/>
                }
                if (props.endpoint === 'logs') {
                    item['camera_id'] = el['camera_id'];
                    item['location'] = el['location'];
                    item['recognized_objects'] = el['recognized_objects'];
                    item['date_time'] = new Date(el['date_time']).toLocaleString();
                    item['link_detail'] = <ButtonViewDetail endpoint={"camera_logs"} id={el.id}/>
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
                <MDBContainer fluid>
                    <MDBDataTable
                        dark
                        className="my-2 animated fadeIn"
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

const CasesTable = () => <Table endpoint="cases"/>;
const CameraLogsTable = () => <Table endpoint="logs"/>;

export {CasesTable, CameraLogsTable}
