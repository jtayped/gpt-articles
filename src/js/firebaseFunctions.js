import { doc, serverTimestamp, setDoc } from "firebase/firestore";
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
