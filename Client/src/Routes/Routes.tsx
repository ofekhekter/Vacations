import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import { Navbar } from "../Components/NavBar/NavBar";
import { UserScreen } from "../Components/UserScreen/UserScreen";
import { RegisterPage } from "../Components/Signup/RegisterPage";
import { LoginPage } from "../Components/Signup/LoginPage";
import { VacationCard } from "../Components/VacationCard/VacationCard";
import NotFound from "../Components/404Page/NotFound";
import PrivateRoute from "./PrivateRoute";


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
        element: <LoginPage />,
      },
      {
        path: "/userpage",
        element: (
          <PrivateRoute>
            <UserScreen />
          </PrivateRoute>
        ),
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
        element: (
          <PrivateRoute>
            <VacationCard isEditMode={false} />
          </PrivateRoute>),
      },
      {
        path: "/editvacation",
        element: (
          <PrivateRoute>
            <VacationCard isEditMode={true} />
          </PrivateRoute>),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
