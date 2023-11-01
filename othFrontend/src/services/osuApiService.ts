import axios from "axios"

import { Auth } from "osu-web.js"
import { OsuUserData } from "../helpers/interfaces"

const API_KEY = import.meta.env.VITE_OSU_API_KEY
const AUTH = new Auth(
  1, // Clietn id here
  "Secret Here",
  "http://localhost:5173/"
)

export async function getUserDataAsync(id: string): Promise<OsuUserData[]> {
  const response = await axios.get("https://osu.ppy.sh/api/v1/get_user", {
    params: {
      k: API_KEY,
      u: id,
      m: "0",
      type: "id",
    },
  })

  return response.data
}

export async function Test(): Promise<void> {
  console.log("In test osuApiService")
  const test = await AUTH.clientCredentialsGrant()
  console.log(test)
}
