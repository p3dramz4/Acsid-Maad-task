import { useQuery } from "@tanstack/react-query";
import {
  fetchPopularMovies,
  searchMovies,
  searchMoviesByGenre,
} from "../lib/tmdb";

export const useMovies = (query: string, genreId: number | null) => {
  return useQuery({
    queryKey: ["movies", query, genreId],
    queryFn: async () => {
      if (query) {
        const searched = await searchMovies(query);

        if (genreId) return searched.filter(m => m.genre_ids.includes(genreId));
        return searched;
      }

      if (genreId) {
        return await searchMoviesByGenre(genreId);
      }

      return await fetchPopularMovies();
    },
    staleTime: 1000 * 60 * 5, 
  });
};
