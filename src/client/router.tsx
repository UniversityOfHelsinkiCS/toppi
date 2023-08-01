import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import ContractRequests from "./pages/ContractRequests";
import { getContractRequest, getContractRequests, getHandlerAddresses, login, postHandlerAddress, updateStatusAction } from "./api";
import ContractRequestView from "./pages/ContractRequestView";
import { BASE_PATH } from "../config";
import { Error } from "./Error";
import HandlerAddressess from "./pages/HandlerAddresses";

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
            action: updateStatusAction,
            errorElement: <Error />,
          }
        ]
      },
      {
        path: "handler-addresses",
        element: <HandlerAddressess />,
        loader: getHandlerAddresses,
      }
    ]
  }
], { basename: BASE_PATH });

const Router = () => <RouterProvider router={router} />

export default Router
