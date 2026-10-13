import Layout from "../layouts/rootLayout/Layout";

import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import SlidePage from "../Pages/slidePage";
import MyLists from "../Pages/My-Lists";
import BrowseRoutes from "./Browse/Browse.-Route";
import ProfilePage from "../Pages/Profile-Page";

const routes = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/slide/:id",
        element: <SlidePage />,
      },
      {
        path: "/mylists",
        element: <MyLists />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      BrowseRoutes,
    ],
  },
];

export default routes;
