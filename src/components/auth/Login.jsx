import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../service/api";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Typography,
  styled,
  Button,
} from "@mui/material";
import Swal from "sweetalert2";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Container = styled(FormGroup)`
  width: 25%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 20px;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const handleLogin = async () => {
    const data = {
      email,
      password,
    };

    const loginResponse = await loginUser(data);
    if (loginResponse.status === 200) {
      localStorage.setItem("user", JSON.stringify(loginResponse.data.data));
      localStorage.setItem("token", JSON.stringify(loginResponse.data.token));

      const Toast = Swal.mixin({
        toast: true,
        position: "bootom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "You are successfully logged in",
      });

      navigate("/allGroupList");
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: "You are successfully logged in",
      });
    }
    setEmail("");
    setPassword("");
  };

  return (
    <Container>
      <Typography variant="h4"> Login</Typography>
      <FormControl>
        <InputLabel>Email Id</InputLabel>
        <Input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Password</InputLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <br />
      <Button onClick={handleLogin} variant="outlined" type="button">
        Login
      </Button>
    </Container>
  );
};

export default Login;
