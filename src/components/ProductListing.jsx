/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa"; // Import star icon for ratings
import { useWatchList } from "./UseWatchList"; // Custom hook for watchlist context
import { useState } from "react";
import { motion } from "framer-motion"; // For animation effects

const ProductListing = ({ movie }) => {
  const { addToWatchList } = useWatchList(); // Add a movie to the watchlist
  const [isHovered, setIsHovered] = useState(false); // Track hover status

  // Add movie to watchlist
  const handleAddToWatchList = () => {
    addToWatchList(movie);
    alert("Successfully added to watchlist");
  };

  // Renders Button
  const renderButton = () => (
    <button
      className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm bg-indigo-600 hover:bg-indigo-500"
      onClick={handleAddToWatchList}
    >
      Add to Watchlist
    </button>
  );

  // Error message
  if (!movie) {
    return <div className="text-white">Movie data is unavailable.</div>;
  }

  return (
    <div
      className="group relative bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col lg:h-[500px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Movie Image and Overview */}
      <div className="relative overflow-hidden h-full">
        {movie.poster_path ? (
          <img
            alt={movie.title || movie.name || "Movie Poster"}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-600 flex items-center justify-center text-white">
            No Image Available
          </div>
        )}

        {/* Animated Overview (appears when hovered) */}
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={isHovered ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-x-0 bottom-0 bg-black bg-opacity-80 text-white p-4 text-sm"
        >
          <p>{movie.overview || "No description available."}</p>
        </motion.div>
      </div>

      {/* Movie Info (Title, Rating, and Button) */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <h3 className="text-base font-bold text-white">
          {movie.title || movie.name || "Untitled"}
        </h3>
        <div className="flex items-center justify-between mt-auto pt-2.5">
          <span className="text-sm font-medium text-yellow-400">
            <FaStar className="inline text-lg mb-1 mr-2" />
            {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </span>
          {renderButton()}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
