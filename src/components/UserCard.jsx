import React from "react";

const UserCard = ({ user }) => {
  if (!user) return null;

  const { firstName, lastName, photoUrl, age, gender, about, skills } = user;

  // ✅ Safe image fallback
  const safePhoto =
    typeof photoUrl === "string" && photoUrl.trim() !== ""
      ? photoUrl
      : "https://img.icons8.com/fluent/1200/user-male-circle.jpg";

  // ✅ Ensure skills is always an array
  const skillsArray = Array.isArray(skills) ? skills : [];

  return (
    <div className="card bg-base-300 w-72 shadow-xl hover:scale-105 transition-transform duration-300">
      <figure>
        <img src={safePhoto} alt="User Avatar" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          {firstName || ""} {lastName || ""}
        </h2>

        <p className="text-sm text-gray-500">
          {age ? `Age: ${age}` : "Age N/A"} •{" "}
          {gender ? `Gender: ${gender}` : "Gender N/A"}
        </p>

        <p>{about || "No bio available"}</p>

        <div className="flex flex-wrap gap-2 mt-2">
          {skillsArray.length > 0 ? (
            skillsArray.map((skill) => (
              <span key={skill} className="badge badge-outline">
                {skill}
              </span>
            ))
          ) : (
            <span className="text-sm text-gray-400">No skills added</span>
          )}
        </div>

        <div className="card-actions justify-center mt-3">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
