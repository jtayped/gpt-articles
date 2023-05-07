// React Util
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Icons
import {
  FiMessageSquare,
  FiSettings,
  FiHeart,
  FiLogOut,
  FiPlus,
} from "react-icons/fi";

// Firebase
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

// Animation
import { motion, AnimatePresence } from "framer-motion";

const SideBarArticle = ({ name, link }) => {
  return (
    <li>
      <a
        href={link}
        className="flex py-3 px-3 items-center gap-3 relative rounded-md hover:bg-[#2A2B32] cursor-pointer break-all )} )} hover:pr-4 bg-gpt-500 group"
      >
        <FiMessageSquare size={16} />
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
      className="flex py-3 px-3 items-center gap-3 transition-colors duration-200 text-white cursor-pointer text-sm bg-gpt-500 hover:bg-[#2A2B32] rounded-md"
      onClick={() => funct()}
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

  const navigate = useNavigate();
  const [isAccountOpts, setAccountOpts] = useState(false);
  function toggleAccountOpts() {
    setAccountOpts(!isAccountOpts);
  }

  async function handleLogOut() {
    await signOut(auth);

    navigate("/auth");
  }

  function navigateToLikedPosts() {
    navigate("/likedPosts");
  }

  return (
    <aside className="dark w-[260px] h-screen flex-shrink-0 flex-col overflow-x-hidden bg-gpt-500">
      <nav className="flex h-full w-full flex-col p-2">
        <Link
          to="/create"
          className="flex py-3 px-3 items-center gap-3 transition-colors duration-200 text-white cursor-pointer text-sm rounded-md border border-white/20 hover:bg-gray-500/10 mb-1 flex-shrink-0"
        >
          <FiPlus size={16} />
          <p>Create Article</p>
        </Link>
        <div className="flex-col flex-1 transition-opacity duration-500 overflow-y-auto scrollbar-thin scrollbar-thumb-gpt-300">
          <h2 className="pt-3 px-3 text-2xl text-gray-200 font-medium text-ellipsis overflow-hidden break-all">
            Articles
          </h2>
          <ol>
            <SideBarSection
              key="recentSection"
              title="Recent"
              articles={tempArticles}
              nArticles={7}
            />
            <SideBarSection
              key="mostLikedSection"
              title="Most Liked"
              articles={tempArticles}
              nArticles={20}
            />
          </ol>
        </div>
        <nav className="border-t border-white/20 pt-2">
          <div className="relative flex flex-col gap-1">
            <AnimatePresence>
              {isAccountOpts ? (
                <motion.nav
                  className="absolute bottom-[50px] w-full bg-black p-3 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.1 }}
                >
                  <button className="flex items-center gap-3">
                    <FiSettings size={20} />
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
                  className="h-[20px] rounded-sm"
                  alt="Profile"
                />
              }
              funct={toggleAccountOpts}
            />
            <SideBarAccountOption
              key="logOut"
              name="Log Out"
              icon={<FiLogOut size={17} />}
              funct={handleLogOut}
            />
            <SideBarAccountOption
              key="likedArticles"
              name="Liked Articles"
              icon={<FiHeart size={17} />}
              funct={navigateToLikedPosts}
            />
          </div>
        </nav>
      </nav>
    </aside>
  );
};

export default SideBar;