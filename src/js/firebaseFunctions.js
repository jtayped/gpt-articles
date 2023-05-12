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
} from "firebase/firestore";
import { db } from "../config/firebase";

export const createArticle = async (userId, title) => {
  try {
    const articleRef = doc(db, "articles", userId + "_" + title);

    const newArticle = {
      title: title,
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
