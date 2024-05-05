import { Outlet, createBrowserRouter } from "react-router-dom";
import { Navbar } from "../Components/NavBar/NavBar";
import { HomeScreen } from "../Components/HomeScreen/HomeScreen";
import { Signin } from "../Components/Signup/Signin";


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
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <h1>SignUp</h1>,
      },
    ],
  },
]);
