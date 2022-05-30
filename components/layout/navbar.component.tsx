import React from "react";
import { ThemeChanger } from "../../components";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="text-xl normal-case btn btn-ghost">PodNoms Pages</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered"
          />
        </div>
      </div>
      <div className="flex-none gap-2">
        <ThemeChanger />
      </div>
    </div>
  );
};

export default Navbar;
