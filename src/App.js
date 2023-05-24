// React Util
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// JSX Components
import {
  Home,
  Auth,
  LogIn,
  SignUp,
  Article,
  Development,
  NotFound,
} from "./pages";
import { SideBar, MobileHeader } from "./containers";
import { LoadingMessage } from "./components";

// Firebase
import { auth } from "./config/firebase";
import {
  getArticlesOrderedBy,
  getRandomArticles,
  getTrendingArticles,
  getUserData,
  getFollowingArticles,
  appendArticleRoutes,
  checkUserExists,
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

  const [articleRoutesInfo, setArticleRoutesInfo] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      if (user) {
        checkUserExists(user.uid).then((exists) => {
          setLoggedIn(exists);
        });
      } else {
        setLoggedIn(false);
      }

      if (user) {
        getUserData(user.uid).then((userData) => {
          setUserData(userData);
          getArticlesOrderedBy("likeCount", 3, false).then((articles) => {
            setMostLikedArticles(articles);
            appendArticleRoutes(articles, setArticleRoutesInfo);
          });
          getArticlesOrderedBy("timestamp", 3, false).then((articles) => {
            setRecentArticles(articles);
            appendArticleRoutes(articles, setArticleRoutesInfo);
          });
          getTrendingArticles(3).then((articles) => {
            setTrendingArticles(articles);
            appendArticleRoutes(articles, setArticleRoutesInfo);
          });
          getRandomArticles(3).then((articles) => {
            setDiscoveryArticles(articles);
            appendArticleRoutes(articles, setArticleRoutesInfo);
          });
          if (userData.following.lenght > 0) {
            getFollowingArticles(3, userData.following).then((articles) => {
              setFollowingArticles(articles);
              appendArticleRoutes(articles, setArticleRoutesInfo);
            });
          }
        });
      }
    });

    return unsubscribe;
  }, [setArticleRoutesInfo]);

  const articleRoutes = articleRoutesInfo.map((articleInfo, index) => (
    <Route
      key={index}
      path={articleInfo.route}
      element={
        <Article
          article={articleInfo.article}
          setArticleRoutesInfo={setArticleRoutesInfo}
        />
      }
    />
  ));

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

        {articleRoutes}

        <Route exact path="/create" element={<Development />} />
        <Route exact path="/liked" element={<Development />} />
        {!isLoggedIn && <Route exact path="/login" element={<LogIn />} />}
        {!isLoggedIn && <Route exact path="/signup" element={<SignUp />} />}

        <Route path="*" element={<NotFound />} />
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
