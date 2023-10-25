import axios from "axios"

const API_KEY = import.meta.env.VITE_OSU_API_KEY

export async function getUserDataAsync(id: string): Promise<void> {
  const response = await axios.get("https://osu.ppy.sh/api/get_user", {
    params: {
      k: API_KEY,
      u: id,
      m: "0",
      type: "id",
    },
  })
}
