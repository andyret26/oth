import axios, { AxiosResponse, isAxiosError } from "axios"
import toast from "react-hot-toast"
import {
  TournamentPost,
  Tournament,
  PlayerMin,
  PlayerStats,
  MatchCompareRequest,
  MapV1,
} from "../helpers/interfaces"

let OTH_API_URL: string
if (process.env.NODE_ENV === "production") {
  OTH_API_URL = "https://osu-th-api.azurewebsites.net/api/v1"
} else {
  OTH_API_URL = "http://localhost:5110/api/v1"
}

// Create the instance and use the dynamic URL
const apiclient = axios.create({
  baseURL: OTH_API_URL,
})



export async function AddPlayerAsync(id: number, token: string): Promise<void> {
  try {
    await apiclient.post(`/player/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    })
    toast.success("Player added")
  } catch (err) {
    if (isAxiosError(err)) {
      if (err.response?.status === 409 || err.response?.status === 404) {
        toast.error(err.response.data)
      }
    }
    throw err
  }
}

export async function PlayerExists(id: number): Promise<boolean> {
  const res = await apiclient.get(`/player/exists/${id}`)
  return res.data
}

export async function AddPlayerByUsernameAsync(
  username: string,
  token: string
): Promise<void> {
  try {
    await apiclient.post(`/player/post-by-username/${username}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    })
    toast.success("Player added")
  } catch (err) {
    if (isAxiosError(err)) {
      if (err.response?.status === 409 || err.response?.status === 404) {
        toast.error(err.response.data)
      }
    }
    throw err
  }
}



// Get players
export async function GetPlayersMinAsync(): Promise<PlayerMin[]> {
  const response = await apiclient.get("/player/min")
  return response.data
}

export async function GetTournamentsByPlayerIdAsync(
  id: number
): Promise<Tournament[]> {
  const response = await apiclient.get(`/tournament/player/${id}`)
  return response.data
}

export async function GetPlayerStatsAsync(id: number): Promise<PlayerStats> {
  const response = await apiclient.get(`/player/stats/${id}`)
  return response.data
}

export async function AddTournamentAsync(
  tournament: TournamentPost,
  token: string
): Promise<void | AxiosResponse> {
  try {
    await apiclient.post(`/tournament`, tournament, {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response
    }
  }
}

export async function GetTournamentById(id: number): Promise<Tournament> {
  const response = await apiclient.get(`/tournament/${id}`)
  return response.data
}

export async function UpdateTournament(
  tournament: TournamentPost,
  token: string
): Promise<void | AxiosResponse> {
  try {
    await apiclient.put(`/tournament/${tournament.id}`, tournament, {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response
    }
  }
}

export async function compareMatches(
  requestObj: MatchCompareRequest
): Promise<MapV1[]> {
  const response = await apiclient.post("/misc/compare-matches-v1", requestObj)
  return response.data
}
