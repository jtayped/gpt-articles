// React Util
import React from "react";
import { Link } from "react-router-dom";

// JSX Components
import { Search } from "../components";

// Icons
import { FiTrendingUp, FiSun, FiSlack } from "react-icons/fi";

const HomeMainSectionArticle = ({ articleName }) => {
  return (
    <li className="w-full p-3 bg-gpt-50 dark:bg-white/5 rounded-md hover:bg-gpt-100 dark:hover:bg-gpt-500">
      <Link to="/linktoarticle" className="w-full h-full">
        {articleName} Lorem, ipsum dolor.
      </Link>
    </li>
  );
};

const HomeMainSection = ({ title, icon, articles }) => {
  return (
    <div className="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1">
      <h2 className="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
        {icon}
        {title}
      </h2>
      <ul className="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
        {articles.map((article) => (
          <HomeMainSectionArticle
            key={article.name}
            articleName={article.name}
          />
        ))}
      </ul>
    </div>
  );
};

const HomeMain = () => {
  const tempArticles = [
    { name: "Legal issues in copying", link: "/linktoarticle" },
    { name: "GPT Article Website", link: "/linktoarticle" },
    { name: "Adding .then() to function", link: "/linktoarticle" },
    { name: "Firebase Twitter-like functions", link: "/linktoarticle" },
    { name: "React Router Issue", link: "/linktoarticle" },
    { name: "SEO Expert Meta Descriptions", link: "/linktoarticle" },
    { name: "Subordinadas y sus tipos", link: "/linktoarticle" },
    { name: "Cook eggs thoroughly", link: "/linktoarticle" },
    { name: "Unique Social Media Ideas", link: "/linktoarticle" },
    { name: "Analizando Oraciones en Español", link: "/linktoarticle" },
    { name: "Introduction to Machine Learning", link: "/linktoarticle" },
    { name: "Data Encryption Techniques", link: "/linktoarticle" },
    { name: "Best Practices for Code Documentation", link: "/linktoarticle" },
    { name: "Understanding API Authentication", link: "/linktoarticle" },
    { name: "Effective Time Management Strategies", link: "/linktoarticle" },
    { name: "Introduction to Neural Networks", link: "/linktoarticle" },
    { name: "Creating Responsive Web Designs", link: "/linktoarticle" },
    { name: "Mastering CSS Grid Layouts", link: "/linktoarticle" },
    { name: "Beginner's Guide to Python Programming", link: "/linktoarticle" },
    {
      name: "Design Principles for Mobile Applications",
      link: "/linktoarticle",
    },
    { name: "Optimizing Website Performance", link: "/linktoarticle" },
  ];
  return (
    <main className="relative h-full w-full transition-width flex flex-col items-stretch flex-1">
      <div className="flex flex-col items-center justify-between text-sm dark:bg-gpt-400">
        {" "}
        <div className="text-gpt-200 w-full md:max-w-2xl lg:max-w-3xl md:h-full md:flex md:flex-col px-6 dark:text-gray-100 scrollbar-thin scrollbar-thumb-gpt-300">
          <h1 className="text-4xl font-semibold text-center sm:mt-[10vh] hidden md:flex ml-auto mr-auto mb-10 sm:mb-16 gap-2 items-center justify-center">
            GPT Articles
          </h1>
          <div className="md:flex items-start text-center gap-3.5 mb-[1000px]">
            <HomeMainSection
              title="Trending"
              icon={<FiTrendingUp size={25} />}
              articles={tempArticles.slice(2, 5)}
            />
            <HomeMainSection
              title="Discover"
              icon={<FiSun size={25} />}
              articles={tempArticles.slice(4, 7)}
            />
            <HomeMainSection
              title="Following"
              icon={<FiSlack size={25} />}
              articles={tempArticles.slice(0, 3)}
            />
          </div>
        </div>
        <Search />
      </div>
    </main>
  );
};

export default HomeMain;
