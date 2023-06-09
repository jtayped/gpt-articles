// React util
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Icons
import { FiSend } from "react-icons/fi";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");

  function searchForArticles() {
    console.log(searchValue);
  }

  return (
    <div className="fixed bottom-0 left-0 w-full md:pl-[260px] min-h-fit border-t border-white/20 bg-gpt-400 pt-2">
      <form
        onSubmit={() => searchForArticles()}
        className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
      >
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="flex flex-col items-center w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-gpt-500/50 text-white bg-gpt-100 rounded-md shadow-[0_0_15px_rgba(0,0,0,0.10)] pr-4">
            <textarea
              className="m-0 w-full resize-none placeholder:text-[17px] text-[17px] placeholder:font-light border-0 p-0 pr-7 focus:ring-0 focus:outline-none focus-visible:ring-0 bg-transparent pl-2 md:pl-0 max-h-[200px] h-[24px] overflow-y-hidden"
              rows="1"
              placeholder="Search..."
              onChange={(e) => setSearchValue(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="absolute p-1 rounded-md text-gpt-200 bottom-1.5 md:bottom-2.5 disabled:hover:bg-transparent right-1 md:right-2 disabled:opacity-40"
            >
              <FiSend size={16} />
            </button>
          </div>
        </div>
      </form>
      <p className="text-center px-3 pb-3 pt-2 text-xstext-gray-300 md:px-4 md:pb-6 md:pt-3">
        This is <b>NOT</b> the oficial Chat GPT website, this is GPT Articles.{" "}
        <Link to="/gpt-articles/about" className="underline">
          Read More
        </Link>
      </p>
    </div>
  );
};

export default Search;
