import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requestData = useSelector((store) => store.requests);
  const [loadingId, setLoadingId] = useState(null);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });

      dispatch(addRequest(res.data.connectionRequests));
    } catch (error) {
      console.log(error);
    }
  };

  const reviewRequest = async (_id, status) => {
    try {
      setLoadingId(_id);

      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        {
          withCredentials: true,
        },
      );

      // ✅ Remove request locally instead of refetching
      dispatch(removeRequest(_id));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requestData) return null;

  if (requestData.length === 0)
    return (
      <h1 className="flex justify-center text-2xl font-bold mt-4">
        No Requests Found
      </h1>
    );

  return (
    <div className="p-4 min-h-screen flex items-center justify-center flex-col gap-4">
      <h1 className="text-2xl font-bold mb-4">
        Your Requests ({requestData.length})
      </h1>

      {requestData.map((request) => {
        const { _id, fromUserId } = request;

        // ✅ Safe guard
        if (!fromUserId) return null;

        const { firstName, lastName, photoUrl, age, gender, about, skills } =
          fromUserId;

        const skillsArray = Array.isArray(skills) ? skills : [];

        return (
          <div
            key={_id}
            className="flex flex-row flex-wrap gap-4 card card-side bg-base-300 shadow-sm"
          >
            <figure>
              <img
                className="w-48 object-cover"
                src={
                  photoUrl && photoUrl.trim() !== ""
                    ? photoUrl
                    : "https://img.icons8.com/fluent/1200/user-male-circle.jpg"
                }
                alt="User Avatar"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">
                {firstName} {lastName || ""}
              </h2>

              <div className="flex gap-4">
                <p className="opacity-70">Age: {age ? age : "N/A"}</p>
                <p className="opacity-70">Gender: {gender ? gender : "N/A"}</p>
              </div>

              <p>{about || "No bio available"}</p>

              <div className="flex flex-wrap gap-2 mt-2">
                {skillsArray.length > 0 ? (
                  skillsArray.map((skill, index) => (
                    <span key={index} className="badge badge-outline">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-400">No skills added</span>
                )}
              </div>

              <div className="card-actions justify-center mt-3 gap-2">
                <button
                  className="btn btn-primary"
                  disabled={loadingId === _id}
                  onClick={() => reviewRequest(_id, "rejected")}
                >
                  {loadingId === _id ? "Processing..." : "Reject"}
                </button>

                <button
                  className="btn btn-secondary"
                  disabled={loadingId === _id}
                  onClick={() => reviewRequest(_id, "accepted")}
                >
                  {loadingId === _id ? "Processing..." : "Accept"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
