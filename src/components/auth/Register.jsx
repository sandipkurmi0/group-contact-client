import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Typography,
  styled,
  Button,
} from "@mui/material";
import { registerUser } from "../../service/api";
import Swal from "sweetalert2";

const Container = styled(FormGroup)`
  width: 25%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 20px;
  }
`;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const handleRegister = async () => {
    const data = {
      name,
      email,
      password,
    };
    const responseRegister = await registerUser(data);
    if (responseRegister.status === 201) {
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
        title: "Register in successfully",
      });
      navigate("/login");
    }
    setName("");
    setEmail("");
    setPassword("");
  };
  return (
    <Container>
      <Typography variant="h4"> Register</Typography>
      <FormControl>
        <InputLabel>Name</InputLabel>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
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
      <Button onClick={handleRegister} variant="outlined" type="button">
        register
      </Button>
    </Container>
  );
};

export default Register;
