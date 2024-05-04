import { Outlet, createBrowserRouter } from "react-router-dom";
import { Navbar } from "../Components/NavBar/NavBar";
import { HomeScreen } from "../Components/HomeScreen/HomeScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: 
      <>
        <Navbar />
        <HomeScreen />
        <Outlet />
      </>
    ,
    children: [
      {
        path: "/home",
        element: <h1>Home</h1>,
      },
      {
        path: "/signIn",
        element: <h1>SignIn</h1>,
      },
      {
        path: "/signup",
        element: <h1>SignUp</h1>,
      },
    ],
  },
]);
