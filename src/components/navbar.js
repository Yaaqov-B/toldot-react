import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
import mylogo from '../edit.jpg'
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light text-right">
                <NavLink className="navbar-brand" to="/">
                    <img alt="לוגו" style={{"width" : 25 + '%'}} src={mylogo}></img>
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        {/*<li className="nav-item">*/}
                        {/*    <NavLink className="nav-link" to="/create">*/}
                        {/*        הוסף רב*/}
                        {/*    </NavLink>*/}
                        {/*</li>*/}
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">
                                אודות
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/bibliography">
                                ביבליוגרפיה
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
