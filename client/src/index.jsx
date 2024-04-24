import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <SearchBooks />
      }, {
        path: 'saved', // Changed from '/saved' to 'saved' to make it relative to the parent path
        element: <SavedBooks />
      }
    ]
  }
]);

// Get the root container to render the React elements
const root = ReactDOM.createRoot(document.getElementById('root'));

// Use the RouterProvider to manage routing
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
