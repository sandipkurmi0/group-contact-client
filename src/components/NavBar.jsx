import React, { useEffect } from "react";
import { AppBar, Toolbar, styled } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Header = styled(AppBar)`
  background: #111111;
`;

const Tabs = styled(NavLink)`
  font-size: 20px;
  margin-right: 20px;
  color: inherit;
  text-decoration: none;
`;
const NavBar = () => {
  const navigate = useNavigate();

  const auth = localStorage.getItem("user");

  useEffect(() => {
    Swal.fire({
      position: "bootom",
      icon: "success",
      title: "You have successfully logged out!",
      showConfirmButton: false,
      timer: 2000,
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/register");
  };

  return (
    <Header position="static">
      <Toolbar>
        {auth ? (
          <span>
            <Tabs to="/">Test crud</Tabs>
            <Tabs to="/allGroupList">Group List</Tabs>
            <Tabs to="/addGroupList">Add Group List</Tabs>
            <Tabs
              to="/register"
              onClick={handleLogout}
              style={{ marginLeft: "1200px" }}
            >
              Logout
            </Tabs>
          </span>
        ) : (
          <span style={{ margin: "auto" }}>
            <Tabs to="/login">Login</Tabs>
            <Tabs to="/register">Register</Tabs>
          </span>
        )}
      </Toolbar>
    </Header>
  );
};

export default NavBar;
