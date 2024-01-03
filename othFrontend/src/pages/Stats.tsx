import { useEffect, useState } from "react"
import { CircularProgress } from "@mui/material"
import { PlayerStats } from "../helpers/interfaces"
import { GetPlayerStatsAsync } from "../services/othApiService"

export default function Stats() {
  const [stats, setStats] = useState<PlayerStats>()
  useEffect(() => {
    const getStats = async () => {
      const pStats = await GetPlayerStatsAsync(
        parseInt(window.location.hash.split("/")[2], 10)
      )
      setStats(pStats)
    }

    getStats()
  }, [])
  return (
    <div className="text-xl flex flex-col items-center">
      <h1 className="my-8 text-3xl">Stats</h1>
      {stats ? (
        <div className="bg-[#382e32] p-10 rounded-md flex flex-col gap-16 items-center drop-shadow-md">
          <p>
            Total Tournaments:{" "}
            <span className="s">{stats?.totalTournaments}</span>
          </p>
          <div className="flex gap-16">
            <div className="flex flex-col justify-between items-end">
              <p>
                Win Rate: <span className="s">{stats?.firstRate}%</span>
              </p>
              <p>
                Top 3 Rate: <span className="s">{stats?.top3Rate}%</span>
              </p>
            </div>
            <div className="flex flex-col items-end gap-3">
              <p className="text-[#ffbd42]">
                1st: <span className="s">{stats?.firstPlaces}</span>
              </p>
              <p className="text-[#d9d9d9]">
                2nd: <span className="s">{stats?.secondPlaces}</span>
              </p>
              <p className="text-[#cf640d]">
                3rd: <span className="s">{stats?.thirdPlaces}</span>
              </p>
            </div>
          </div>
          <p>
            Average Placement: <span className="s">{stats?.avgPlacement}</span>
          </p>
          <div className="flex flex-col items-center gap-3">
            <p>
              Unique Team players:{" "}
              <span className="s">{stats?.uniqueTeamMatesCount}</span>
            </p>
            <p>
              Unique Countries:{" "}
              <span className="s">{stats?.uniqueFlagCount}</span>
            </p>
          </div>
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  )
}
