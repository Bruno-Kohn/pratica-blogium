import React, { useState, useEffect } from "react";
import PostList from "./PostList/PostList";
import axios from "axios";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/posts/${postId}/comments`);
    axios.then(({ infos }) => setPosts(infos));
  }, []);

  return <PostList name="Daily stories" posts={posts} />;
}
