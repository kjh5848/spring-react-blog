import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

function Header(props) {

  const isLogin = useSelector((state) => state.isLogin)
  const dispatch = useDispatch()

  function submitLogout(){
    localStorage.removeItem("jwt")
    dispatch(logout())
  }

  return (
    <div>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Link to="/" className="navbar-brand">
          블로그홈
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {isLogin ? 
              <>         
              <Link to="/saveForm" className="nav-link">
              글쓰기
              </Link>
              <Link className="nav-link" onClick={submitLogout}>로그아웃</Link>   
              </>
             : 
              <>
              <Link to="/loginForm" className="nav-link">
              로그인
              </Link>
              <Link to="/joinForm" className="nav-link">
                회원가입
              </Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br />
    </div>
  );
}

export default Header;
