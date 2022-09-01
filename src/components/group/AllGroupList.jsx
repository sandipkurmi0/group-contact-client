import { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  styled,
  Button,
  Typography,
} from "@mui/material";
import { deleteContactByGroup, getGroupListName } from "../../service/api";
import { MdVisibility } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const StyledTable = styled(Table)`
  width: 90%;
  margin: 50px 0 0 50px;
`;

const THead = styled(TableRow)`
  & > th {
    font-size: 20px;
    background: #000000;
    color: #ffffff;
  }
`;

const TRow = styled(TableRow)`
  & > td {
    font-size: 18px;
  }
`;

const AllUser = () => {
  const [groupNameArray, setGroupNameArray] = useState([]);

  const getAllGroupListName = async () => {
    const response = await getGroupListName();
    console.log(response);
    if (response.status === 200) {
      setGroupNameArray(response.data.data);
    }
  };

  useEffect(() => {
    getAllGroupListName();
  }, []);

  const deleteGroupListDetails = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteContactByGroup(id);
        console.log(response);
        if (response.status === 200) {
          getAllGroupListName();
        }
        Swal.fire("Deleted!", "Your Record has been deleted.", "success");
      }
    });
  };

  return (
    <>
      {" "}
      <span
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Typography variant="h4"> Group List</Typography>
      </span>
      <StyledTable>
        <TableHead>
          <THead>
            <TableCell>Id</TableCell>
            <TableCell>Group name</TableCell>
            <TableCell>Total contacts</TableCell>
            <TableCell>Total pending</TableCell>
            <TableCell>Total paid</TableCell>
            <TableCell>Total approved </TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
            <TableCell>See Contact</TableCell>
          </THead>
        </TableHead>
        <TableBody>
          {groupNameArray.map((item, index) => (
            <TRow key={item._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.groupName}</TableCell>
              <TableCell>100</TableCell>
              <TableCell>70</TableCell>
              <TableCell>30</TableCell>
              <TableCell>20</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  component={Link}
                  to={`/edit/${item._id}`}
                >
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteGroupListDetails(item._id)}
                >
                  Delete
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to={`/contact/${item._id}`}
                >
                  <MdVisibility />
                </Button>
              </TableCell>
            </TRow>
          ))}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default AllUser;
