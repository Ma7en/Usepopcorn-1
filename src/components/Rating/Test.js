/* eslint-disable no-unused-vars */
import React from "react";
import StarRating from "./StarRating";
import { useState } from "react";

const Test = () => {
    const [movieRating, setMovieRating] = useState(0);
    return (
        <>
            <div>
                <StarRating
                    color="blue"
                    maxRating={10}
                    onSetRating={setMovieRating}
                />
                <p>This movies was rated {movieRating} stars</p>
            </div>
        </>
    );
};

export default Test;
