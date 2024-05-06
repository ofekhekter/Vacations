import { Outlet, createBrowserRouter } from "react-router-dom";
import { Navbar } from "../Components/NavBar/NavBar";
import { HomeScreen } from "../Components/HomeScreen/HomeScreen";
import { RegisterPage } from "../Components/Signup/RegisterPage";
import { LoginPage } from "../Components/Signup/LoginPage";


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
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <RegisterPage />,
      },
    ],
  },
]);
