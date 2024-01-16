/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState } from "react";
import WatchedSummary from "./WatchedSummary";
import WatchedMoviesList from "./WatchedMoviesList";

const WatchedBox = ({ average, tempWatchedData }) => {
    const [watched, setWatched] = useState(tempWatchedData);
    const [isOpen2, setIsOpen2] = useState(true);

    return (
        <>
            <div className="box">
                <button
                    className="btn-toggle"
                    onClick={() => setIsOpen2((open) => !open)}
                >
                    {isOpen2 ? "-" : "+"}
                </button>
                {isOpen2 && (
                    <>
                        <WatchedSummary average={average} watched={watched} />
                        <WatchedMoviesList watched={watched} />
                    </>
                )}
            </div>
        </>
    );
};

export default WatchedBox;
