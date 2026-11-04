import ReactDOM from "react-dom/client"
import "./index.css"

import { Auth0Provider } from "@auth0/auth0-react"
import App from "./App.jsx"

if (window.location.hash.startsWith("#/")) {
  window.history.replaceState(null, "", window.location.hash.slice(1))
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH_DOMAIN}
    clientId={import.meta.env.VITE_AUTH_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />

    <div className="branch">{__APP_VERSION__}</div>
  </Auth0Provider>
)
