import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import ContractRequests from "./pages/ContractRequests";
import { getContractRequest, getContractRequests, login } from "./api";
import ContractRequestView from "./pages/ContractRequestView";
import { BASE_PATH } from "../config";
import { Error } from "./Error";

const router = createBrowserRouter([

  {
    path: "/",
    id: "publicRoot",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Home />
      },
    ]
  },

  {
    path: "/private",
    id: "privateRoot",
    element: <Layout />,
    loader: login,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "contract-requests",
        element: <ContractRequests />,
        loader: getContractRequests,
        errorElement: <Error />,
        children: [
          {
            path: ":id",
            element: <ContractRequestView />,
            loader: getContractRequest,
            errorElement: <Error />,
          }
        ]
      }
    ]
  }
], { basename: BASE_PATH });

const Router = () => <RouterProvider router={router} />

export default Router
