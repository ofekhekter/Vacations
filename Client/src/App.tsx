import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './Routes/Routes';


export const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}