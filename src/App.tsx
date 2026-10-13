import { useRoutes } from "react-router-dom";
import routes from "./routes/Index";

const App = () => {
  return useRoutes(routes);
};

export default App;
