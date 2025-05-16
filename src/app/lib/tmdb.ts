import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

export async function fetchPopularMovies() {
  try {
    const response = await tmdb.get("/movie/popular", {
      params: {
        page: 1,
      },
    });
    return response.data.results;
  } catch {
    throw new Error("Failed to fetch popular movies");
  }
}

export async function searchMovies(query: string) {
  try {
    const response = await tmdb.get("/search/movie", {
      params: {
        query,
        page: 1,
      },
    });
    return response.data.results;
  } catch {
    throw new Error("Failed to fetch search results");
  }
}

export async function fetchMovieDetails(id: number) {
  try {
    const response = await tmdb.get(`/movie/${id}`);
    console.log(response.data);
    return response.data;
  } catch {
    throw new Error("Failed to fetch movie details");
  }
}

export async function fetchGenres() {
  try {
    const response = await tmdb.get("/genre/movie/list");
    return response.data.genres;
  } catch {
    throw new Error("Failed to fetch genres");
  }
}

export const searchMoviesByGenre = async (genreId: number) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${genreId}`
  );
  const data = await res.json();
  return data.results;
};
