import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import ContractRequests from './pages/ContractRequests'
import { getContractRequest, getContractRequests, getHandlerAddressesLoader, loginLoader, updateStatusAction } from './api'
import ContractRequestView from './pages/ContractRequestView'
import { BASE_PATH } from '../config'
import { Error } from './Error'
import HandlerAddressess from './pages/HandlerAddresses'
import Admin from './pages/Admin'

const router = createBrowserRouter(
  [
    {
      path: '/',
      id: 'publicRoot',
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          path: '',
          element: <Home />,
          errorElement: <Error />,
        },
      ],
    },

    {
      path: '/private',
      id: 'privateRoot',
      element: <Layout />,
      loader: loginLoader,
      errorElement: <Error />,
      children: [
        {
          path: '',
          element: <Home />,
          errorElement: <Error />,
        },
        {
          path: 'contract-requests',
          element: <ContractRequests />,
          loader: getContractRequests,
          errorElement: <Error />,
          children: [
            {
              path: ':id',
              element: <ContractRequestView />,
              loader: getContractRequest,
              action: updateStatusAction,
              errorElement: <Error />,
            },
          ],
        },
        {
          path: 'handler-addresses',
          element: <HandlerAddressess />,
          loader: getHandlerAddressesLoader,
        },
        {
          path: 'admin',
          element: <Admin />,
        },
      ],
    },
  ],
  { basename: BASE_PATH }
)

const Router = () => <RouterProvider router={router} />

export default Router
