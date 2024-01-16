import React from "react";
import { useState } from "react";

import "./style.scss";

import Main from "./main/Main";
import NavBar from "./navbar/NavBar";
import NumResults from "./navbar/NumResults";
import Search from "./navbar/Search";
import Logo from "./navbar/Logo";
import Box from "./main/Box";
import MovieList from "./main/movielist/MovieList";
import WatchedSummary from "./main/watchedbox/WatchedSummary";
import WatchedMoviesList from "./main/watchedbox/WatchedMoviesList";
import Loader from "./main/Loader";
import ErrorMessage from "./main/ErrorMessage";
import MovieDetails from "./main/movielist/MovieDetails";

import { UseMovies } from "./hook/UseMovies";
import { UseLocalStorageState } from "./hook/UseLocalStorageState";

const KEY = "e7a672d7";

const UsePopCorn = () => {
    const average = (arr) =>
        arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const { movies, isLoading, error } = UseMovies(query);

    const [watched, setWatched] = UseLocalStorageState([], "watched");

    function handleSelectMovie(id) {
        setSelectedId((selectedId) => (id === selectedId ? null : id));
    }

    function handleCloseMovie() {
        setSelectedId(null);
    }

    function handleAddWatched(movie) {
        setWatched((watched) => [...watched, movie]);

        // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
    }

    function handleDeleteWatched(id) {
        setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
    }

    return (
        <>
            <NavBar>
                <Logo />
                <Search query={query} setQuery={setQuery} />
                <NumResults movies={movies} />
            </NavBar>

            <Main>
                <Box>
                    {isLoading && <Loader />}
                    {!isLoading && !error && (
                        <>
                            <MovieList
                                movies={movies}
                                onSelectMovie={handleSelectMovie}
                            />
                        </>
                    )}
                    {error && <ErrorMessage message={error} />}
                </Box>

                <Box>
                    {selectedId ? (
                        <MovieDetails
                            selectedId={selectedId}
                            onCloseMovie={handleCloseMovie}
                            KEY={KEY}
                            onAddWatched={handleAddWatched}
                            watched={watched}
                        />
                    ) : (
                        <>
                            <WatchedSummary
                                average={average}
                                watched={watched}
                            />

                            <WatchedMoviesList
                                watched={watched}
                                onDeleteWatched={handleDeleteWatched}
                            />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
};

export default UsePopCorn;
