import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const Detail = (props) => {
    
  const { id } = useParams();

  const [post, setPost] = useState({
    id: undefined,
    title: "",
    content: "",
    userId: undefined,
    username: "",
    owner: false,
    replies: [],
  });

  useEffect(() => {
    console.log("postId", id);
    fetchDetail(id);
  }, []);

  async function fetchDetail(postId) {
    let response = await axios({
      url: `http://localhost:8080/api/boards/${postId}/detail`,
    });
    let responseBody = response.data;

    setPost(responseBody.body);
  }

  function fetchDelete(postId) {}

  return (
    <div>
      <Link to={"/updateForm/1"} className="btn btn-warning">
        수정
      </Link>
      <Button className="btn btn-danger" onClick={() => fetchDelete(post.id)}>
        삭제
      </Button>

      <br />
      <br />
      <h1>{post.title}</h1>
      <hr />
      <div>{post.content}</div>
    </div>
  );
};

export default Detail;