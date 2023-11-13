import { useAuth0 } from "@auth0/auth0-react"
import { Navigate, useLocation } from "react-router-dom"

interface RouteProps {
  children: React.ReactNode
}

export const PrivateRoute: React.FC<RouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth0()
  // Up to you specific app to decide how to get this value
  const isLoggedIn: boolean = isAuthenticated
  const location = useLocation()

  return isLoggedIn ? (
    <div>{children}</div>
  ) : (
    <Navigate
      replace
      to="/Unauthorized"
      state={{ from: `${location.pathname}${location.search}` }}
    />
  )
}
