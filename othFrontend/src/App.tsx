import { HashRouter, Route, Routes } from "react-router-dom"
import "./index.css"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { useAuth0 } from "@auth0/auth0-react"
import { Toaster } from "react-hot-toast"
import NavBar from "./components/navBar/NavBar"
import History from "./pages/History/History"
import Landing from "./pages/Landing"
import CreateTournament from "./pages/CreateTournament/CreateTournament"
import EditTournament from "./pages/EditTournament/EditTournament"
import Unauthorized from "./pages/Unauthorized"
import { PrivateRoute } from "./components/PrivateRoute"
import NotFound from "./pages/NotFound"
import AddPlayer from "./pages/AddPlayer/AddPlayer"
import Stats from "./pages/Stats/Stats"
import MatchCompare from "./pages/MatchCompare"
import QualStats from "./pages/QualStats"

function App() {
  const { isAuthenticated } = useAuth0()

  return (
    <div>
      <Toaster position="bottom-center" />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <HashRouter>
          <>
            <NavBar />
            <Routes>
              <Route path="/" Component={Landing} />
              <Route path="/history/:id" Component={History} />
              <Route path="/match-compare" Component={MatchCompare} />
              <Route path="/qual-stats" Component={QualStats} />
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
                  <Route
                    path="/player/:id/stats"
                    element={
                      <PrivateRoute>
                        <Stats />
                      </PrivateRoute>
                    }
                  />
                </>
              ) : null}
              <Route path="/unauthorized" Component={Unauthorized} />
              <Route path="*" Component={NotFound} />
            </Routes>
          </>
        </HashRouter>
      </LocalizationProvider>
    </div>
  )
}

export default App
