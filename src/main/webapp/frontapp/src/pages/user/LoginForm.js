import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from './../../store';


const LoginForm = (props) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLogin = useSelector((state) => state.isLogin)
    const jwt = useSelector((state) => state.jwt)
    console.log("스토어 로그인은?", isLogin)
    console.log("스토어 jwt?", jwt)

	const [user, setUser] = useState({
		username: '',
		password: ''
	});

	async function submitLogin(error) {
        error.preventDefault();
        // 유효성 검사
        try {
            let response =await axios({
            url: "http://localhost:8080/login",
            method: "post",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
            //fatch일때는 data 제이슨 파싱이 필요하다.
            data: user,
          });
          
          //헤더에서 authorization이 어떻게 들어가 있는지 확인하고 토큰을 받는다.
          console.log(response.headers.authorization)
          let jwt = response.headers.authorization

          //typeof 타입을 확인할 수 있다. -> string
          console.log(typeof jwt)

          //토큰을 로컬스토리지에 저장을 한다. I/O 발생. 동기적으로 실행되어야한다.
          // 오래 걸려도 동기적으로 실행을 해야하는게 있다.
          // 비동기로 localStroge에 저장을 하면 그 다음 상태변경도 실행이 되고 나서 I/O에서 오류가 날 수도 있기 때문이다.
          localStorage.setItem("jwt", jwt)

          //로그인이 상태를 변경한다.
          dispatch(login(jwt))
          navigate("/")
        
        } catch (error) {
          alert(error.response.data.msg);
        }
      }

	const changeValue = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		});
	}

	return (
		<Form>
			<Form.Group>
				<Form.Label>Username</Form.Label>
				<Form.Control type="text" placeholder="Enter username" name="username" onChange={changeValue} />
			</Form.Group>

			<Form.Group>
				<Form.Label>Password</Form.Label>
				<Form.Control type="password" placeholder="Enter password" name="password" onChange={changeValue} />
			</Form.Group>
			<Button variant="primary" type="submit" onClick={submitLogin}>
				로그인
  			</Button>
		</Form>
	);
};

export default LoginForm;