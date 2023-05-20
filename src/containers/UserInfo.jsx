// React Util
import React, { useEffect, useState } from "react";

// JS Functions
import {
  getUserArticles,
  getUserData,
  followUser,
} from "../js/firebaseFunctions";

// JSX Elements
import { Badge } from "../components";
import { ArticleGroup } from ".";

// Icons
import { FiUserPlus, FiUserX } from "react-icons/fi";
import { auth } from "../config/firebase";

const UserInfo = ({ authorID }) => {
  const maxBadges = 2;
  const maxArticles = 3;
  const [loading, setLoading] = useState(true);

  const [authorData, setAuthorData] = useState({});
  const [authorArticles, setAuthorArticles] = useState([]);

  const [following, setFollowing] = useState(false);

  useEffect(() => {
    setLoading(true);

    getUserData(authorID).then((userData) => {
      setFollowing(userData.followers.includes(auth.currentUser.uid));
      setAuthorData(userData);
    });

    getUserArticles(100, authorID).then((userArticles) => {
      setAuthorArticles(userArticles);
      setLoading(false);
    });
  }, [authorID]);

  return (
    <div
      className={`flex flex-col bg-gpt-500 min-w-[300px] rounded-lg shadow-xl ${
        loading ? "flex items-center justify-center" : null
      }`}
    >
      {loading ? (
        <div className="h-[400px] flex items-center justify-center">
          Loading
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2 p-4">
            <div className="flex gap-3">
              <img
                src={authorData.photoURL}
                className="aspect-square h-[60px] rounded-full"
                alt="Author"
              />
              <div className="flex flex-col h-full justify-center">
                <p className="font-bold text-xl">
                  {authorData.firstName} {authorData.lastName}
                </p>
                <ul className="flex flex-wrap gap-x-1 gap-y-0.5">
                  {authorData.badges
                    ? authorData.badges
                        .slice(0, maxBadges)
                        .map((badge, index) => (
                          <Badge key={index} badge={badge} />
                        ))
                    : null}
                  {authorData.badges &&
                  authorData.badges["length"] > maxBadges ? (
                    <li key={authorData.badges.lenght + 1}>
                      <p className="text-xs">
                        +{authorData.badges["length"] - maxBadges} more
                      </p>
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
            <article>
              <p className="font-bold text-lg">Description</p>
              <p className="text-sm">{authorData.description}</p>
            </article>
            {following ? (
              <button
                className="flex justify-center items-center gap-2 text-white text-sm bg-gpt-400 py-1 rounded"
                onClick={() =>
                  followUser(authorData.userID, false).then(() => {
                    setFollowing(false);
                  })
                }
              >
                <FiUserX />
                Following
              </button>
            ) : (
              <button
                className="flex justify-center items-center gap-2 text-black text-sm bg-gpt-50 py-1 rounded"
                onClick={() =>
                  followUser(authorData.userID, true).then(() => {
                    setFollowing(true);
                  })
                }
              >
                <FiUserPlus />
                Follow
              </button>
            )}
          </div>
          <hr />
          <ul className="flex flex-col gap-2 p-2">
            <ArticleGroup
              title="Popular Articles"
              articles={authorArticles.slice(0, maxArticles)}
              isLoading={false}
            />
          </ul>
        </>
      )}
    </div>
  );
};

export default UserInfo;
