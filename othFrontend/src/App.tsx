import { HashRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { useEffect, useState } from "react"
import { CircularProgress } from "@mui/material"
import { useAuth0 } from "@auth0/auth0-react"
import { Toaster } from "react-hot-toast"
import NavBar from "./components/NavBar"
import History from "./pages/History"
import Landing from "./pages/Landing"
import CreateTournament from "./pages/CreateTournament"
import EditTournament from "./pages/EditTournament"
import Unauthorized from "./pages/Unauthorized"
import { PrivateRoute } from "./components/PrivateRoute"
import NotFound from "./pages/NotFound"
import { PlayerMin } from "./helpers/interfaces"
import { GetPlayersMinAsync } from "./services/othApiService"
import AddPlayer from "./pages/AddPlayer"

function App() {
  const [isRunning, setIsRunnning] = useState<PlayerMin[] | null>(null)
  const { isAuthenticated } = useAuth0()
  useEffect(() => {
    GetPlayersMinAsync().then((res: PlayerMin[]) => {
      setIsRunnning(res)
    })
  }, [])

  return (
    <div>
      <Toaster position="bottom-center" />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <HashRouter>
          {isRunning === null ? (
            <>
              <CircularProgress />
              <p>Starting up server pls wait...</p>
              <p>If it takes to long, refresh page</p>
            </>
          ) : (
            <>
              <NavBar />
              <Routes>
                <Route path="/" Component={Landing} />
                <Route path="/history/:id" Component={History} />
                {isAuthenticated ? (
                  <>
                    <Route
                      path="/tournament/create"
                      element={
                        <PrivateRoute>
                          <CreateTournament />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/tournament/edit/:id"
                      element={
                        <PrivateRoute>
                          <EditTournament />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/player/add"
                      element={
                        <PrivateRoute>
                          <AddPlayer />
                        </PrivateRoute>
                      }
                    />
                  </>
                ) : null}
                <Route path="/unauthorized" Component={Unauthorized} />
                <Route path="*" Component={NotFound} />
              </Routes>
            </>
          )}
        </HashRouter>
      </LocalizationProvider>
    </div>
  )
}

export default App
