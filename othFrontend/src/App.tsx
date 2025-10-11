import { HashRouter, Route, Routes } from "react-router-dom"
import "./index.css"
import { useAuth0 } from "@auth0/auth0-react"
import { Toaster } from "react-hot-toast"
import NavBar from "./components/navBar/NavBar.tsx"
import History from "./pages/History/History.tsx"
import Landing from "./pages/Landing.tsx"
import CreateTournament from "./pages/CreateTournament/CreateTournament.tsx"
import EditTournament from "./pages/EditTournament/EditTournament.tsx"
import Unauthorized from "./pages/Unauthorized.tsx"
import { PrivateRoute } from "./components/PrivateRoute.tsx"
import NotFound from "./pages/NotFound.tsx"
import AddPlayer from "./pages/AddPlayer/AddPlayer.tsx"
import Stats from "./pages/Stats/Stats.tsx"
import MatchCompare from "./pages/MatchCompare/MatchCompare.tsx"
import QualStats from "./pages/QualStats.tsx"

function App() {
  const { isAuthenticated } = useAuth0()

  return (
    <div>
      <Toaster position="bottom-center" />
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
    </div>
  )
}

export default App
