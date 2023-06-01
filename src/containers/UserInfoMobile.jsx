// React Util
import React, { useEffect, useState } from "react";

// JS Functions
import { getUserData, followUser } from "../js/firebaseFunctions";

// JSX Elements
import { Badge, LoadingMessage } from "../components";

// Icons
import { FiUserPlus, FiUserX } from "react-icons/fi";
import { auth } from "../config/firebase";

const UserInfoMobile = ({ authorID }) => {
  const maxBadges = 2;
  const [loading, setLoading] = useState(true);

  const [authorData, setAuthorData] = useState({});
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    setLoading(true);

    getUserData(authorID).then((userData) => {
      setFollowing(userData.followers.includes(auth.currentUser.uid));
      setAuthorData(userData);
      setLoading(false);
    });
  }, [authorID]);
  return (
    <div className="flex justify-between items-center p-2 lg:hidden rounded shadow-lg border-[1px] border-gpt-50/20 bg-gpt-500/30">
      {loading ? (
        <div className="h-[60px] w-full flex items-center justify-center">
          <LoadingMessage message="Loading" />
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <img
              src={authorData.photoURL}
              className="aspect-square h-[60px] rounded-md"
              alt="Author"
            />
            <div className="flex flex-col h-full justify-center">
              <p className="font-bold text-xl">{authorData.username}</p>
              <ul className="flex flex-wrap gap-x-1 gap-y-0.5 w-[150px]">
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
          {following ? (
            <button
              className="flex justify-center items-center gap-2 text-white text-sm rounded h-[60px] aspect-square shadow-md border-[1px] border-gpt-50/20 bg-gpt-500/40"
              onClick={() =>
                followUser(authorData.userID, false).then(() => {
                  setFollowing(false);
                })
              }
            >
              <FiUserX size={20} />
            </button>
          ) : (
            <button
              className="flex justify-center items-center gap-2 text-white text-sm rounded h-[60px] aspect-square shadow-lg border-[1px] border-gpt-50/20 bg-gpt-100/80"
              onClick={() =>
                followUser(authorData.userID, true).then(() => {
                  setFollowing(true);
                })
              }
            >
              <FiUserPlus size={20} />
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default UserInfoMobile;
