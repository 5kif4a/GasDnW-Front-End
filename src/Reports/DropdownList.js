import React from "react";

export default props => {
    return (
        <select
            id={props.id}
            name={props.name}
            className="form-control form-control-lg"
            value={props.value || "-1"}
            onChange={props.onChange}
            required={true}
        >
            <option
                value="-1"
                disabled
            />
            {
                props.list.map((item, index) => {
                    return <option key={index} value={item.id}>{item.content}</option>
                })
            }
        </select>
    )
}
