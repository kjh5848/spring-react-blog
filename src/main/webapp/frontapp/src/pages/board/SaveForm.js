import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function SaveForm(props) {
    const navigate = useNavigate();
    const jwt = useSelector((state) => state.jwt);
    console.log("Token:", jwt);

    const [board, setBoard] = useState({
        title: "",
        content: "",
    });

    function changeValue(e) {
        setBoard({
            ...board,
            [e.target.name]: e.target.value,
        });
    }

    async function submitSave(e) {
        e.preventDefault();

        try {
            let response = await axios({
                url: "http://localhost:8080/api/boards",
                method: "post",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": jwt ? `Bearer ${jwt}` : ""
                },
                data: board,
            });

            console.log(response);

            if (response && response.data) {
                navigate("/loginForm");
            } else {
                console.error("Unexpected response format:", response);
                alert("Unexpected response format");
            }
        } catch (e) {
            console.log(e);

            if (e.response && e.response.data && e.response.data.msg) {
                alert(e.response.data.msg);
            } else {
                alert("An error occurred");
            }
        }
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <Form>
                        <Form.Group>
                            <Form.Label>제목</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                name="title"
                                onChange={changeValue}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>내용</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Enter content"
                                name="content"
                                onChange={changeValue}
                            />
                        </Form.Group>
                        <Button onClick={submitSave} variant="primary" className="mt-3">
                            저장
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default SaveForm;
