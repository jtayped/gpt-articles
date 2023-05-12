// React Util
import React, { useEffect, useState } from "react";

// JSX Components
import { SideBar, MobileHeader, HomeMain } from "../containers";

// JS
import withAuthentication from "../js/withAuthRedirect";
import {
  createUser,
  getArticlesOrderedBy,
  getRandomArticles,
  getTrendingArticles,
  getUserData,
  getUserArticles,
} from "../js/firebaseFunctions";

// Firebase
import { auth } from "../config/firebase";

const Home = () => {
  const [isLoading, setLoading] = useState(true);

  const [mostLikedArticles, setMostLikedArticles] = useState([]);
  const [recentArticles, setRecentArticles] = useState([]);

  const [trendingArticles, setTrendingArticles] = useState([]);
  const [discoveryArticles, setDiscoveryArticles] = useState([]);
  const [followingArticles, setFollowingArticles] = useState([]);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    setLoading(true);

    if (auth.currentUser.uid) {
      getUserData(auth.currentUser.uid).then((userData) => {
        setUserData(userData);
      });
    }

    getArticlesOrderedBy("likes", 3, false).then((articles) => {
      setMostLikedArticles(articles);
    });
    getArticlesOrderedBy("timestamp", 3, false).then((articles) => {
      setRecentArticles(articles);
    });

    getTrendingArticles(3).then((articles) => {
      setTrendingArticles(articles);
    });

    getRandomArticles(3).then((articles) => {
      setDiscoveryArticles(articles);
    });

    // const followingArticlesTemp = [];
    // console.log(userData.following);
    // userData.following.map((userId) => {
    //   getUserArticles(userId).then((userArticles) => {
    //     followingArticlesTemp.push(userArticles);
    //   });
    // });
    // setFollowingArticles(followingArticlesTemp);

    getRandomArticles(3).then((articles) => {
      setFollowingArticles(articles);
      setLoading(false);
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
              userData={userData}
              isLoading={isLoading}
            />
          </div>
          <div className="flex md:hidden w-screen h-10">
            <MobileHeader />
          </div>
          <HomeMain
            trendingArticles={trendingArticles}
            discoveryArticles={discoveryArticles}
            followingArticles={followingArticles}
            isLoading={isLoading}
          />
        </div>
      ) : null}
    </>
  );
};

export default withAuthentication(Home);
