import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const requestData = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addRequests(res.data.connectionRequests));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requestData) return;

  if (requestData.length === 0)
    return <h1 className="text-2xl font-bold mb-4">No Requests Found</h1>;

  return (
    <div className="p-4 min-h-screen flex items-center justify-center flex-col gap-4 flex-wrap">
      <h1 className="text-2xl font-bold mb-4">
        Your Requests ({requestData.length})
      </h1>
      {requestData.map((request) => {
        const {
          fromUserId: {
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
            skills,
          },
        } = request;

        const skillsArray = Array.isArray(skills) ? skills : [];

        return (
          <div
            key={request._id}
            className="flex flex-row flex-wrap gap-4 card card-side bg-base-300 shadow-sm"
          >
            <figure>
              <img
                className="w-48  object-cover"
                src={photoUrl || "https://via.placeholder.com/150?text=User"}
                alt="User Avatar"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {firstName} {lastName}
              </h2>
              <div className="flex flex-wrap gap-2 mt-2">
                <p className="opacity-70">Age: {age ? age : "N/A"}</p>
                <p className="opacity-70">Gender: {gender ? gender : "N/A"}</p>
              </div>
              <p>{about}</p>

              <div className="flex flex-wrap gap-2 mt-2">
                {skillsArray.length > 0 ? (
                  skillsArray.map((skills) => (
                    <span key={skills} className="badge badge-outline">
                      {skills}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-400">No skills added</span>
                )}
              </div>

              <div className="card-actions justify-center mt-3">
                <button className="btn btn-primary">Reject</button>
                <button className="btn btn-secondary">Accept</button>
              </div>

              <div className="card-actions justify-end"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
