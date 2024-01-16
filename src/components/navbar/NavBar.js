/* eslint-disable react/prop-types */

import React from "react";

const NavBar = ({ children }) => {
    return (
        <>
            <nav className="nav-bar">
                <div className="container">{children}</div>
            </nav>
        </>
    );
};

export default NavBar;
