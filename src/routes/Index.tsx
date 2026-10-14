import Layout from "../layouts/rootLayout/Layout";

import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import SlidePage from "../Pages/slidePage";
import MyLists from "../Pages/My-Lists";
import BrowseRoutes from "./Browse/Browse.-Route";
import ProfilePage from "../Pages/Profile-Page";
import WatchPage from "../Pages/Watch-Page";

import ProtectedRoute from "../components/Protected-Route";
import PublicRoute from "../components/Public-Route";

const routes = [
  {
    element: <Layout />,
    children: [
      // Home page
      {
        path: "/",
        element: <Home />,
      },

      // Routes for logged-out users
      {
        element: <PublicRoute />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },

      // Public anime pages
      {
        path: "/slide/:id",
        element: <SlidePage />,
      },

      // Anime watch page
      // Example: /watch/1?episode=1
      {
        path: "/watch/:id",
        element: <WatchPage />,
      },

      // Routes for logged-in users
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/mylists",
            element: <MyLists />,
          },
          {
            path: "/profile",
            element: <ProfilePage />,
          },
        ],
      },

      // Browse routes
      BrowseRoutes,
    ],
  },
];

export default routes;
