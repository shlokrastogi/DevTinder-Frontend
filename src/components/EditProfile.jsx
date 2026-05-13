import React from "react";
import { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const EditProfile = ({ user }) => {
  const userFromStore = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [skills, setSkills] = useState((user?.skills || []).join(", "));
  const [about, setAbout] = useState(user?.about || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleSave = async () => {
    setError("");
    setSuccess(false);

    try {
      const cleanedSkills = Array.isArray(skills)
        ? skills
        : skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);

      const res = await axios.patch(
        `${BASE_URL}/profile/update`,
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          skills: cleanedSkills,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(addUser(res.data.user));

      setSuccess(true);

      {
        success && <p className="text-green-500">Profile updated!</p>;
      }
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message ||
          "An error occurred while saving profile.",
      );
    }
  };

  useEffect(() => {
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setPhotoUrl(user?.photoUrl || "");
    setAge(user?.age || "");
    setGender(user?.gender || "");
    setSkills((user?.skills || []).join(", "));
    setAbout(user?.about || "");
  }, [user]);

  return (
    <div className="flex items-center space-x-6 justify-center m-4">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend font-bold text-lg">
          Edit Profile
        </legend>

        <label className="label">First Name</label>

        <input
          type="text"
          className="input"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label className="label">Last Name</label>

        <input
          type="text"
          className="input"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label className="label">PhotoUrl</label>
        <input
          type="text"
          className="input"
          placeholder="Photo URL"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />

        <label className="label">Age</label>

        <input
          type="number"
          className="input"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <label className="label">Gender</label>

        <select
          className="select"
          value={gender || ""}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label className="label">Skills</label>

        <textarea
          className="textarea"
          placeholder="e.g. React, Node, MongoDB"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <label className="label">About</label>

        <textarea
          className="textarea"
          placeholder="About you"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        ></textarea>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && (
          <p className="text-green-500 mt-2">Profile updated successfully!</p>
        )}

        <button className="btn btn-primary mt-4" onClick={handleSave}>
          Save Changes
        </button>
      </fieldset>

      <UserCard user={userFromStore} />
    </div>
  );
};

export default EditProfile;
