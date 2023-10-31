import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import NavBar from "./components/NavBar"
import History from "./pages/History"
import Landing from "./pages/Landing"
import CreateTournament from "./pages/CreateTournament"

function App() {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" Component={Landing} />
            <Route path="/history" Component={History} />
            <Route path="/CreateTournamet" Component={CreateTournament} />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </div>
  )
}

export default App
