/* eslint-disable react/prop-types */
import React from "react";

const Main = ({ children }) => {
    return (
        <>
            <main className="main">
                <div className="container">{children}</div>
            </main>
        </>
    );
};

export default Main;
