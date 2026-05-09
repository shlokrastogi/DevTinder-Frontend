import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about, skills } = user;

  return (
    <div className="card bg-base-300 w-72 shadow-xl hover:scale-105 transition-transform duration-300">
      <figure>
        <img className="" src={photoUrl} alt="User Avatar" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName || ""}
        </h2>

        <p>{about}</p>

        <p className="text-sm text-gray-500">
          {age ? age : "Age N/A"} • {gender ? gender : "Gender N/A"}
        </p>

        <div className="card-actions justify-center">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
