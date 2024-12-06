"use client";

import { Job } from "@/types/job";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import SearchIcon from "../icons/SearchIcon";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Array<Job>>([]);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedQuery) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(`/api/jobs?query=${debouncedQuery}`);
        const { jobs } = await res.json();
        setSuggestions(jobs);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  return (
    <div className="text-center my-12">
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-4">
        Find Your Dream Job
      </h1>
      <div className="flex justify-center items-center relative">
        <form className="w-[90%] sm:w-[60%] md:w-[50%]">
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              className="outline-none block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#E9DED3] focus:border-[#E9DED3]  dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#E9DED3] dark:focus:border-[#E9DED3]"
              placeholder="Search Jobs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
            <button
              type="submit"
              className="absolute end-2.5 bottom-2.5 text-black bg-[#E9DED3] hover:bg-[#F6F2ED] focus:ring-4 focus:outline-none focus:ring-[#E9DED3] font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#E9DED3] dark:hover:bg-[#E9DED3] dark:focus:ring-[#E9DED3]"
            >
              Search
            </button>
          </div>
        </form>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute z-10 top-12 border border-[#E9DED3] rounded-md bg-white w-[90%] sm:w-[60%] md:w-[50%] max-h-60 overflow-y-auto">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="p-2 hover:bg-[#F6F2ED] cursor-pointer text-sm sm:text-md md:text-lg"
                onClick={() => {
                  setQuery(suggestion.title);
                  setSuggestions([]);
                }}
              >
                {suggestion.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
