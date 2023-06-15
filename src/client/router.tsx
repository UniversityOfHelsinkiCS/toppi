import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import ContractRequests from "./pages/ContractRequests";
import { getContractRequests } from "./api";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/contract-requests",
        element: <ContractRequests />,
        loader: getContractRequests,
      }
    ]
  },
]);

const Router = () => <RouterProvider router={router} />

export default Router
