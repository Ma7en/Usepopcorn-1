/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Movie from "./Movie";

const MovieList = ({ movies, onSelectMovie }) => {
    // const [movies, setMovies] = useState(tempMovieData);
    let listMovies = document.querySelector(".list-movies");
    const btnPrev = () => {
        let width = listMovies.clientWidth;
        listMovies.scrollLeft = listMovies.scrollLeft - width;
    };
    const btnNext = () => {
        let width = listMovies.clientWidth;
        listMovies.scrollLeft = listMovies.scrollLeft + width;
    };

    return (
        <>
            <span className=" btn-pag next-btn" onClick={btnNext}>
                &gt;
            </span>

            <span className="btn-pag pre-btn" onClick={btnPrev}>
                &lt;
            </span>

            <ul className="list list-movies">
                {movies?.map((movie) => (
                    <Movie
                        movie={movie}
                        key={movie.imdbID}
                        onSelectMovie={onSelectMovie}
                    />
                ))}
            </ul>
        </>
    );
};

export default MovieList;
