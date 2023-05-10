import {
  doc,
  serverTimestamp,
  setDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const createArticle = async (userId, title) => {
  try {
    const articleRef = doc(db, "articles", userId + "_" + title);

    // Create a new article document with the likes, dislikes, and timestamp
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

export const getArticlesOrderedBy = async (
  orderedBy,
  nArticles,
  setFunction
) => {
  const articlesCollection = collection(db, "articles");
  const q = query(articlesCollection, orderBy(orderedBy), limit(nArticles));
  const querySnapshot = await getDocs(q);

  const articles = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  setFunction(articles);
};
