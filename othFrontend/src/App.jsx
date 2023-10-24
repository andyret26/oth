import { Outlet } from 'react-router-dom';
import './App.css'
import NavBar from './components/NavBar';
import { useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react"

function App() {
  const {getAccessTokenSilently, getIdTokenClaims} = useAuth0();
  useEffect(()=>{
    axios.get(" https://osu.ppy.sh/api/get_user",{
        params: {
            "k": "osuApiKey",
            "u": "Andy26",
            "m": "0",
            "type": "string"
        }
    })
    .then(respone => {
        console.log(respone.data)
        // res.send(JSON.stringify(respone.data))
    })
    .catch(error => {
        console.log(error.response)
        // res.send(JSON.stringify(error.response))
    })

  }, [])

  return (
    <>
      <NavBar></NavBar>
      
      <Outlet />

    </>
  )
}

export default App
