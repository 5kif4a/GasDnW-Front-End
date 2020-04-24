import React from "react";
import {Link} from "react-router-dom";

const levels = {
    'low': "badge-info",
    'moderate': "badge-primary",
    'dangerous': "badge-warning",
    'emergency': "badge-danger"
};

export default (props) =>
    <Link to={{
        pathname: props.link,
        state: {
            // endpoint: 'cases',
            id: props.id,
            modal: true,
        }
    }}
          className="list-group-item list-item">
        <div className="d-flex justify-content-between">
            <h5 className="mb-1">Case</h5>
            <span className={"bagde badge-pill " + levels[props.level]}>{props.level}</span>
        </div>
        <p className="mb-1">{props.note}</p>
        <small>{new Date(props.date).toLocaleString()}</small>
    </Link>
