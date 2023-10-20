import { Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react"

export default function History() {
  const {getIdTokenClaims} = useAuth0()

  async function handleClick() {
    const claims = await getIdTokenClaims()
    const token = claims.__raw
    const res = await  fetch("http://localhost:5110/api/Tournaments", {
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    console.log(await res.json())
  }
  return (
    <div>
      <h1>History</h1>
      <Button onClick={() => handleClick()}>Get</Button>
    </div>

  )
}
