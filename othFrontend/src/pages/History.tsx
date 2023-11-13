import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import axios from "axios"
import CircularProgress from "@mui/material/CircularProgress"
import { TbTournament, TbEdit } from "react-icons/tb"
import { Link, useLocation } from "react-router-dom"
import { GetTournamentsByPlayerIdAsync } from "../services/othApiService"
import { Tournament } from "../helpers/interfaces"
import "../css/HistoryPage.css"
import "animate.css"
import { FadeInOnScroll } from "../components/FadeInOnScroll"

function tournamentsDiv(tournamentsList: Tournament[], logdinId: number) {
  return (
    <div className="tourney-card-container">
      {tournamentsList.map((t) => (
        <FadeInOnScroll key={t.id}>
          <div className="tourney-card">
            <p className="t-name">{t.name}</p>
            {logdinId === t.addedById ? (
              <Link
                className="absolute right-4 top-2 text-white/75 rounded-lg p-1 hover:bg-[#6c585e]"
                to={`/tournament/edit/${t.id}`}
              >
                <TbEdit size={20} />
              </Link>
            ) : null}
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
            <div className="flex gap-2 absolute bottom-2 left-3 text-sm font-medium">
              {t.forumPostLink ? (
                <a
                  href={t.forumPostLink}
                  className="border-solid border-2 border-[#ff66ab] p-1 text-[#ff66ab] rounded-md hover:bg-[#ff66ab] hover:text-white"
                >
                  Forum Post
                </a>
              ) : null}
              {t.bracketLink ? (
                <a
                  href={t.bracketLink}
                  className="border-solid border-2 border-[#88da20] p-1 text-[#88da20] rounded-md hover:bg-[#88da20] hover:text-white"
                >
                  <TbTournament size={20} className="inline mr-1" />
                  <p className="inline">Bracket</p>
                </a>
              ) : null}
            </div>
          </div>
        </FadeInOnScroll>
      ))}
    </div>
  )
}

export default function History() {
  const { getIdTokenClaims, isAuthenticated } = useAuth0()
  const location = useLocation()
  const [tournaments, setTournaments] = useState<Tournament[] | null>(null)
  const [logdinId, setLogdinId] = useState<number>(0)
  let content

  if (tournaments === null) {
    content = <CircularProgress color="secondary" />
  } else if (tournaments.length === 0) {
    content = <p>No Tournaments</p>
  } else {
    content = tournamentsDiv(tournaments, logdinId)
  }
  // TODO: Add loading state and fix page when reload page
  useEffect(() => {
    const setLoginId = async () => {
      const claims = await getIdTokenClaims()
      const osuId: string = claims!.sub.split("|")[2]
      setLogdinId(+osuId)
    }
    const fetchTournaments = async () => {
      const playerId = location.pathname.split("/")[2]
      setTournaments(await GetTournamentsByPlayerIdAsync(+playerId))
    }

    if (isAuthenticated) {
      setLoginId()
    }
    fetchTournaments()
  }, [isAuthenticated, getIdTokenClaims, location.pathname])

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

      {content}
      {/* {tournaments.length === 0 ? (
        <div>No tournaments</div>
      ) : (
        
      )} */}
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
