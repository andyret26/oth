import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import InfoIcon from "@mui/icons-material/Info"
import Tooltip from "@mui/material/Tooltip"

import { useAuth0 } from "@auth0/auth0-react"
import toast from "react-hot-toast"
import { PlayerMin, TournamentPost } from "../../helpers/interfaces"
import "./EditTournament.scss"
import {
  GetTournamentById,
  UpdateTournament,
} from "../../services/othApiService"
import { SimpleDialog } from "../../components/Dialog/AddTeammateDialog"
import DatePicker2 from "../../components/common/DatePicker/DatePicker"
import {
  convertTournamentToTournamentpost,
  listOfPlayersToIdArray,
} from "../../helpers/functions"
import InputFiled from "../../components/common/InputFiled/InputField"
import StandardBtn from "../../components/common/standardBtn/StandardBtn"
import formInit from "../../helpers/tournamentForm.json"
import SelectBox from "../../components/common/SelectBox/SelectBox"
import InputArea from "../../components/common/InputArea/InputArea"
import PlayerMinCard from "../../components/PlayerMinCard/PlayerMinCard"

export default function CreateTournament() {
  const location = useLocation()

  const [isOpen, setIsOpen] = useState(false)
  const { getIdTokenClaims } = useAuth0()
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerMin[]>([])
  const [form, setForm] = useState<TournamentPost>(formInit)

  const formatOptions = [
    "1 vs 1",
    "2 vs 2",
    "3 vs 3",
    "4 vs 4",
    "Free For All",
    "Other",
  ]

  const teamSizeOptions = [
    "Solo",
    "Teams of 2",
    "Teams of 3",
    "Teams of 4",
    "Teams of 5",
    "Teams of 6",
    "Teams of 7",
    "Teams of 8",
  ]

  const placementOptions = [
    "1st",
    "2nd",
    "3rd",
    "Top 4 (Finale)",
    "Top 6 (Finale)",
    "Top 8 (Semi-Finale)",
    "Top 12 (Semi-Finale)",
    "Top 16 (Quarter-Finale)",
    "Top 24 (Quarter-Finale)",
    "Top 32 (Round of 16)",
    "Top 48 (Round of 16)",
    "Top 64 (Round of 32)",
    "Did Not Qualify",
  ]

  const onSubmit = async () => {
    toast.loading("Submitting...")
    const claims = await getIdTokenClaims()
    const osuId = claims!.sub.split("|")[2]
    const teamMateIds = listOfPlayersToIdArray(selectedPlayers)
    const convertedDate = form.date?.split("/").reverse().join("-")

    const allData = {
      ...form,
      date: `${convertedDate}T00:00Z`,
      teamMateIds: [...teamMateIds, +osuId],
      seed: form.seed ? +form.seed : null,
      addedById: +osuId,
    }

    const res = await UpdateTournament(allData, claims!.__raw)
    toast.dismiss()
    if (res !== undefined) {
      toast.error(res.data.detail)
    } else {
      toast.success("Tournament updated!")
    }
  }

  const openDialog = () => {
    setIsOpen(!isOpen)
  }

  const handleClosedialog = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    const getTournament = async () => {
      const claims = await getIdTokenClaims()
      const osuId = claims!.sub.split("|")[2]
      const tournamentId = parseInt(location.pathname.split("/")[3], 10)
      const tourney = await GetTournamentById(tournamentId)
      const converted = convertTournamentToTournamentpost(tourney)

      setSelectedPlayers(
        tourney.teamMates
          .flatMap((p) => ({ id: p.id, username: p.username }))
          .filter((p) => p.id !== parseInt(osuId, 10))
      )

      setForm(converted)
    }

    getTournament()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="page create-tournament">
      <form className="create-tournament__form">
        <div className="create-tournament__date-container">
          <DatePicker2
            value={form.date || ""}
            onChange={(newDate) => {
              setForm({ ...form, date: newDate })
            }}
          />

          <Tooltip
            title={
              <div>
                You can use: <br />
                Date of forum post
                <br />
                Date registered
                <br />
                Date of first match
                <br />
                Keep it consistant
              </div>
            }
          >
            <InfoIcon />
          </Tooltip>
        </div>

        <InputFiled
          value={form.name!}
          maxWidth="100%"
          label="Tournament Name *"
          onChange={(e) => {
            setForm({ ...form, name: e.target.value })
          }}
        />

        <InputFiled
          value={form.teamName}
          maxWidth="100%"
          label="Team Name"
          onChange={(e) => {
            setForm({ ...form, teamName: e.target.value })
          }}
        />

        <div>
          <StandardBtn
            color="blue"
            btnText="Add Teammates"
            onClick={() => openDialog()}
          />

          <div className="create-tournament__player-cards">
            {selectedPlayers.length ? (
              <>
                {selectedPlayers.map((p) => (
                  <PlayerMinCard hasXBtn key={p.id} player={p} />
                ))}
              </>
            ) : (
              <p className="pl-2">
                No team mates added (don&#39;t add if solo)
              </p>
            )}
          </div>
        </div>

        {isOpen ? (
          <SimpleDialog
            onClose={handleClosedialog}
            selectedPlayers={selectedPlayers}
            setSelectedPlayers={setSelectedPlayers}
          />
        ) : null}

        <InputFiled
          value={form.rankRange}
          maxWidth="100%"
          label="Rank Range"
          onChange={(e) => {
            setForm({ ...form, rankRange: e.target.value })
          }}
        />

        <SelectBox
          id="add-tournament-select"
          label="Format"
          options={formatOptions}
          onChange={(val) => {
            setForm({ ...form, format: val })
          }}
        />

        <SelectBox
          id="add-tournament-select"
          label="Team Size"
          options={teamSizeOptions}
          onChange={(val) => {
            setForm({ ...form, teamSize: val })
          }}
        />

        <InputFiled
          value={form.seed ? String(form.seed) : "0"}
          maxWidth="100%"
          label="Seed"
          onChange={(e) => {
            setForm({ ...form, seed: parseInt(e.target.value, 10) })
          }}
        />

        <SelectBox
          id="placement"
          label="Placement"
          options={placementOptions}
          onChange={(val) => {
            setForm({ ...form, placement: val })
          }}
        />

        <InputArea
          label="Notes"
          maxWidth="100%"
          value={form.notes}
          onChange={(e) => {
            setForm({ ...form, notes: e.target.value })
          }}
        />

        <InputFiled
          value={form.forumPostLink}
          maxWidth="100%"
          label="Forum post Link"
          onChange={(e) => {
            setForm({ ...form, forumPostLink: e.target.value })
          }}
        />

        <InputFiled
          value={form.mainSheetLink}
          maxWidth="100%"
          label="Main sheet link"
          onChange={(e) => {
            setForm({ ...form, mainSheetLink: e.target.value })
          }}
        />

        <InputFiled
          value={form.bracketLink}
          maxWidth="100%"
          label="Bracket link"
          onChange={(e) => {
            setForm({ ...form, bracketLink: e.target.value })
          }}
        />
        <StandardBtn btnText="Submit" onClick={() => onSubmit()} />
      </form>
    </div>
  )
}
