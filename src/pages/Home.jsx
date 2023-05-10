// React Util
import React, { useEffect, useState } from "react";

// JSX Components
import { SideBar, MobileHeader, HomeMain } from "../containers";

// JS
import withAuthentication from "../js/withAuthRedirect";
import {
  getArticlesOrderedBy,
  getRandomArticles,
} from "../js/firebaseFunctions";

// Firebase
import { auth } from "../config/firebase";

const Home = () => {
  const [isLoadingArticles, setLoadingArticles] = useState(true);

  const [mostLikedArticles, setMostLikedArticles] = useState([]);
  const [recentArticles, setRecentArticles] = useState([]);

  const [trendingArticles, setTrendingArticles] = useState([]);
  const [discoveryArticles, setDiscoveryArticles] = useState([]);
  const [followingArticles, setFollowingArticles] = useState([]);

  useEffect(() => {
    setLoadingArticles(true);

    getArticlesOrderedBy("likes", 3).then((articles) => {
      setMostLikedArticles(articles);
    });
    getArticlesOrderedBy("timestamp", 3).then((articles) => {
      setRecentArticles(articles);
      setLoadingArticles(false);
    });

    getRandomArticles(3).then((articles) => {
      setTrendingArticles(articles);
      setDiscoveryArticles(articles);
      setFollowingArticles(articles);
    });
  }, []);

  return (
    <>
      {auth.currentUser ? (
        <div className="overflow-hidden w-full h-screen relative md:flex z-0 text-slate-100">
          <div className="hidden md:flex">
            <SideBar
              recentArticles={recentArticles}
              mostLikedArticles={mostLikedArticles}
              isLoadingArticles={isLoadingArticles}
            />
          </div>
          <div className="flex md:hidden w-screen h-10">
            <MobileHeader />
          </div>
          <HomeMain
            trendingArticles={trendingArticles}
            discoveryArticles={discoveryArticles}
            followingArticles={followingArticles}
            isLoadingArticles={isLoadingArticles}
          />
        </div>
      ) : null}
    </>
  );
};

export default withAuthentication(Home);
