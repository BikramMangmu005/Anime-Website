import { BrowserRouter, useRoutes } from "react-router-dom";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Layout from "./layouts/rootLayout/Layout";

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
    ],
  },
];

const App = () => {
  const element = useRoutes(routes);

  return element;
};

export default App;
