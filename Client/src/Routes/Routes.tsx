import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import { Navbar } from "../Components/NavBar/NavBar";
import { UserScreen } from "../Components/UserScreen/UserScreen";
import { RegisterPage } from "../Components/Signup/RegisterPage";
import { LoginPage } from "../Components/Signup/LoginPage";
import { HomePage } from "../Components/HomePage/HomePage";
import { VacationCard } from "../Components/VacationCard/VacationCard";
import NotFound from "../Components/404Page/NotFound";


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
        path: "/",
        element: <Navigate to="/home" replace />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/userpage",
        element: <UserScreen />,
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
        element: <VacationCard isEditable={false} />,
      },
      {
        path: "/editvacation'",
        element: <VacationCard isEditable={true} />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
