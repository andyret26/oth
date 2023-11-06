import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import axios from "axios"
import { GetTournamentsByPlayerIdAsync } from "../services/othApiService"
import { Tournament } from "../helpers/interfaces"
import "../css/HistoryPage.css"

export default function History() {
  const { getIdTokenClaims } = useAuth0()
  const [tournaments, setTournaments] = useState<Tournament[]>([])

  useEffect(() => {
    const setTourney = async () => {
      const claims = await getIdTokenClaims()
      const osuId: string = claims!.sub.split("|")[2]
      setTournaments(await GetTournamentsByPlayerIdAsync(+osuId))
    }
    setTourney()
  }, [])

  async function handleClick() {
    console.log("click")
    const test = await axios.get(
      "https://docs.google.com/spreadsheets/d/1SqfP_nMKGlZwmcac4YSmt4Q_RaS5imYo3785GZ05eIw/edit?usp=sharing"
    )
    console.log(test.data)
  }

  return (
    <div className="history-page">
      <h1>History</h1>
      <div className="tourney-card-container">
        {tournaments.map((t) => (
          <div className="tourney-card" key={t.id}>
            <p className="t-name">{t.name}</p>
            <p className="t-info t-date">
              {dayjs(t.date).format("DD MMM YYYY")}
            </p>
            <div className="t-ps">
              <p className={`t-placement ${t.placement.substring(1, 3)}`}>
                {t.placement.split("(")[0]}
              </p>
              <p className="t-seed">Seed: {t.seed}</p>
            </div>
            <p className="t-info t-format">{t.format}</p>
            <p className="t-info t-team-size">{t.teamSize}</p>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          handleClick()
        }}
      >
        Click
      </button>
    </div>
  )
}
