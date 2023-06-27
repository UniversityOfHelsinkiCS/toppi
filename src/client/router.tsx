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

const router = createBrowserRouter([

  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />
      },
    ]
  },

  {
    path: "/private",
    element: <Layout />,
    loader: login,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "contract-requests",
        element: <ContractRequests />,
        loader: getContractRequests,
        children: [
          {
            path: ":id",
            element: <ContractRequestView />,
            loader: getContractRequest,
          }
        ]
      }
    ]
  }
], { basename: BASE_PATH });

const Router = () => <RouterProvider router={router} />

export default Router
