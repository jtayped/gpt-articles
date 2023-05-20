import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Auth, LogIn, SignUp, About, Article } from "./pages";
import { SideBar, MobileHeader } from "./containers";
import { LoadingMessage } from "./components";

import { auth } from "./config/firebase";
import {
  getArticlesOrderedBy,
  getRandomArticles,
  getTrendingArticles,
  getUserData,
  getFollowingArticles,
} from "./js/firebaseFunctions";

function App() {
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [mostLikedArticles, setMostLikedArticles] = useState([]);
  const [recentArticles, setRecentArticles] = useState([]);
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [discoveryArticles, setDiscoveryArticles] = useState([]);
  const [followingArticles, setFollowingArticles] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      setLoggedIn(user);

      if (user.uid) {
        getUserData(user.uid).then((userData) => {
          setUserData(userData);
          getArticlesOrderedBy("likeCount", 3, false).then((articles) => {
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
          getFollowingArticles(3, userData.following).then((articles) => {
            setFollowingArticles(articles);
          });
        });
      }
    });

    return unsubscribe;
  }, []);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LoadingMessage message="Loading" centered={true} />
      </div>
    );
  }

  return (
    <BrowserRouter>
      {isLoggedIn && <MobileHeader />}
      <Routes>
        <Route
          exact
          path="/"
          element={
            isLoggedIn ? (
              <Home
                mostLikedArticles={mostLikedArticles}
                recentArticles={recentArticles}
                trendingArticles={trendingArticles}
                discoveryArticles={discoveryArticles}
                followingArticles={followingArticles}
              />
            ) : (
              <Auth />
            )
          }
        />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/testArticle" element={<Article />} />
        <Route exact path="/login" element={<LogIn />} />
        <Route exact path="/signup" element={<SignUp />} />
      </Routes>
      {isLoggedIn && (
        <SideBar
          recentArticles={recentArticles}
          mostLikedArticles={mostLikedArticles}
          userData={userData}
          isLoading={isLoading}
        />
      )}
    </BrowserRouter>
  );
}

export default App;
