import { fetchMovieDetails } from "../../lib/tmdb";

interface MovieDetailPageProps {
  params: {
    id: string;
  };
}

export default async function MovieDetailPage({
  params,
}: MovieDetailPageProps) {
  const movie = await fetchMovieDetails(Number(params.id));

  return (
    <div className="relative min-h-screen text-white flex items-center justify-center">
      <div className="absolute inset-0 -z-10">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt="Backdrop"
          className="w-full h-full object-cover blur-md opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/90" />
      </div>
      <div className="max-w-6xl w-full px-4 py-10">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="w-full md:w-1/3 relative aspect-[2/3]">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            {movie.tagline && (
              <p className="italic text-lg text-gray-300">{movie.tagline}</p>
            )}
            <p className="text-gray-200">{movie.overview}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-400 mt-6">
              <p>
                <span className="text-white font-semibold">🎬 Genres:</span>{" "}
                {movie.genres.map(g => g.name).join(", ")}
              </p>
              <p>
                <span className="text-white font-semibold">
                  📅 Release Date:
                </span>{" "}
                {movie.release_date}
              </p>
              <p>
                <span className="text-white font-semibold">🕒 Runtime:</span>{" "}
                {movie.runtime} min
              </p>
              <p>
                <span className="text-white font-semibold">🌐 Language:</span>{" "}
                {movie.original_language.toUpperCase()}
              </p>
              <p>
                <span className="text-white font-semibold">⭐ Rating:</span>{" "}
                {movie.vote_average.toFixed(1)} / 10
              </p>
              <p>
                <span className="text-white font-semibold">🎞️ Status:</span>{" "}
                {movie.status}
              </p>
            </div>
            {movie.homepage && (
              <a
                href={movie.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-white font-medium underline hover:text-yellow-400">
                Visit Official Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}