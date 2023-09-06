import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import Newpost from "./Newpost";
import Missing from "./Missing";
import "./index.css";
import Postpage from "./Postpage";
import About from "./About";
import Footer from "./Footer";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Post from "./Post";
import { format } from "date-fns";
import api from "./api/posts";
import Editpost from "./Editpost";

function App() {
  const [posts, setposts] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "mmmm dd, yyyy pp");
    const newpost = {
      id: id,
      title: postTitle,
      datetime: datetime,
      body: postBody,
    };
    const response = await api.post("/posts", newpost);
    const allPost = [...posts, response.data];
    setposts(allPost);
    setPostBody("");
    setPosttitle("");
    navigate("/");
  };

  const handledelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const filter = posts.filter((post) => post.id !== id);
      setposts(filter);
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const [searchresult, setsearchresult] = useState([]);
  const [search, setsearch] = useState("");
  const navigate = useNavigate();
  const [postTitle, setPosttitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "mmmm dd, yyyy pp");
    const updatepost = {
      id: id,
      title: editTitle,
      datetime: datetime,
      body: editBody,
    };
    try {
      const response = await api.put(`/posts/${id}`, updatepost);
      setposts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        setposts(response.data);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.headers);
          console.log(err.response.status);
        } else {
          console.log(`error: ${err.message}`);
        }
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const filtererdPost = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    );
    setsearchresult(filtererdPost.reverse());
  }, [posts, search]);

  return (
    <div className="App">
      <Header title={"social media"} />
      <Nav search={search} setsearch={setsearch} />

      <Routes>
        <Route path="/" element={<Home posts={searchresult} />} />
        <Route path="post">
          <Route
            index
            element={
              <Newpost
                postTitle={postTitle}
                postBody={postBody}
                setpostBody={setPostBody}
                setpostTitle={setPosttitle}
                handleSubmit={handleSubmit}
              />
            }
          />

          <Route
            path="/post/:id"
            element={<Postpage posts={posts} handledelete={handledelete} />}
          />
        </Route>
        <Route
          path="/edit/:id"
          element={
            <Editpost
              posts={posts}
              setEditBody={setEditBody}
              setEditTitle={setEditTitle}
              editTitle={editTitle}
              editBody={editBody}
              handleEdit={handleEdit}
            />
          }
        />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
