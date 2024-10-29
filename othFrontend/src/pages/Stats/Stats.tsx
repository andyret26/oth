import { useEffect, useState } from "react"
import { CircularProgress } from "@mui/material"
import { PlayerStats } from "../../helpers/interfaces"
import { GetPlayerStatsAsync } from "../../services/othApiService"
import "./Stats.scss"

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
    <div className="stats">
      <h1 className="stats__title">Stats</h1>
      {stats ? (
        <div className="stats__content">
          <p>
            Total Tournaments:{" "}
            <span className="stats__value">{stats?.totalTournaments}</span>
          </p>
          <div className="stats__placement">
            <div className="stats__rate">
              <p>
                Win Rate:{" "}
                <span className="stats__value">{stats?.firstRate}%</span>
              </p>
              <p>
                Top 3 Rate:{" "}
                <span className="stats__value">{stats?.top3Rate}%</span>
              </p>
            </div>
            <div className="stats__podium">
              <p className="stats__1st">
                1st: <span className="stats__value">{stats?.firstPlaces}</span>
              </p>
              <p className="stats__2nd">
                2nd: <span className="stats__value">{stats?.secondPlaces}</span>
              </p>
              <p className="stats__3rd">
                3rd: <span className="stats__value">{stats?.thirdPlaces}</span>
              </p>
            </div>
          </div>
          <p>
            Average Placement:{" "}
            <span className="stats__value">{stats?.avgPlacement}</span>
          </p>
          <div className="">
            <p>
              Unique Team players:{" "}
              <span className="stats__value">
                {stats?.uniqueTeamMatesCount}
              </span>
            </p>
            <p>
              Unique Countries:{" "}
              <span className="stats__value">{stats?.uniqueFlagCount}</span>
            </p>
          </div>
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  )
}
