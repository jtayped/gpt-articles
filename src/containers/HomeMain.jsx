// React Util
import React from "react";
import { Link } from "react-router-dom";

// JSX Components
import { LoadingMessage, Search } from "../components";

// Icons
import { FiTrendingUp, FiSun, FiSlack } from "react-icons/fi";

const HomeMainSectionArticle = ({ articleTitle }) => {
  return (
    <li className="w-full p-3 bg-gpt-50 dark:bg-white/5 rounded-md hover:bg-gpt-100 dark:hover:bg-gpt-500">
      <Link to="/linktoarticle" className="w-full h-full">
        {articleTitle} Lorem, ipsum dolor.
      </Link>
    </li>
  );
};

const HomeMainSection = ({ title, icon, articles, isLoadingArticles }) => {
  return (
    <div className="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1">
      <h2 className="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
        {icon}
        {title}
      </h2>
      {isLoadingArticles ? (
        <LoadingMessage message={`Loading ${title}`} centered={true} />
      ) : (
        <ul className="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
          {articles.map((article) => (
            <HomeMainSectionArticle
              key={article.title}
              articleTitle={article.title}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

const HomeMain = ({
  discoveryArticles,
  followingArticles,
  trendingArticles,
  isLoadingArticles,
}) => {
  return (
    <main className="relative h-full w-full transition-width flex flex-col items-stretch flex-1">
      <div className="flex flex-col items-center justify-between text-sm dark:bg-gpt-400">
        {" "}
        <div className="text-gpt-200 w-full md:max-w-2xl lg:max-w-3xl md:h-full md:flex md:flex-col px-6 dark:text-gray-100">
          <h1 className="text-4xl font-semibold text-center sm:mt-[10vh] hidden md:flex ml-auto mr-auto mb-10 sm:mb-16 gap-2 items-center justify-center">
            GPT Articles
          </h1>
          <div className="md:flex items-start text-center gap-3.5 mb-[1000px]">
            <HomeMainSection
              title="Trending"
              icon={<FiTrendingUp size={25} />}
              articles={trendingArticles}
              isLoadingArticles={isLoadingArticles}
            />
            <HomeMainSection
              title="Discover"
              icon={<FiSun size={25} />}
              articles={discoveryArticles}
              isLoadingArticles={isLoadingArticles}
            />
            <HomeMainSection
              title="Following"
              icon={<FiSlack size={25} />}
              articles={followingArticles}
              isLoadingArticles={isLoadingArticles}
            />
          </div>
        </div>
        <Search />
      </div>
    </main>
  );
};

export default HomeMain;
