import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import History from './pages/History.jsx'
import { Auth0Provider } from '@auth0/auth0-react';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "history",
        element: <History />
      }
    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Auth0Provider
        domain={import.meta.env.VITE_AUTH_DOMAIN}
        clientId={import.meta.env.VITE_AUTH_CLIENT_ID}
        authorizationParams= {{
          redirect_uri: window.location.origin
        }}
        >
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
        </Auth0Provider>
      </ThemeProvider>
    </React.StrictMode>
)
