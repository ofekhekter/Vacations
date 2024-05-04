import { Outlet, createBrowserRouter } from "react-router-dom";
import { Navbar } from "../Components/NavBar/NavBar";
import { HomeScreen } from "../Components/HomeScreen/HomeScreen";
import { Signup } from "../Components/Signup/Signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: 
      <>
        <Navbar />
        <Outlet />
      </>
    ,
    children: [
      {
        path: "/home",
        element: <HomeScreen />,
      },
      {
        path: "/signin",
        element: <Signup />,
      },
      {
        path: "/signup",
        element: <h1>SignUp</h1>,
      },
    ],
  },
]);
