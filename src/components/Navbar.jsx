import React from "react";
import { useSelector } from "react-redux";
const Navbar = () => {
  const user = useSelector((store) => store.user);

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">DevTinder</a>
      </div>

      <div className="flex items-center gap-3">
        {user && (
          <>
            <p className="text-white">Welcome, {user.firstName}!</p>

            <div className="w-10 rounded-full overflow-hidden">
              <img src={user.photoUrl} alt="User Avatar" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Navbar;
