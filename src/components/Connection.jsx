import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connection = () => {
  const connectionData = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      console.log(res?.data?.data);
      dispatch(addConnections(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connectionData) return;

  if (connectionData.length === 0)
    return <h1 className="text-2xl font-bold mb-4">No Connections Found</h1>;

  return (
    <div className="p-4 min-h-screen flex items-center flex-col gap-4 flex-wrap">
      <h1 className="text-2xl font-bold mb-4">
        Your Connections ({connectionData.length})
      </h1>
      {connectionData.map((connection) => {
        const { firstName, lastName, photoUrl, age, gender, about, skills } =
          connection;

        const skillsArray = Array.isArray(skills) ? skills : [];

        return (
          <div
            key={connection._id}
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

              <div className="card-actions justify-end"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connection;
