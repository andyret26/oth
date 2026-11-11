import { useAuth0 } from "@auth0/auth0-react"
import { Navigate, useLocation } from "react-router-dom"

interface RouteProps {
  children: React.ReactNode
}

export const PrivateRoute: React.FC<RouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth0()
  const location = useLocation()

  console.log("Auth0 State:", { isAuthenticated, isLoading, user })

  if (isLoading) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate
      replace
      to="/Unauthorized"
      state={{ from: `${location.pathname}${location.search}` }}
    />
  }

  return <div>{children}</div>
}
