import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);
  const getFeed = async () => {
    try {
      if (feedData) return;
      const res = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addFeed(res.data.feed));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="mx-4 flex min-h-screen items-center justify-center gap-4">
      {feedData?.map((item) => (
        <UserCard key={item._id} user={item} />
      ))}
    </div>
  );
};

export default Feed;
