"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../app/ThemeProvider";
import SearchBar from "./components/SearchBar";
import GenreFilter from "./components/GenreFilter";
import MovieCard from "./components/movieCard";
import { useSearchStore } from "./store/useSearchStore";
import { useMovies } from "./hooks/useMovies";

const Home = () => {
  const { query, genreId } = useSearchStore();
  const { data: movies, isLoading, isError } = useMovies(query, genreId);

  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="py-4 px-6 xl:py-14 xl:px-26 min-h-screen bg-light dark:bg-dark text-zinc-900 dark:text-white">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          Acsid Maad Movies
          <button
            onClick={toggleTheme}
            className="p-1 rounded hover:text-yellow-400 transition"
            aria-label="Toggle Theme">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </h1>
      </div>

      <div className="flex justify-between gap-4 flex-col sm:flex-row">
        <SearchBar />
        <GenreFilter />
      </div>

      {isLoading && <div className="text-center mt-4">Loading...</div>}

      {isError && (
        <div className="text-red-500 text-center mt-4">
          Something went wrong
        </div>
      )}

      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6">
        {movies && movies.length > 0 ? (
          movies.map(movie => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <div className="col-span-full text-center text-gray-400">
            No movies found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
