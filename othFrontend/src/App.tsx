import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import NavBar from "./components/NavBar"
import History from "./pages/History"
import Landing from "./pages/Landing"

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" Component={Landing} />
          <Route path="/history" Component={History} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
