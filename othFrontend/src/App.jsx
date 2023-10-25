import { Outlet } from 'react-router-dom';
import './App.css'
import NavBar from './components/NavBar';
import { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react"
import { getUserData } from './services/osuApiService';

function App() {
  const { getIdTokenClaims} = useAuth0();
  useEffect(()=>{

    getIdTokenClaims().then((claims)=>{
      const osuId = claims.sub.split('|')[2]
      getUserData(osuId)
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
