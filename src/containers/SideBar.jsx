// React Util
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Icons
import { FiSettings, FiHeart, FiLogOut, FiPlus } from "react-icons/fi";

// Firebase
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

// Animation
import { motion, AnimatePresence } from "framer-motion";

// Images
import DefaultPFP from "../assets/defaultPFP.webp";

// JSX Components
import { ArticleGroup } from "./index";
import {
  getArticlesOrderedBy,
  getProfilePicture,
} from "../js/firebaseFunctions";
import { appendArticleRoutes } from "../js/firebaseFunctions";

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

const SideBar = ({ userData, isLoading, isMobile, setArticleRoutesInfo }) => {
  const navigate = useNavigate();
  const [isAccountOpts, setAccountOpts] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");

  const [recentArticles, setRecentArticles] = useState([]);
  const [mostLikedArticles, setMostLikedArticles] = useState([]);

  useEffect(() => {
    if (!auth.currentUser.photoURL) {
      getProfilePicture(auth.currentUser.uid)
        .then((url) => {
          setProfilePicture(url);
        })
        .catch((err) => console.error(err));
    }

    getArticlesOrderedBy("timestamp", 4, true).then((articles) => {
      setRecentArticles(articles);
      appendArticleRoutes(articles, setArticleRoutesInfo);
    });
    getArticlesOrderedBy("likeCount", 4, false).then((articles) => {
      setMostLikedArticles(articles);
      appendArticleRoutes(articles, setArticleRoutesInfo);
    });
  }, [setArticleRoutesInfo]);

  function toggleAccountOpts() {
    setAccountOpts(!isAccountOpts);
  }

  async function handleLogOut() {
    await signOut(auth);
    navigate("/gpt-articles");
  }

  function navigateToLikedPosts() {
    navigate("/liked");
  }

  return (
    <aside
      className={`fixed top-0 left-0 dark w-[260px] h-screen flex-shrink-0 flex-col overflow-x-hidden bg-gpt-500 ${
        isMobile ? "block md:hidden" : "hidden md:block"
      }`}
    >
      <nav className="flex h-full w-full flex-col p-2">
        <Link
          to="/gpt-articles/create"
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
            <ArticleGroup
              key="recentSection"
              title="Recent"
              articles={recentArticles}
              isLoading={isLoading}
            />
            <ArticleGroup
              key="mostLikedSection"
              title="Most Liked"
              articles={mostLikedArticles}
              isLoading={isLoading}
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
              name={userData.username}
              icon={
                <img
                  src={
                    userData.photoURL
                      ? userData.photoURL
                      : profilePicture
                      ? profilePicture
                      : DefaultPFP
                  }
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
