import React from "react";

const Newpost = ({
  handleSubmit,
  postBody,
  postTitle,
  setpostBody,
  setpostTitle,
}) => {
  return (
    <main>
      <form onSubmit={handleSubmit} className="newPostForm">
        <h2>New Post</h2>

        <label htmlFor="postTitle">Title</label>
        <input
          id="postTitle"
          type="text"
          placeholder="Enter the title"
          required
          value={postTitle}
          onChange={(e) => setpostTitle(e.target.value)}
        />

        <label htmlFor="postBody">Post Body</label>
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setpostBody(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default Newpost;
