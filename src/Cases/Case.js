import React from "react";

const levels = {
    'low': "badge-primary",
    'moderate': "badge-warning",
    'dangerous': "badge-danger",
    'emergency': "badge-dark"
};

export default (props) =>
    <a href={props.link} className="list-group-item list-item">
        <div className="d-flex justify-content-between">
            <h5 className="mb-1">Case</h5>
            <span className={"bagde badge-pill " + levels[props.level]}>{props.level}</span>
        </div>
        <p className="mb-1">{props.note}</p>
        <small>{new Date(props.date).toLocaleString()}</small>
    </a>
