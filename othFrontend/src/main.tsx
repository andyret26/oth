import ReactDOM from "react-dom/client"
import "./index.css"

import { Auth0Provider } from "@auth0/auth0-react"
import App from "./App.jsx"
import { BrowserRouter } from "react-router-dom"
import NavBar from "./components/navBar/NavBar.js"
import { Toaster } from "react-hot-toast"

if (window.location.hash.startsWith("#/")) {
  window.history.replaceState(null, "", window.location.hash.slice(1))
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH_DOMAIN}
    clientId={import.meta.env.VITE_AUTH_CLIENT_ID}
    cacheLocation="localstorage"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >

    <BrowserRouter>
      <Toaster position="bottom-center" />
      <NavBar />
      <App />
    </BrowserRouter>
    

    <div className="branch">{__APP_VERSION__}</div>
  </Auth0Provider>
)
