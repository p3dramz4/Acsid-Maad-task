import { create } from "zustand";

type SearchState = {
  query: string;
  genreId: number | null; 
  setQuery: (q: string) => void;
  setGenreId: (id: number | null) => void;
};

export const useSearchStore = create<SearchState>(set => ({
  query: "",
  genreId: null,
  setQuery: q => set({ query: q }),
  setGenreId: id => set({ genreId: id }),
}));
