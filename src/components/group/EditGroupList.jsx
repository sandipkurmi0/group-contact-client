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
import { editGroupList, getGroupListById } from "../../service/api";
import { useNavigate, useParams, Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 20px;
  }
`;

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    loadGroupListDetails();
    return;
  }, []);

  const loadGroupListDetails = async () => {
    const response = await getGroupListById(id);
    if (response.status === 200) {
      setGroupName(response.data.data.groupName);
    }
  };

  const editGroupName = async () => {
    const data = {
      groupName,
    };
    const response = await editGroupList(id, data);
    if (response.status === 200) {
      navigate("/allGroupList");
    }
  };

  return (
    <>
      <span
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Typography variant="h4"> Edit Group Name</Typography>
      </span>
      <div
        style={{ display: "flex", justifyContent: "end", marginRight: "100px" }}
      >
        <Button variant="outlined" component={Link} to={`/allGroupList`}>
          <BsArrowLeft />
          Back
        </Button>
      </div>
      <Container>
        <FormControl>
          <InputLabel>Group Name</InputLabel>
          <Input
            type="text"
            onChange={(e) => setGroupName(e.target.value)}
            value={groupName}
          />
        </FormControl>
        <FormControl>
          <Button variant="contained" onClick={() => editGroupName()}>
            Edit Group Name
          </Button>
        </FormControl>
      </Container>
    </>
  );
};

export default EditUser;
