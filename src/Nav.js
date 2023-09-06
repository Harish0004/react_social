import React from "react";
import { Link } from "react-router-dom";

export const Nav = ({ search, setsearch }) => {
  return (
    <nav className="Nav">
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          id="search"
          placeholder="Search posts"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
      </form>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/post">Posts</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
