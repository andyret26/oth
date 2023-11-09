import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import NavBar from "./components/NavBar"
import History from "./pages/History"
import Landing from "./pages/Landing"
import CreateTournament from "./pages/CreateTournament"
import EditTournament from "./pages/EditTournament"

function App() {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" Component={Landing} />
            <Route path="/history/:id" Component={History} />
            <Route path="/tournament/create" Component={CreateTournament} />
            <Route path="/tournament/edit/:id" Component={EditTournament} />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </div>
  )
}

export default App
