import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import TextField from "@mui/material/TextField/TextField"
import InfoIcon from "@mui/icons-material/Info"
import EditCalendarRoundedIcon from "@mui/icons-material/EditCalendarRounded"
import Tooltip from "@mui/material/Tooltip"
import { Autocomplete } from "@mui/material"

import Button from "@mui/material/Button/Button"
import { DatePicker } from "@mui/x-date-pickers"
import { useAuth0 } from "@auth0/auth0-react"
import { Dayjs } from "dayjs"
import toast from "react-hot-toast"
import { PlayerMin, TournamentPost } from "../helpers/interfaces"
import "../css/CreateTournament.css"
import { AddTournamentAsync } from "../services/othApiService"
import { SimpleDialog } from "../components/SimpleDialog"
import NameCard from "../components/NameCard"
import { listOfPlayersToIdArray } from "../helpers/functions"

export default function CreateTournament() {
  const [open, setOpen] = useState(false)
  const { getIdTokenClaims } = useAuth0()
  const [date, setDate] = useState<Dayjs | null>(null)
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerMin[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TournamentPost>()

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
  const onSubmit: SubmitHandler<TournamentPost> = async (data) => {
    toast.loading("Submitting...")
    const claims = await getIdTokenClaims()
    const osuId = claims!.sub.split("|")[2]
    const teamMateIds = listOfPlayersToIdArray(selectedPlayers)

    const allData = {
      ...data,
      date: date?.toISOString(),
      teamMateIds: [...teamMateIds, +osuId],
      seed: data.seed ? +data.seed : null,
      addedById: +osuId,
    }
    const res = await AddTournamentAsync(allData, claims!.__raw)
    toast.dismiss()
    if (res !== undefined) {
      toast.error(res.data.detail)
    } else {
      toast.success("Tournament added!")
    }
  }

  const openDialog = () => {
    setOpen(true)
  }

  const handleClosedialog = (value: string) => {
    console.log(value)
    setOpen(false)
  }

  return (
    <div className="page create-tournament-page">
      <form
        className="create-tournament-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="input-container">
          <DatePicker
            value={date}
            onChange={(newValue) => {
              setDate(newValue)
            }}
            className="date-picker"
            slots={{
              openPickerIcon: EditCalendarRoundedIcon,
            }}
            slotProps={{
              textField: {
                label: "Date (MM/DD/YYYY)",
                variant: "outlined",
              },
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

        <TextField
          label="Name *"
          error={!!errors.name}
          {...register("name", { required: true })}
          variant="outlined"
          helperText={errors.name ? "Name is required" : ""}
          autoComplete="new-password"
        />

        <TextField
          label="Team Name"
          {...register("teamName")}
          variant="outlined"
          autoComplete="off"
        />

        <TextField
          label="Rank Range"
          {...register("rankRange")}
          variant="outlined"
          autoComplete="off"
        />

        <Autocomplete
          disablePortal
          openOnFocus
          options={formatOptions}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Format"
              variant="outlined"
              {...register("format")}
            />
          )}
        />

        <Autocomplete
          disablePortal
          openOnFocus
          options={teamSizeOptions}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Team Size"
              variant="outlined"
              {...register("teamSize")}
            />
          )}
        />

        <TextField
          label="Seed"
          {...register("seed")}
          variant="outlined"
          autoComplete="off"
        />

        <Autocomplete
          disablePortal
          openOnFocus
          options={placementOptions}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Placement"
              variant="outlined"
              {...register("placement")}
            />
          )}
        />

        <SimpleDialog
          open={open}
          onClose={handleClosedialog}
          selectedPlayers={selectedPlayers}
          setSelectedPlayers={setSelectedPlayers}
        />

        <div>
          <Button onClick={() => openDialog()}>Add TeamMates</Button>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedPlayers.length ? (
              <>
                {selectedPlayers.map((p) => (
                  <NameCard
                    key={p.id}
                    selectedPlayers={selectedPlayers}
                    setSelectedPlayers={setSelectedPlayers}
                    player={p}
                  />
                ))}
              </>
            ) : (
              <p className="pl-2">No team mates added</p>
            )}
          </div>
        </div>

        <TextField
          multiline
          rows={3}
          label="Notes"
          {...register("notes")}
          variant="outlined"
          autoComplete="off"
        />

        <TextField
          label="Forum Post Link"
          {...register("forumPostLink")}
          variant="outlined"
          autoComplete="off"
        />

        <TextField
          label="Main Sheet Link"
          {...register("mainSheetLink")}
          variant="outlined"
          autoComplete="off"
        />

        <TextField
          label="Bracket Link"
          {...register("bracketLink")}
          variant="outlined"
          autoComplete="off"
        />

        <Button variant="contained" type="submit" color="primary">
          Submit
        </Button>
      </form>
    </div>
  )
}
