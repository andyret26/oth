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
  // TODO: Add loading state and fix page when reload page
  useEffect(() => {
    const setTourney = async () => {
      const claims = await getIdTokenClaims()
      const osuId: string = claims!.sub.split("|")[2]
      setTournaments(await GetTournamentsByPlayerIdAsync(+osuId))
    }
    setTourney()
  }, [getIdTokenClaims])

  async function handleClick() {
    console.log("click")
    const test = await axios.get(
      "https://docs.google.com/spreadsheets/d/1SqfP_nMKGlZwmcac4YSmt4Q_RaS5imYo3785GZ05eIw/edit?usp=sharing"
    )
    console.log(test.data)
  }

  return (
    <div className="history-page">
      <h1 className="text-3xl pb-8">History</h1>
      <div className="tourney-card-container">
        {tournaments.map((t) => (
          <div className="tourney-card" key={t.id}>
            <p className="t-name">{t.name}</p>
            <div className="w-full flex justify-between mt-2">
              <div className="flex flex-col items-center">
                <p className={`t-placement ${t.placement.substring(1, 3)}`}>
                  {t.placement.split("(")[0]}
                </p>
                <p className="t-seed">Seed: {t.seed}</p>
              </div>
              <p className="">{t.rankRange}</p>
              <p className="text-white/75">
                {dayjs(t.date).format("DD MMM YYYY")}
              </p>
            </div>
            <div className="text-sm flex flex-col items-center absolute bottom-3 right-4">
              <p className="">{t.teamSize}</p>
              <p className="">{t.format}</p>
            </div>
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
