import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import PostItem from "../../components/BoardItem";

const Home = () => {
  const [page, setPage] = useState(0);

  const [model, setModel] = useState({
    totalPage: undefined,
    number: undefined,
    isFirst: true,
    isLast: false,
    boards: [],
  });

  // http://localhost:8080 -> http://localhost:8080?page=0
  // 실행시점 : 최초 렌더링
  // 변경 : page가 바뀌면 useEffect 실행되게 할 예정
  useEffect(() => {
    console.log("useEffect 실행");
    apiHome();
  }, [page]);

  async function apiHome() {
    let response = await axios({
      url: "http://localhost:8080?page=" + page,
      method: "get",
    });

    console.log("page", response.data.body);

    setModel(response.data.body);
  }

  function prev() {
    setPage(page - 1);
  }
  function next() {
    console.log("next click");
    setPage(page + 1);
  }

  return (
    <div>
      {model.boards.map((board) => (
        <PostItem key={board.id} id={board.id} title={board.title} />
      ))}

      <br />
      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Item onClick={prev} disabled={model.isFirst}>
            Prev
          </Pagination.Item>

          <Pagination.Item onClick={next} disabled={model.isLast}>
            Next
          </Pagination.Item>
        </Pagination>
      </div>
    </div>
  );
};

export default Home;