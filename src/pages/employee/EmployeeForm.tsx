import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, MenuItem } from "@mui/material";
import MuiTextField from "../../components/MuiTextField";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment/moment";
import MuiSelectField from "../../components/MuiSelectField";
import { ICompany } from "../company/Company.model";
import { IEmployee } from "./Employee.model";

// create schema validation
const schema = yup.object({
  name: yup.string().required("name is required"),
  surName: yup.string().required("surname is required"),
  email: yup.string().required("email is required"),
  startDate: yup.date().required("startDate is required"),
  vacationDays: yup.number().required("vacationDays is required"),
  salary: yup.number().required("salary is required"),
  employmentType: yup.string().required("employmentType is required"),
  employeeCompany: yup.string().required("company is required"),
});

const EmployeeForm = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [employeeCompanyList, setEmployeeCompanyList] = useState([]);

  const getAllClompanies = () => {
    axios
      .get("http://localhost:8081/api/company")
      .then((response) => {
        setEmployeeCompanyList(response?.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong, please try again later");
      });
  };

  useEffect(() => {
    if (params && params?.id && Number(params?.id)) {
      axios
        .get(`http://localhost:8081/api/employee/${params?.id}`)
        .then((response) => {
          reset({
            ...response.data,
            employeeCompany: response?.data?.employeeCompany?.id,
          });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Something went wrong, please try again later");
        });
    }
    getAllClompanies();
  }, []);

  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      name: "",
      surName: "",
      email: "",
      startDate: null,
      vacationDays: null,
      salary: null,
      employmentType: "",
      employeeCompany: null,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    const submitValues = {
      ...data,
      startDate: moment(data.startDate).startOf("day").add(3, "hours"),
      employeeCompany: employeeCompanyList?.find(
        (company: any) => company.id === Number(data?.employeeCompany)
      ),
    };

    if (!Number(params?.id)) {
      //an einai kainouria eggrafi, kanoume post
      fetch("http://localhost:8081/api/employee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitValues),
      })
        .then((res) => res.json())
        .then((data) => {
          navigate(`/employee/${data?.id}`);
          toast.success("created!");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Something went wrong, please try again later");
        });
    } else {
      // alliws update
      fetch(`http://localhost:8081/api/employee/${params?.id}`, {
        method: "PUT" /* or PATCH */,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitValues),
      })
        .then((res) => res.json())
        .then(() => {
          toast.info("updated!");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Something went wrong, please try again later");
        });
    }
  };

  const employmentTypeList = [
    { value: "pt", label: "Part Time" },
    { value: "ft", label: "Full Time" },
  ];

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
          Employee Form
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
              label="First Name"
              type={"string"}
            />
            <MuiTextField
              errors={errors}
              control={control}
              name="surName"
              label="Last Name"
              type={"string"}
            />
            <MuiTextField
              errors={errors}
              control={control}
              name="email"
              label="Email"
              type={"string"}
            />
            <MuiTextField
              errors={errors}
              control={control}
              name="startDate"
              label="Start Date"
              type={"date"}
            />
            <MuiTextField
              errors={errors}
              control={control}
              name="vacationDays"
              label="Vacation Days"
              type={"number"}
            />
            <MuiTextField
              errors={errors}
              control={control}
              name="salary"
              label="Salary"
              type={"number"}
            />
            <MuiSelectField
              errors={errors}
              control={control}
              name="employmentType"
              label="Employment Type"
            >
              {employmentTypeList?.map((item) => {
                return <MenuItem value={item?.value}>{item?.label}</MenuItem>;
              })}
            </MuiSelectField>
            <MuiSelectField
              errors={errors}
              control={control}
              name="employeeCompany"
              label="Company"
            >
              {employeeCompanyList?.map((item: ICompany) => {
                return <MenuItem value={item?.id}>{item?.name}</MenuItem>;
              })}
            </MuiSelectField>
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
                onClick={() => navigate(`/employee`)}
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

export default EmployeeForm;
