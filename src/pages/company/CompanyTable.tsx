import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICompany } from "./Company.model";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import axios from "axios";
import { number, string } from "yup";

const CompanyTable = () => {
  const navigate = useNavigate();

  const [rows, setRows] = useState<ICompany[]>([]);

  const [searchValue, setSearchValue] = useState<string | number>("");

  useEffect(() => {
    getAllClompanies();
  }, []);

  const getAllClompanies = () => {
    axios
      .get("http://localhost:8081/api/company")
      .then((response) => {
        setRows(response?.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong, please try again later");
      });
  };

  const deleteAction = (cellValues?: Record<string, any>) => {
    // bazoume tin logiki, me to pou sbinoume mia eggrafi, na ksanaferoume ta dedomena mas etsi wste na min emfanizetai pia
    axios
      .delete(`http://localhost:8081/api/company/${cellValues?.row?.id}`)
      .then(() => {
        toast.error("company deleted!");
        getAllClompanies();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong, please try again later");
      });
  };

  const clearAction = () => {
    setSearchValue("");
    axios.get("http://localhost:8081/api/company").then((response) => {
      setRows(response?.data);
    });
  };

  const searchAction = () => {
    if (!!Number(searchValue)) {
      axios
        .get(`http://localhost:8081/api/company/${searchValue}`)
        .then((response) => {
          setRows([response?.data]);
        })
        .catch((error) => {
          console.log(error);
          setRows([]);
          toast.warning(`No company with ID: ${searchValue} found.`);
        });
    }
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "id",
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "name",
      flex: 2,
    },
    {
      field: "address",
      headerName: "address",
      flex: 2,
    },
    {
      field: "phone",
      headerName: "phone",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "actions",
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <>
            <IconButton
              color="primary"
              onClick={() => navigate(`/company/${cellValues?.row?.id}`)}
            >
              <ReadMoreIcon />
            </IconButton>
            <IconButton
              style={{
                color: "red",
              }}
              onClick={() => deleteAction(cellValues)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: 900,
        }}
      >
        <h1>Company List</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <IconButton color="primary" onClick={() => navigate(`/company/new`)}>
            <AddIcon />
          </IconButton>
        </div>
      </div>
      <Box sx={{ width: 900, border: 1, borderColor: "lightgrey" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" style={{ paddingLeft: 10, marginTop: 1 }}>
            Search by ID
          </Typography>
          <TextField
            sx={{ mt: 2, mb: 2 }}
            size="small"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value ?? "")}
          />
          <div
            style={{
              paddingRight: 15,
            }}
          >
            <Button
              variant="contained"
              color="info"
              sx={{ mt: 2, mb: 2, mr: 1 }}
              onClick={() => clearAction()}
              disabled={!Number(searchValue)}
            >
              clear
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{ mt: 2, mb: 2 }}
              onClick={() => searchAction()}
              disabled={!Number(searchValue)}
            >
              search
            </Button>
          </div>
        </div>
      </Box>
      <br />
      <Box sx={{ height: 500, width: 900 }}>
        <DataGrid rows={rows ?? []} columns={columns} />
      </Box>
    </div>
  );
};

export default CompanyTable;
