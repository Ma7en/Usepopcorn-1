import { useEffect } from "react";
import { useState } from "react";

const KEY = "e7a672d7";

export function UseMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(
        function () {
            // callback?.();

            const controller = new AbortController();

            async function fetchMovice() {
                try {
                    setIsLoading(true);
                    setError("");
                    const response = await fetch(
                        `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                        { signal: controller.signal }
                    );

                    if (!response.ok)
                        throw new Error(
                            "Something Went worng with fetching movices"
                        );
                    const data = await response.json();

                    if (data.Response === "False")
                        throw new Error(`Movie not found`);

                    setMovies(data.Search);
                    setError("");
                } catch (error) {
                    if (error.name !== "AbortError") {
                        console.log(error.message);
                        // console.error(error.message);
                        setError(error.message);
                    }
                } finally {
                    setIsLoading(false);
                }
            }
            if (query.length < 3) {
                setMovies([]);
                setError("");
                return;
            }
            // handleCloseMovie();
            fetchMovice();

            return function () {
                controller.abort();
            };
        },
        [query]
    );

    return { movies, isLoading, error };
}
