import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Auth0Provider } from "@auth0/auth0-react"
import App from "./App.jsx"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH_DOMAIN}
        clientId={import.meta.env.VITE_AUTH_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <App />
      </Auth0Provider>
    </ThemeProvider>
  </React.StrictMode>
)
