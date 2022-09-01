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
import { addContactDetails } from "../../service/api";
import { useNavigate, useParams, Link } from "react-router-dom";

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 20px;
  }
`;

const AddContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");

  const addContact = async () => {
    const data = {
      name,
      email,
      phone,
      status,
      groupId: id,
    };

    const responseAddContact = await addContactDetails(data);
    if (responseAddContact.status === 201) {
      navigate(`/contact/${id}`);
    }
  };

  return (
    <>
      <span
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Typography variant="h4"> Add Contact </Typography>
      </span>
      <div
        style={{ display: "flex", justifyContent: "end", marginRight: "100px" }}
      >
        <Button variant="outlined" component={Link} to={`/contact/${id}`}>
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
          <Button variant="contained" onClick={addContact}>
            Add Contact
          </Button>
        </FormControl>
      </Container>
    </>
  );
};

export default AddContact;
