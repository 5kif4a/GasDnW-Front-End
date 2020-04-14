import React from "react";


export default (props) =>
    <a href={props.link} className="list-group-item list-item">
        <div className="d-flex justify-content-between">
            <h5 className="mb-1">Camera <span className="badge badge-light">{props.camera}</span></h5>
        </div>
        <p className="text-truncate mb-1">Recognized objects: {props.note}</p>
        <small>{new Date(props.date).toLocaleString()}</small>
    </a>
