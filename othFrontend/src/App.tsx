import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { useEffect, useState } from "react"
import { CircularProgress } from "@mui/material"
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

function App() {
  const [isRunning, setIsRunnning] = useState<PlayerMin[] | null>(null)
  useEffect(() => {
    GetPlayersMinAsync().then((res: PlayerMin[]) => {
      setIsRunnning(res)
    })
  }, [])

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
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
                <Route path="/unauthorized" Component={Unauthorized} />
                <Route path="*" Component={NotFound} />
              </Routes>
            </>
          )}
        </BrowserRouter>
      </LocalizationProvider>
    </div>
  )
}

export default App
