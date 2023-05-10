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

export const getArticlesOrderedBy = async (orderedBy, nArticles) => {
  return new Promise((resolve, reject) => {
    const articlesCollection = collection(db, "articles");
    const q = query(articlesCollection, orderBy(orderedBy), limit(nArticles));
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
