import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { TbSearch, TbArrowsSort } from "react-icons/tb"
import toast from "react-hot-toast"
import dayjs from "dayjs"
import CircularProgress from "@mui/material/CircularProgress"
import { useParams } from "react-router-dom"
import {
  DeleteTournamentAsync,
  GetTournamentsByPlayerIdAsync,
} from "../../services/othApiService"
import { Tournament } from "../../helpers/interfaces"
import "animate.css"
import TournamentContainer from "../../components/TournamentContainer"
import InputFiled from "../../components/common/InputFiled/InputField"
import SelectBox from "../../components/common/SelectBox/SelectBox"
import "./History.scss"

export default function History() {
  const { getIdTokenClaims, isAuthenticated } = useAuth0()
  const { id } = useParams()
  const historyPlayerId = Number(id)
  const [query, setQuery] = useState<string>("")
  const [tournaments, setTournaments] = useState<Tournament[] | null>(null)
  const [playerName, setPlayerName] = useState<string>("")
  const [loggedInId, setLoggedInId] = useState<number>(0)
  const [deletingTournamentId, setDeletingTournamentId] = useState<
    number | null
  >(null)
  const [, setSortOpt] = useState<string>("Date (New First)")

  let content

  if (tournaments === null) {
    content = <CircularProgress color="secondary" />
  } else if (tournaments.length === 0) {
    content = <p>No Tournaments</p>
  } else {
    content = (
      <TournamentContainer
        tournamentsList={tournaments.filter((t) =>
          t.name.toLowerCase().includes(query.toLowerCase())
        )}
        logdinId={loggedInId}
        isOwnHistory={isAuthenticated && historyPlayerId === loggedInId}
        deletingTournamentId={deletingTournamentId}
        onDeleteTournament={handleDeleteTournament}
      />
    )
  }

  useEffect(() => {
    const getTournaments = () => {
      GetTournamentsByPlayerIdAsync(historyPlayerId).then((res) => {
        setTournaments(res)
        const player = res[0]?.teamMates.find((p) => p.id === historyPlayerId)
        if (player) setPlayerName(player.username)
      })
    }
    getTournaments()

    if (isAuthenticated) {
      getIdTokenClaims().then((res) => {
        const userId = Number(res?.sub.split("|")[2])
        setLoggedInId(Number.isFinite(userId) ? userId : 0)
      })
    } else {
      setLoggedInId(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyPlayerId, isAuthenticated])

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  async function handleDeleteTournament(tournamentId: number) {
    const tournament = tournaments?.find((t) => t.id === tournamentId)
    if (
      !isAuthenticated ||
      historyPlayerId !== loggedInId ||
      !tournament ||
      tournament.addedById !== loggedInId
    )
      return

    const confirmed = window.confirm(
      `Delete "${tournament.name}"? This will remove it from every teammate's history.`
    )
    if (!confirmed) return

    setDeletingTournamentId(tournamentId)
    try {
      const claims = await getIdTokenClaims()
      if (!claims?.__raw) throw new Error("Missing authentication token")

      await DeleteTournamentAsync(tournamentId, claims.__raw)
      setTournaments((current) =>
        current?.filter((t) => t.id !== tournamentId) ?? null
      )
      toast.success("Tournament deleted!")
    } catch {
      toast.error("Could not delete tournament. Please try again.")
    } finally {
      setDeletingTournamentId(null)
    }
  }

  return (
    <div className="history-page page">
      <h1 className="history-page__title">{playerName}&#39;s History</h1>
      <div className="history-page__inputs">
        <InputFiled
          value={query}
          onChange={handleSearchChange}
          placeholder="Search..."
          Icon={TbSearch}
        />

        <div className="history-page__sort">
          <TbArrowsSort size={20} />
          <SelectBox
            id="history-sort"
            options={[
              { label: "Date (New First)", value: "Date (New First)" },
              { label: "Date (Old First)", value: "Date (Old First)" },
              { label: "Name", value: "Name" },
            ]}
            onChange={(e) => handleSortChange(e)}
          />
        </div>
      </div>
      {content}
    </div>
  )
}
