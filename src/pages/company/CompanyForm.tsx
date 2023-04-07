import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import MuiTextField from "../../components/MuiTextField";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

// create schema validation
const schema = yup.object({
  id: yup.string().required("id is required"),
  userId: yup.string().required("id is required"),
  title: yup.string().required("title is required"),
});

const CompanyForm = () => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params && params?.id) {
      axios
        .get(`https://dummyjson.com/posts/${params?.id}`)
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
      id: "",
      userId: "",
      title: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    if (!params?.id) {
      //an einai kainouria eggrafi, kanoume post
      fetch("https://dummyjson.com/posts/add", {
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
      fetch(`https://dummyjson.com/posts/${params?.id}`, {
        method: "PUT" /* or PATCH */,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then(() => {
          console.log("test");
          toast.info("updated!");
        });
    }
  };

  return (
    <div>
      <h1>Company Form</h1>
      <Box
        sx={{
          width: "200px",
        }}
      >
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <MuiTextField
            errors={errors}
            control={control}
            name="id"
            label="ID"
          />
          <MuiTextField
            errors={errors}
            control={control}
            name="userId"
            label="USER ID"
          />
          <MuiTextField
            errors={errors}
            control={control}
            name="title"
            label="TITLE"
          />
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default CompanyForm;
