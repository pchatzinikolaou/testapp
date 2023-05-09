import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import Home from "./pages/home/Home";
import Error from "./pages/error/Error";
import CompanyForm from "./pages/company/CompanyForm";
import CompanyTable from "./pages/company/CompanyTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeTable from "./pages/employee/EmployeeTable";
import EmployeeForm from "./pages/employee/EmployeeForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Root />
      </>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/company",
        element: <CompanyTable />,
      },
      {
        path: "/company/:id",
        element: <CompanyForm />,
      },
      {
        path: "/company/new",
        element: <CompanyForm />,
      },
      {
        path: "/employee",
        element: <EmployeeTable />,
      },
      {
        path: "/employee/:id",
        element: <EmployeeForm />,
      },
      {
        path: "/employee/new",
        element: <EmployeeForm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <RouterProvider router={router} />
    <ToastContainer />
  </>
);
