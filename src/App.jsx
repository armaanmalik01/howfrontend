import './App.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";


// pages 

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from './pages/Dashboard';
import Order from "./pages/Order";
import Wallet from "./pages/Wallet";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import { ConfigProvider } from 'antd';
import ForgatePassword from './pages/ForgetPasswor';
import Team from "./pages/Team";
import Invite from './pages/Invite';
import Gift from './pages/Gift';
import NotFound from "./pages/NotFound";


import dashboard from "./loader/dashboard.js";
import product from "./loader/product.js";
import profile from "./loader/profile.js";
import wallet from "./loader/wallet.js";
import order from "./loader/order.js";
import team from "./loader/team.js";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: "register",
    element: <Register />
  },
  {
    path: "forget",
    element: <ForgatePassword />
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        element: <Home />,
        index: true,
        loader:dashboard
      },
      {
        path: "profile",
        element: <Profile />,
        loader:profile
      },
      {
        path: "product",
        element: <Product />,
        loader:product
      },
      {
        path: "orders",
        element: <Order />,
        loader: order
      },
      {
        path: "wallet",
        element: <Wallet />,
        loader : wallet
      },
      {
        path: "team",
        element: <Team />,
        loader : team
      },
      {
        path: "invite",
        element: <Invite />
      },
      {
        path: "gift",
        element: <Gift />
      }

    ]
  },
  {
    path:"*",
    element:<NotFound />
  }
])

function App() {

  return (

    <RouterProvider router={router} />
  )
}

export default App
