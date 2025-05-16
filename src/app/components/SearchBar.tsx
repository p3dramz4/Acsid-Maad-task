"use client";
import { useEffect, useState } from "react";
import { useSearchStore } from "../store/useSearchStore";
import debounce from "lodash.debounce";

const SearchBar = () => {
  const [input, setInput] = useState(""); 
  const { setQuery } = useSearchStore();

  const debouncedUpdateQuery = debounce((q: string) => {
    setQuery(q.trim().toLowerCase());
  }, 800);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value); 
    debouncedUpdateQuery(value); 
  };

  useEffect(() => {
    return () => {
      debouncedUpdateQuery.cancel(); 
    };
  }, []);

  return (
    <form onSubmit={e => e.preventDefault()} className="mb-4 w-[25%]">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Search for a movie..."
        className="w-full p-2 border border-gray-400 dark:border-gray-500 rounded-lg text-sm"
      />
    </form>
  );
};

export default SearchBar;
