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
  increment,
} from "firebase/firestore";
import { auth, db, storage } from "../config/firebase";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref } from "firebase/storage";

export const createArticle = async (
  authorId,
  title,
  article,
  coverURL,
  tags
) => {
  try {
    const articleID = uuidv4();
    const articleRef = doc(db, "/articles", articleID);

    const newArticle = {
      title: title,
      article: article,
      authorID: authorId,
      articleID: articleID,
      coverURL: coverURL,
      tags: tags,
      comments: [],
      likeCount: 0,
      dislikeCount: 0,
      likes: [],
      dislikes: [],
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

export const getUserArticles = async (nArticles, authorID) => {
  return new Promise(async (resolve, reject) => {
    const articleCollection = collection(db, "/articles");
    const q = query(
      articleCollection,
      where("authorID", "==", authorID),
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
    const q = query(
      articleCollection,
      where("authorID", "in", userIDs),
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

export const likeArticle = async (articleID, like, remove) => {
  return new Promise(async (resolve, reject) => {
    try {
      const currentUserId = auth.currentUser.uid;

      const articleRef = doc(db, "articles", articleID);
      const articleDoc = await getDoc(articleRef);

      if (articleDoc.exists()) {
        if (like) {
          if (remove) {
            await updateDoc(articleDoc, {
              likes: arrayRemove(currentUserId),
              likeCount: increment(-1),
            });
          } else {
            await updateDoc(articleDoc, {
              likes: arrayUnion(currentUserId),
              likeCount: increment(1),
            });
          }
        } else {
          if (remove) {
            await updateDoc(articleDoc, {
              dislikes: arrayRemove(currentUserId),
              dislikeCount: increment(-1),
            });
          } else {
            await updateDoc(articleDoc, {
              dislikes: arrayUnion(currentUserId),
              dislikeCount: increment(1),
            });
          }
        }
        resolve();
      } else {
        reject(new Error("Article not found"));
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const getArticleFileURL = async (articleStorageID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const articleRef = ref(storage, `/articles/${articleStorageID}.md`);

      getDownloadURL(articleRef).then((url) => {
        console.log(url);
        resolve(url);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const createArticleLink = async (article) => {
  return new Promise(async (resolve, reject) => {
    try {
      getUserData(article.authorID).then((userData) => {
        resolve(`/${userData.username}/${article.title.replace(/\s+/g, "-")}`);
      });
    } catch (error) {
      reject(error);
    }
  });
};
