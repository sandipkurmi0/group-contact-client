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
import { getContactBygroup, deleteContact } from "../../service/api";
import { MdVisibility } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
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

const ContactListGroupBy = () => {
  const { id } = useParams();
  const [contactList, setContactList] = useState([]);

  const getAllContactGroupBy = async () => {
    const responseGetContactByGroup = await getContactBygroup(id);

    if (responseGetContactByGroup) {
      setContactList(responseGetContactByGroup.data.data);
    }
  };

  useEffect(() => {
    getAllContactGroupBy();
  }, []);

  const deleteContactDetail = (id) => {
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
        const responseDeleteContactDetail = await deleteContact(id);
        if (responseDeleteContactDetail.status === 200) {
          getAllContactGroupBy();
        }
        Swal.fire("Deleted!", "Your Record has been deleted.", "success");
      }
    });
  };

  return (
    <>
      <span
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Typography variant="h4"> Contact List</Typography>
      </span>
      <div
        style={{ display: "flex", justifyContent: "end", marginRight: "100px" }}
      >
        <Button variant="contained" component={Link} to={`/contact/add/${id}`}>
          Add Contact
        </Button>
      </div>
      <StyledTable>
        <TableHead>
          <THead>
            <TableCell>Id</TableCell>
            <TableCell> Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>phone</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </THead>
        </TableHead>
        <TableBody>
          {contactList.map((item, index) => (
            <TRow key={item._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  component={Link}
                  to={`/contact/edit/${item._id}`}
                >
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteContactDetail(item._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TRow>
          ))}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default ContactListGroupBy;
