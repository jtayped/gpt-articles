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
import { getUserData, checkUserExists } from "./js/firebaseFunctions";

function App() {
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState([]);

  const [articleRoutesInfo, setArticleRoutesInfo] = useState([]);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        checkUserExists(user.uid).then((exists) => {
          setLoggedIn(exists);

          getUserData(user.uid).then((userData) => {
            setUserData(userData);
            setLoading(false);
          });
        });
      } else {
        setLoggedIn(false);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [setArticleRoutesInfo]);

  const articleRoutes = articleRoutesInfo.map((articleInfo, index) => (
    <Route
      key={index}
      path={"/gpt-articles" + articleInfo.route}
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
      <Routes>
        <Route
          exact
          path="/gpt-articles"
          element={
            isLoggedIn ? (
              <Home setArticleRoutesInfo={setArticleRoutesInfo} />
            ) : (
              <Auth />
            )
          }
        />

        {articleRoutes}

        <Route exact path="/gpt-articles/create" element={<Development />} />
        <Route exact path="/gpt-articles/liked" element={<Development />} />
        {!isLoggedIn && (
          <Route exact path="/gpt-articles/login" element={<LogIn />} />
        )}
        {!isLoggedIn && (
          <Route
            exact
            path="/gpt-articles/signup"
            element={<SignUp setLoggedIn={setLoggedIn} />}
          />
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
      {isLoggedIn && (
        <MobileHeader
          userData={userData}
          isLoading={isLoading}
          setArticleRoutesInfo={setArticleRoutesInfo}
        />
      )}
      {isLoggedIn && (
        <SideBar
          userData={userData}
          isLoading={false}
          isMobile={false}
          setArticleRoutesInfo={setArticleRoutesInfo}
        />
      )}
    </BrowserRouter>
  );
}

export default App;
