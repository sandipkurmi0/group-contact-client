// import "./App.css";
import NavBar from "./components/NavBar";
import AllGroupList from "./components/group/AllGroupList";
import AddGroup from "./components/group/AddGroup";
import EditGroupList from "./components/group/EditGroupList";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import NotFound from "./components/NotFound";
import ContactListGroupBy from "./components/contact/ContactListGroupBy";
import EditContactList from "./components/contact/EditContactList";
import AddContact from "./components/contact/AddContact";
import PrivateComponent from "./components/PrivateComponent";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path="/" element={<Home />} />
          <Route path="/allGroupList" element={<AllGroupList />} />
          <Route path="/addGroupList" element={<AddGroup />} />
          <Route path="/edit/:id" element={<EditGroupList />} />

          <Route path="/contact/:id" element={<ContactListGroupBy />} />
          <Route path="/contact/add/:id" element={<AddContact />} />
          <Route path="/contact/edit/:id" element={<EditContactList />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
