import ReactDOM from "react-dom/client"
import "./index.css"

import { Auth0Provider } from "@auth0/auth0-react"
import App from "./App.jsx"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH_DOMAIN}
    clientId={import.meta.env.VITE_AUTH_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />

    <div className="branch">{__GIT_BRANCH__}</div>
  </Auth0Provider>
)
