// React Util
import React from "react";
import { Link } from "react-router-dom";

// Icons
import { BsPlus } from "react-icons/bs";
import { FiMessageSquare } from "react-icons/fi";

const SideBarArticle = ({ name, link }) => {
  return (
    <li>
      <a
        href={link}
        className="flex py-3 px-3 items-center gap-3 relative rounded-md hover:bg-[#2A2B32] cursor-pointer break-all )} )} hover:pr-4 bg-gpt-500 group"
      >
        <FiMessageSquare size={17} />
        <div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
          <p className="text-sm">{name}</p>
          <div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gpt-500 group-hover:from-[#2A2B32]"></div>
        </div>
      </a>
    </li>
  );
};

const SideBarSection = ({ title, articles, nArticles }) => {
  return (
    <li>
      <h3 className="h-9 pb-2 pt-3 px-3 text-xs text-gray-500 font-medium text-ellipsis overflow-hidden break-all">
        {title}
      </h3>
      <ol>
        {articles.slice(0, nArticles).map((index, article) => (
          <SideBarArticle key={index} name={article.name} link={article.link} />
        ))}
      </ol>
    </li>
  );
};

const SideBar = () => {
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
  ];

  return (
    <aside className="dark hidden w-[260px] h-full flex-shrink-0 flex-col overflow-x-hidden bg-gpt-500 md:flex">
      <nav className="flex h-full w-full flex-col p-2">
        <Link
          to="/create-article"
          className="flex py-3 px-3 items-center gap-3 transition-colors duration-200 text-white cursor-pointer text-sm rounded-md border border-white/20 hover:bg-gray-500/10 mb-1 flex-shrink-0"
        >
          <BsPlus size={20} />
          <p>Create Article</p>
        </Link>
        <div className="flex-col flex-1 transition-opacity duration-500 overflow-y-auto">
          <h2 className="pt-3 px-3 text-2xl text-gray-200 font-medium text-ellipsis overflow-hidden break-all">
            Articles
          </h2>
          <ol>
            <SideBarSection
              title="Recent"
              articles={tempArticles}
              nArticles={4}
            />
            <SideBarSection
              title="Most Liked"
              articles={tempArticles}
              nArticles={3}
            />
          </ol>
        </div>
        <div className="border-t border-white/20 pt-2"></div>
      </nav>
    </aside>
  );
};

export default SideBar;
