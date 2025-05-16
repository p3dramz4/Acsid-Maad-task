export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  genres: { id: number; name: string }[];
  runtime: number;
  vote_average: number;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}
