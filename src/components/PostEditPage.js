import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import { useHistory, useParams } from "react-router-dom";
import PostManipulation from "./PostManipulation/PostManipulation";

export default function PostEditPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [content, setContent] = useState("");
  const [isSaveButtonDisabled, setSaveButtonDisable] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const request = axios.get(`http://localhost:5000/posts/${postId}`);
    request.then(({ data }) => {
      const post = data;
      setPost(post);
      setTitle(post.title);
      setCoverUrl(post.coverUrl);
      setContent(post.content);
    });
  }, [postId]);

  function onPostSaveButtonClick() {
    setSaveButtonDisable(true);
    const body = {
      coverUrl,
      title,
      content,
    };
    const request = axios.put(`http://localhost:5000/posts/${postId}`, body);
    request.then(({ data }) => history.push("/"));
    request.finally(() => setSaveButtonDisable(false));
  }

  if (!post || !content) return <Spinner />;

  return (
    <PostManipulation
      title={title}
      onTitleChange={(newTitle) => setTitle(newTitle)}
      coverUrl={coverUrl}
      onCoverUrlChange={(newCoverUrl) => setCoverUrl(newCoverUrl)}
      content={content}
      onContentChange={(newContent) => setContent(newContent)}
      onPostSaveButtonClick={onPostSaveButtonClick}
      postId={postId}
    />
  );
}
