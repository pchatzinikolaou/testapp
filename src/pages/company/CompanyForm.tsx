import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@mui/material";
import MuiTextField from "../../components/MuiTextField";
import axios from "axios";
import { toast } from "react-toastify";

// create schema validation
const schema = yup.object({
  name: yup.string().required("name is required"),
  address: yup.string().required("address is required"),
  phone: yup.string().required("phone is required"),
});

const CompanyForm = () => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params && params?.id && Number(params?.id)) {
      axios
        .get(`http://localhost:8081/api/company/${params?.id}`)
        .then((response) => {
          reset(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      name: "",
      address: "",
      phone: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    if (!params?.id) {
      //an einai kainouria eggrafi, kanoume post
      fetch("http://localhost:8081/api/company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          navigate(`/company/${data?.id}`);
          toast.success("created!");
        });
    } else {
      // alliws update
      fetch(`http://localhost:8081/api/company/${params?.id}`, {
        method: "PUT" /* or PATCH */,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then(() => {
          toast.info("updated!");
        });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "column",
          }}
        >
          Company Form
        </h1>
        <br />
        <div
          style={{
            display: "flex",
            flex: "1/2",
            justifyContent: "center",
            alignItems: "column",
          }}
        >
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <MuiTextField
              errors={errors}
              control={control}
              name="name"
              label="Name"
              type={"string"}
            />
            <MuiTextField
              errors={errors}
              control={control}
              name="address"
              label="Address"
              type={"string"}
            />
            <MuiTextField
              errors={errors}
              control={control}
              name="phone"
              label="Phone"
              type={"string"}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Button
                color="error"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2, width: "200px" }}
                onClick={() => navigate(`/company`)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2, width: "200px" }}
              >
                {Number(params?.id) ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyForm;
