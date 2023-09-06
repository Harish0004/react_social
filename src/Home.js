import React from "react";
import Feed from "./Feed";

const Home = ({ posts }) => {
  return (
    <main className="Home">
      {posts.length ? <Feed posts={posts} /> : <h1>No post to display</h1>}
    </main>
  );
};

export default Home;
