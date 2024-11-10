import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Adminhome from "./pages/adminhome";
import Userhome from "./pages/userhome";


const router = createBrowserRouter([
  {
    path: "/", // Root path renders Home by default
    element: <Userhome/>,
  },
  {
    path: "home", // Root path renders Home by default
    element: <Adminhome />,
  },
  {
    path: "userhome",
    element: <Userhome />,
  },
  // {
  //   path: "service",
  //   element: <Service />,
  // },
  // {
  //   path: "about",
  //   element: <About />,
  // },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
