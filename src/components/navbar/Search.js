/* eslint-disable react/prop-types */
import React, { useRef } from "react";

import { useKey } from "../hook/useKey";

const Search = ({ query, setQuery }) => {
    const inputEl = useRef(null);

    useKey("Enter", function () {
        if (document.activeElement === inputEl.current) return;
        inputEl.current.focus();
        setQuery("");
    });

    // useEffect(() => {
    //     function callback(e) {
    //         if (e.code === "Enter") {
    //             if (document.activeElement === inputEl.current) return;
    //             inputEl.current.focus();
    //             setQuery("");
    //         }
    //     }
    //     document.addEventListener("keydown", callback);
    //     return () => document.addEventListener("keydown", callback);
    // }, [setQuery]);

    return (
        <>
            <input
                className="search"
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                ref={inputEl}
            />
        </>
    );
};

export default Search;
