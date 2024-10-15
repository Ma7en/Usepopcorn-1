/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

import StarRating from "../../Rating/StarRating";
import Loader from "../Loader";

import { useKey } from "../../hook/useKey";

const MovieDetails = ({
    selectedId,
    onCloseMovie,
    KEY,
    onAddWatched,
    watched,
}) => {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState("");

    // console.log(`use:-`, userRating);

    const countRef = useRef(0);

    const [error, setError] = useState(""); // غير موجود
    // console.log(`error:-`, error);

    useEffect(
        function () {
            if (userRating) countRef.current++;
        },
        [userRating]
    );

    const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
    const watchedUserRating = watched.find(
        (movie) => movie.imdbID === selectedId
    )?.userRating;

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;

    function handleAdd() {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ").at(0)),
            userRating,
            countRatingDecisions: countRef.current,
        };

        onAddWatched(newWatchedMovie);
        onCloseMovie();
    }

    useKey("Escape", onCloseMovie);

    useEffect(
        function () {
            async function getMovieDetails() {
                try {
                    setIsLoading(true);
                    setError("");

                    const response = await fetch(
                        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
                    );

                    if (!response.ok)
                        throw new Error(
                            "Something Went worng with fetching movices"
                        );

                    const data = await response.json();
                    setMovie(data);
                    setIsLoading(false);
                } catch (error) {
                    console.error(error.message);
                    setError(error.message);
                }
                // finally {
                //     setIsLoading(false);
                // }
            }
            getMovieDetails();
        },
        [selectedId]
    );

    useEffect(function () {
        if (!title) return;
        document.title = `Moive: ${title}`;
        return function () {
            document.title = "usePopcorn";
        };
    }, []);

    // useEffect(
    //     function () {
    //         function callback(e) {
    //             if (e.code === "Escape") {
    //                 onCloseMovie();
    //             }
    //         }

    //         document.addEventListener("keydown", callback);
    //         return function () {
    //             document.removeEventListener("keydown", callback);
    //         };
    //     },
    //     [onCloseMovie]
    // );

    return (
        <>
            <div className="details">
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <header>
                            <button className="btn-back" onClick={onCloseMovie}>
                                &larr;
                            </button>

                            <div className="img">
                                <img
                                    src={poster}
                                    alt={`Poster of ${movie} movie`}
                                />
                            </div>

                            <div className="details-overview">
                                <h2>{title}</h2>
                                <p>
                                    {released} &bull; {runtime}
                                </p>
                                <p>{genre}</p>
                                <p>
                                    <span>⭐</span>
                                    {imdbRating} IMD rating
                                </p>
                            </div>
                        </header>

                        <section>
                            <div className="rating">
                                {!isWatched ? (
                                    <>
                                        <StarRating
                                            maxRating={10}
                                            size={24}
                                            onSetRating={setUserRating}
                                        />

                                        {userRating > 0 && (
                                            <button
                                                className="btn-add"
                                                onClick={handleAdd}
                                            >
                                                + Add to list
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    <p>
                                        You rated with movie {watchedUserRating}
                                        <span>⭐</span>
                                    </p>
                                )}
                            </div>
                            <p>
                                <em>{plot}</em>
                            </p>
                            <p>starring {actors}</p>
                            <p>Director by {director}</p>
                        </section>
                    </>
                )}
            </div>
        </>
    );
};

export default MovieDetails;
