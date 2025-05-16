"use client";

import { useEffect, useState } from "react";
import { useSearchStore } from "../store/useSearchStore";
import { useTheme } from "../ThemeProvider";
import SelectClientOnly from "../helper/SelectClientOnly";

type Genre = {
  id: number;
  name: string;
};

type OptionType = {
  value: number | null;
  label: string;
};

const GenreFilter = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const { genreId, setGenreId } = useSearchStore();
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      const data = await res.json();
      setGenres(data.genres);
    };
    fetchGenres();
  }, []);

  const options: OptionType[] = genres.map(genre => ({
    value: genre.id,
    label: genre.name,
  }));

  const selectedOption =
    options.find(option => option.value === genreId) || null;

  return (
    <div className="mb-4 w-full max-w-xs z-10">
      <SelectClientOnly
        options={options}
        value={selectedOption}
        onChange={option =>
          setGenreId(option?.value !== null ? option.value : null)
        }
        darkMode={darkMode} 
      />
    </div>
  );
};

export default GenreFilter;
