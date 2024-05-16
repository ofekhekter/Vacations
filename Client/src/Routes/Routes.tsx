import { Outlet, createBrowserRouter } from "react-router-dom";
import { Navbar } from "../Components/NavBar/NavBar";
import { HomeScreen } from "../Components/HomeScreen/HomeScreen";
import { RegisterPage } from "../Components/Signup/RegisterPage";
import { LoginPage } from "../Components/Signup/LoginPage";
import { VacationCard } from "../Components/VacationCard/VacationCard";
import StandardImageList from "../Components/Layout/StandardImageList";


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
        element: <StandardImageList />,
      },
      {
        path: "/userPage",
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
      {
        path: "/addvacation",
        element: <VacationCard isEditable={false}/>,
      },
    ],
  },
]);
