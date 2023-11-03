import axios from "axios"
import { TournamentPost } from "../helpers/interfaces"

const OTH_API_URL = "http://localhost:5110/api/v1"

export async function AddPlayerAsync(id: number): Promise<void> {
  const response1 = await axios.get(`${OTH_API_URL}/player/exists/${id}`)

  if (response1.data) {
    console.log("Player already exists")
    return
  }
  const response2 = await axios.post(`${OTH_API_URL}/player/${id}`)
  console.log(response2.data)
}

export async function AddTournamentAsync(
  tournament: TournamentPost
): Promise<void> {
  const response = await axios.post(`${OTH_API_URL}/tournament`, tournament)
  console.log(response.data)
}
