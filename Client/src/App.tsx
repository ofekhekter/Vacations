import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Routes';
import { Provider } from 'react-redux';
import { store } from './store';
import './App.css';


export const App = () => {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}