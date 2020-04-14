import React from "react";

function Link(props) {
    var active = props.href === window.location.pathname;
    return (
        <li
            className={
                active ? "nav-item active" : "nav-item"
            }
        >
            <a className="nav-link" href={props.href}>
                {props.name}
            </a>
        </li>
    );
}

export default function Navbar() {

    const state = {
        items: [
            {
                name: "Monitoring",
                link: "/monitoring"
            },
            {
                name: "CCTV",
                link: "/cctv"
            },
            {
                name: "Logs",
                link: "/logs/cases"
            },
            {
                name: "Reports",
                link: "/reports"
            },
        ]
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">
                GasDnW
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {state.items.map(function (item, index) {
                        return <Link href={item.link} name={item.name} key={index}/>;
                    })}
                </ul>
            </div>
        </nav>
    );
}
