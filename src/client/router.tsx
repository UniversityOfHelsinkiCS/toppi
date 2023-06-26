import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import ContractRequests from "./pages/ContractRequests";
import { getContractRequest, getContractRequests } from "./api";
import ContractRequestView from "./pages/ContractRequestView";

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
]);

const Router = () => <RouterProvider router={router} />

export default Router
