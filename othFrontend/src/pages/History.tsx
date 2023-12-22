import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import CircularProgress from "@mui/material/CircularProgress"
import { useLocation } from "react-router-dom"
import { GetTournamentsByPlayerIdAsync } from "../services/othApiService"
import { Tournament } from "../helpers/interfaces"
import "../css/HistoryPage.css"
import "animate.css"
import TournamentContainer from "../components/TournamentContainer"

export default function History() {
  const { getIdTokenClaims, isAuthenticated } = useAuth0()
  const location = useLocation()
  const [tournaments, setTournaments] = useState<Tournament[] | null>(null)
  const [playerName, setPlayerName] = useState<string>("")
  const [logdinId, setLogdinId] = useState<number>(0)
  const [sortOpt, setSortOpt] = useState<string>("Date")

  let content

  if (tournaments === null) {
    content = <CircularProgress color="secondary" />
  } else if (tournaments.length === 0) {
    content = <p>No Tournaments</p>
  } else {
    content = (
      <TournamentContainer tournamentsList={tournaments} logdinId={logdinId} />
    )
  }

  useEffect(() => {
    const id = location.pathname.split("/")[2]
    const getTournaments = () => {
      GetTournamentsByPlayerIdAsync(+id).then((res) => {
        setTournaments(res)
        setPlayerName(res[0].teamMates.find((p) => p.id === +id)!.username)
      })
    }
    getTournaments()

    if (isAuthenticated) {
      getIdTokenClaims().then((res) => {
        setLogdinId(+res!.sub.split("|")[2])
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, isAuthenticated])

  function handleSortChange(sortValue: string) {
    setSortOpt(sortValue)
    if (
      tournaments === null ||
      tournaments === undefined ||
      tournaments.length === 0
    )
      return

    let updatedTournaments
    if (sortValue === "Date (Old First)") {
      updatedTournaments = tournaments.sort(
        (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix()
      )
    } else if (sortValue === "Name") {
      updatedTournaments = tournaments.sort((a, b) =>
        a.name.localeCompare(b.name)
      )
    } else if (sortValue === "Date (New First)") {
      updatedTournaments = tournaments.sort(
        (a, b) => dayjs(b.date).unix() - dayjs(a.date).unix()
      )
    }

    setTournaments(updatedTournaments!)
  }
  return (
    <div className="history-page gap-2 page">
      <h1 className="text-3xl pb-4 font-extrabold">
        {playerName}&#39;s History
      </h1>
      <div className="flex gap-2 w-full items-center justify-center">
        <p className="text-white/90 text-center">Sort By: </p>
        <select
          name="sort"
          id="sort"
          placeholder="Sort By"
          value={sortOpt}
          onChange={(e) => handleSortChange(e.target.value)}
          className="bg-[#4e3c44] p-1 rounded-md"
        >
          <option value="Date (Old First)">Date (Old First)</option>
          <option value="Name">Name</option>
          <option value="Date (New First)">Date (New First)</option>
        </select>
      </div>
      {content}
    </div>
  )
}
