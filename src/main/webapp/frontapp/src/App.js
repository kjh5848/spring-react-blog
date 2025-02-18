import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from './pages/board/Home';
import SaveForm from './pages/board/SaveForm';
import Detail from './pages/board/Detail';
import LoginForm from './pages/user/LoginForm';
import JoinForm from './pages/user/JoinForm';
import UpdateForm from './pages/board/UpdateForm';
import { Container } from "react-bootstrap";

function App() {
  
  return (
    <div>
      <Header />
      <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saveForm" element={<SaveForm />} />
        <Route path="/board/:id" element={<Detail />} />
        <Route path="/loginForm" element={<LoginForm />} />
        <Route path="/joinForm" element={<JoinForm />} />
        <Route path="/updateForm/:id" element={<UpdateForm />} />
      </Routes>
      </Container>
    </div>
  );
}
export default App;