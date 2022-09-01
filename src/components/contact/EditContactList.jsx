import { useState, useEffect } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Typography,
  styled,
  Button,
} from "@mui/material";
import { editContactDetails, getContactById } from "../../service/api";
import { useNavigate, useParams, Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 20px;
  }
`;

const EditContactList = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    getSingleContact();
  }, []);

  const getSingleContact = async () => {
    const responseGetContactById = await getContactById(id);

    if (responseGetContactById.status === 200) {
      const contactData = responseGetContactById.data.data;
      setName(contactData.name);
      setEmail(contactData.email);
      setPhone(contactData.phone);
      setStatus(contactData.status);
    }
  };

  const editContact = async () => {
    // console.log("edit contact");
    const data = {
      name,
      email,
      phone,
      status,
    };

    const responseEditContact = await editContactDetails(id, data);
    if (responseEditContact.status === 200) {
      const id = responseEditContact.data.data.groupId;
      navigate(`/contact/${id}`);
    }
  };

  return (
    <>
      <span
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Typography variant="h4"> Edit Contact </Typography>
      </span>
      <div
        style={{ display: "flex", justifyContent: "end", marginRight: "100px" }}
      >
        <Button variant="outlined" component={Link} to={`/contact/${id}`}>
          <BsArrowLeft />
          Back
        </Button>
      </div>
      <Container>
        <FormControl>
          <InputLabel>Name</InputLabel>
          <Input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </FormControl>
        <FormControl>
          <InputLabel>email</InputLabel>
          <Input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Phone</InputLabel>
          <Input
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Status</InputLabel>
          <Input
            type="text"
            onChange={(e) => setStatus(e.target.value)}
            value={status}
          />
        </FormControl>
        <FormControl>
          <Button variant="contained" onClick={editContact}>
            Edit Contact
          </Button>
        </FormControl>
      </Container>
    </>
  );
};

export default EditContactList;
