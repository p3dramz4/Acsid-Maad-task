"use client";
import { FC, useState } from "react";
import Link from "next/link";
import { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const [imgSrc, setImgSrc] = useState(
    `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  );

  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="bg-movieCard dark:bg-movieCard-dark p-3 pb-0 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer">
        <div className="w-full aspect-[2/3] bg-black">
          <img
            src={imgSrc}
            alt={movie.title}
            onError={() => setImgSrc("/images/default-movie.jpg")} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-3">
          <h2 className="text-zinc-900 dark:text-white text-lg font-semibold mb-1 truncate">
            {movie.title}
          </h2>
          <p className="text-zinc-900 dark:text-white text-sm">
            {movie.release_date?.split("-")[0]} • ⭐{" "}
            {movie.vote_average.toFixed(1)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;

