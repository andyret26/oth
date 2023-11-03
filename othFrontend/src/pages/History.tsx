import { Button } from "@mui/material"
import { useAuth0 } from "@auth0/auth0-react"
import { GetTournamentsByPlayerIdAsync } from "../services/othApiService"

export default function History() {
  const { getIdTokenClaims } = useAuth0()

  async function handleClick() {
    const claims = await getIdTokenClaims()
    const osuId: string = claims!.sub.split("|")[2]
    const tournaments = await GetTournamentsByPlayerIdAsync(+osuId)
    console.log(tournaments[1].teamMates[0].username)
  }
  return (
    <div>
      <h1>History</h1>
      <Button onClick={() => handleClick()}>Get</Button>
    </div>
  )
}
