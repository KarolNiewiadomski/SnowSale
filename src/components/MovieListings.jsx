/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ProductListing from "./ProductListing";
import LoadMore from "./LoadMore";
import { API_KEY, API_URL } from "../api/Constant";

const MovieListings = () => {
  const [movies, setMovies] = useState([]);
  const [TopRatedMovies, setTopRatedMovies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [error, setError] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };

    const fetchMovies = async (url, setState) => {
      try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setState(data.results || []);
      } catch (err) {
        console.error("Fetch failed:", err);
        setError("Failed to load movies. Please try again later.");
      }
    };

    fetchMovies(`${API_URL}3/movie/popular?language=en-US&page=1`, setMovies);
    fetchMovies(
      `${API_URL}3/movie/top_rated?language=en-US&page=1`,
      setTopRatedMovies
    );
  }, []);

  const loadMore = () => setVisibleCount((prev) => prev + 8);

  const MovieGrid = ({ title, movies }) => (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        {title}
      </h2>
      {movies.length === 0 ? (
        <div className="text-center text-gray-600">Loading movies...</div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {movies.slice(0, visibleCount).map((movie) => (
            <ProductListing key={movie.id} movie={movie} />
          ))}
        </div>
      )}
      {visibleCount < movies.length && <LoadMore handleClick={loadMore} />}
    </div>
  );

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="bg-white">
      <MovieGrid title="Trending Movies" movies={movies} />
      <MovieGrid title="Top Rated Movies" movies={TopRatedMovies} />
    </div>
  );
};

export default MovieListings;
