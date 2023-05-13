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
  arrayUnion,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";

export const createArticle = async (userId, title, article, tags) => {
  try {
    const articleRef = doc(db, "/articles");

    const newArticle = {
      title: title,
      article: article,
      userID: userId,
      tags: tags,
      comments: [],
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
        badges: ["Newbie"],
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

export const getUserArticles = async (nArticles, userID) => {
  return new Promise(async (resolve, reject) => {
    const articleCollection = collection(db, "/articles");
    ///console.log(userIDs)
    const q = query(
      articleCollection,
      where("userID", "==", userID),
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
      .catch((error) => reject(error));
  });
};

export const getFollowingArticles = async (nArticles, userIDs) => {
  return new Promise(async (resolve, reject) => {
    const articleCollection = collection(db, "/articles");
    ///console.log(userIDs)
    const q = query(
      articleCollection,
      where("userID", "in", userIDs),
      orderBy("timestamp", "desc"),
      limit(nArticles)
    );

    getDocs(q)
      .then((querySnapshot) => {
        const articles = [];
        querySnapshot.forEach((doc) => {
          articles.push(doc.data());
        });
        resolve(articles);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const followUser = async (userID, follow) => {
  return new Promise(async (resolve, reject) => {
    try {
      const currentUserID = auth.currentUser.uid;
      const usersRef = collection(db, "users"); // Updated collection reference

      if (follow) {
        await updateDoc(doc(usersRef, currentUserID), {
          following: arrayUnion(userID),
        });
      } else {
        await updateDoc(doc(usersRef, currentUserID), {
          following: arrayRemove(userID),
        });
      }

      if (follow) {
        await updateDoc(doc(usersRef, userID), {
          followers: arrayUnion(currentUserID),
        });
      } else {
        await updateDoc(doc(usersRef, userID), {
          followers: arrayRemove(currentUserID),
        });
      }

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};


export const likeArticle = async (article) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Like or Dislike article
    } catch (error) {
      reject(error); // Reject the promise with the error if an error occurs
    }
  });
};
