import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IPost } from "./company.model";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

const CompanyTable = () => {
  const [rows, setRows] = useState<IPost[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((response) => response.json())
      .then((json) => {
        setRows(json?.posts);
      });
  }, []);
  const columns: GridColDef[] = [
    { field: "id", headerName: "id", flex: 1 },
    {
      field: "userId",
      headerName: "userId",
      flex: 1,
    },
    {
      field: "body",
      headerName: "body",
      flex: 1,
    },
    {
      field: "title",
      headerName: "title",
      type: "number",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "actions",
      flex: 0.5,
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
              onClick={() => {
                // bazoume tin logiki, me to pou sbinoume mia eggrafi, na ksanaferoume ta dedomena mas etsi wste na min emfanizetai pia
                // sto sugkekrimeno paradeigma, epeidi einai demo, den mporei na diagrafei
                fetch(`https://dummyjson.com/posts/${cellValues?.row?.id}`, {
                  method: "DELETE",
                })
                  .then((res) => res.json())
                  .then(() => {
                    toast.error("deleted!");
                    fetch("https://dummyjson.com/posts")
                      .then((response) => response.json())
                      .then((json) => {
                        setRows(json?.posts);
                      });
                  });
              }}
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
        <IconButton color="primary" onClick={() => navigate(`/company/new`)}>
          <AddIcon />
        </IconButton>
      </div>
      <Box sx={{ height: 500, width: 900 }}>
        <DataGrid rows={rows ?? []} columns={columns} />
      </Box>
    </div>
  );
};

export default CompanyTable;
