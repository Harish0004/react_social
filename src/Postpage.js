import React from "react";
import { Link, useParams } from "react-router-dom";

export const Postpage = ({ posts, handledelete }) => {
  const { id } = useParams();

  const post = posts.find((post) => post.id.toString() === id);

  return (
    <main className="Postpage">
      <article className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <button
              className="deleteButton"
              onClick={() => {
                handledelete(post.id);
              }}>
              Delete post
            </button>
            <Link to={`/edit/${post.id}`}>
              <button className="editbutton">Edit post</button>
            </Link>
          </>
        )}
        {!post && <h1>Refresh the page</h1>}
      </article>
    </main>
  );
};

export default Postpage;
