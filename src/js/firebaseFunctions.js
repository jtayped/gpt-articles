import {
  doc,
  serverTimestamp,
  setDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  startAt,
  getDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";

export const createArticle = async (userId, title, article) => {
  try {
    const articleRef = doc(db, "/articles");

    const newArticle = {
      title: title,
      article: article,
      userID: userId,
      likes: 0,
      dislikes: 0,
      timestamp: serverTimestamp(),
    };

    // Set the new article document in the specified path
    await setDoc(articleRef, newArticle);
  } catch (error) {
    console.error(error);
  }
};

export const getArticlesOrderedBy = async (orderedBy, nArticles, ascending) => {
  return new Promise((resolve, reject) => {
    const articlesCollection = collection(db, "articles");
    const q = query(
      articlesCollection,
      orderBy(orderedBy, ascending ? "asc" : "desc"),
      limit(nArticles)
    );
    getDocs(q)
      .then((querySnapshot) => {
        const articles = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        resolve(articles);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getTrendingArticles = async (nArticles) => {
  return new Promise(async (resolve, reject) => {
    const articlesCollection = collection(db, "/articles");
    const q = query(articlesCollection, orderBy("likes", "desc"), limit(100));
    getDocs(q)
      .then((querySnapshot) => {
        const articles = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const timeNow = Date.now();
        articles.forEach((article) => {
          const likedAt = article.timestamp;
          const elapsedTime = timeNow - likedAt;
          const likesPerMillisecond = article.likes / elapsedTime;
          article.trendingScore = likesPerMillisecond;

          articles.sort((a, b) => b.trendingScore - a.trendingScore);
          resolve(articles.slice(0, 3));
        });
      })
      .catch((error) => reject(error));
  });
};

export const getRandomArticles = async (nArticles) => {
  return new Promise(async (resolve, reject) => {
    const articlesCollection = collection(db, "articles");
    const snapshot = await getDocs(articlesCollection);
    const totalArticles = snapshot.size;

    const randomIndex = Math.floor(Math.random() * totalArticles);

    const q = query(
      articlesCollection,
      orderBy("title"),
      startAt(randomIndex),
      limit(nArticles)
    );

    getDocs(q)
      .then((querySnapshot) => {
        const articles = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        resolve(articles);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const createUser = async (username, firstName, lastName) => {
  try {
    const userRef = doc(db, "/users", auth.currentUser.uid);

    const userCollection = collection(db, "/users");
    const q = query(userCollection, where("username", "==", username));
    const usersWithUsername = await getDocs(q);

    if (!usersWithUsername.empty) {
      console.error("Username taken!");
    } else {
      const newUser = {
        username: username,
        firstName: firstName,
        lastName: lastName,
        photoURL: auth.currentUser.photoURL,
        following: [],
        followers: [],
        likedPosts: [],
        timestamp: serverTimestamp(),
      };

      // Set the new article document in the specified path
      await setDoc(userRef, newUser);
      console.log("User created!");
    }
  } catch (error) {
    console.error(error);
  }
};

export const getUserData = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userDoc = doc(db, "/users", userId);
      const userData = await getDoc(userDoc);

      if (userData.exists()) {
        getDoc(userDoc)
          .then((userData) => {
            resolve(userData.data());
          })
          .catch((error) => console.error(error));
      } else {
        reject(new Error("User not found"));
      }
    } catch (error) {
      console.error(error);
    }
  });
};

export const getUserArticles = async (userId) => {
  return new Promise(async (resolve, reject) => {
    const articlesCollection = collection(db, "/articles");
    const q = query(articlesCollection, where("userID", "==", userId));

    getDocs(q)
      .then((userArticles) => {
        const cleanData = userArticles.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        resolve(cleanData);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
