// React Util
import React, { useEffect, useState } from "react";

// JSX Components
import { SideBar, MobileHeader, HomeMain } from "../containers";

// JS
import withAuthentication from "../js/withAuthRedirect";
import { getArticlesOrderedBy } from "../js/firebaseFunctions";

// Firebase
import { auth } from "../config/firebase";

const Home = () => {
  const [mostLikedArticles, setMostLikedArticles] = useState([]);
  const [recentArticles, setRecentArticles] = useState([]);

  const [trendingArticles, setTrendingArticles] = useState([]);
  const [discoveryArticles, setDiscoveryArticles] = useState([]);
  const [followingArticles, setFollowingArticles] = useState([]);

  useEffect(() => {
    getArticlesOrderedBy("likes", 3, setMostLikedArticles);
    getArticlesOrderedBy("timestamp", 3, setRecentArticles);
  }, []);

  return (
    <>
      {auth.currentUser ? (
        <div className="overflow-hidden w-full h-screen relative md:flex z-0 text-slate-100">
          <div className="hidden md:flex">
            <SideBar
              recentArticles={recentArticles}
              mostLikedArticles={mostLikedArticles}
            />
          </div>
          <div className="flex md:hidden w-screen h-10">
            <MobileHeader />
          </div>
          <HomeMain
            trendingArticles={trendingArticles}
            discoveryArticles={discoveryArticles}
            followingArticles={followingArticles}
          />
        </div>
      ) : null}
    </>
  );
};

export default withAuthentication(Home);
