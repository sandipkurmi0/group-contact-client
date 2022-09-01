import { useState } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Typography,
  styled,
  Button,
} from "@mui/material";
import { addGroup } from "../../service/api";
import { useNavigate } from "react-router-dom";
// import Papa from "papaparse";

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 20px;
  }
`;

const AddGroup = () => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);

  const csvArray = [...array];
  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }

    try {
      if (csvArray !== []) {
        const data = {
          groupName,
          csvArray,
        };

        await addGroup(data);
      }
    } catch (error) {
      console.log(error);
    }

    // navigate("/allGroupList");
  };

  // const headerKeys = Object.keys(Object.assign({}, ...array));

  return (
    <Container style={{ textAlign: "center" }}>
      <Typography variant="h4"> Add group</Typography>
      <FormControl>
        <InputLabel>Group Name</InputLabel>
        <Input type="text" onChange={(e) => setGroupName(e.target.value)} />
      </FormControl>
      <FormControl>
        <Input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />
      </FormControl>
      <FormControl>
        <Button
          variant="contained"
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          Add group
        </Button>
      </FormControl>
      <br />

      {/* <table>
        <thead>
          <tr key={"header"}>
            {headerKeys.map((key) => (
              <th>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {array.map((item) => (
            <tr key={item.id}>
              {Object.values(item).map((val) => (
                <td>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}
    </Container>
  );
};

export default AddGroup;
