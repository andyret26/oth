import axios from "axios"
import { OsuUserData, TournamentPost } from "../helpers/interfaces"

const OTH_API_URL = "http://localhost:5110/api/v1"

export async function AddPlayerAsync(player: OsuUserData): Promise<void> {
  const response = await axios.post(`${OTH_API_URL}/player`, player)
  console.log(response.data)
}

export async function AddTournamentAsync(
  tournament: TournamentPost
): Promise<void> {
  const response = await axios.post(`${OTH_API_URL}/tournament`, tournament)
  console.log(response.data)
}
