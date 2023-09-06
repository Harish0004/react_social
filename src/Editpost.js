import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Editpost = ({
  posts,
  editBody,
  editTitle,
  setEditBody,
  setEditTitle,
  handleEdit,
}) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  useEffect(() => {
    if (post) {
      setEditBody(post.body);
      setEditTitle(post.title);
    }
  }, [posts, setEditBody, setEditTitle]);

  return (
    <main>
      {editTitle && (
        <>
          <h2 className="edit">Edit post</h2>

          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title: </label>
            <input
              type="text"
              id="postTitle"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Post:</label>
            <input
              type="text"
              id="postBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />

            <button type="submit" onClick={() => handleEdit(post.id)}>
              Edit post
            </button>
          </form>
        </>
      )}
    </main>
  );
};

export default Editpost;
