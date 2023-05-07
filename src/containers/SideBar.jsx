// React Util
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Icons
import { BsPlus } from "react-icons/bs";
import { FiMessageSquare } from "react-icons/fi";
import { IoSettingsSharp } from "react-icons/io5";

// Firebase
import { auth } from "../config/firebase";

// Animation
import { motion, AnimatePresence } from "framer-motion";

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
        {articles.slice(0, nArticles).map((article, index) => (
          <SideBarArticle key={index} name={article.name} link={article.link} />
        ))}
      </ol>
    </li>
  );
};

const SideBarAccountOption = ({ name, icon, funct }) => {
  return (
    <button
      className="flex py-3 px-3 items-center gap-3 transition-colors duration-200 text-white cursor-pointer text-sm hover:bg-gray-800 rounded-md"
      onClick={() => funct}
    >
      {icon}
      <p>{name}</p>
    </button>
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

  const [isAccountOpts, setAccountOpts] = useState(true);
  function toggleAccountOpts() {
    setAccountOpts(!isAccountOpts);
  }

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
              key="recentSection"
              title="Recent"
              articles={tempArticles}
              nArticles={4}
            />
            <SideBarSection
              key="mostLikedSection"
              title="Most Liked"
              articles={tempArticles}
              nArticles={3}
            />
          </ol>
        </div>
        <nav className="border-t border-white/20 pt-2">
          <div className="relative">
            <AnimatePresence>
              {isAccountOpts ? (
                <motion.nav
                  className="relative bottom-0 bg-black p-3 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <button className="flex items-center gap-3">
                    <IoSettingsSharp size={20} />
                    <p>Settings</p>
                  </button>
                </motion.nav>
              ) : null}
            </AnimatePresence>
            <SideBarAccountOption
              key="yourAccount"
              name={auth.currentUser.displayName}
              icon={
                <img
                  src={auth.currentUser.photoURL}
                  className="h-[30px] rounded-sm"
                  alt="Profile"
                />
              }
              funct={toggleAccountOpts}
            />
          </div>
        </nav>
      </nav>
    </aside>
  );
};

export default SideBar;
