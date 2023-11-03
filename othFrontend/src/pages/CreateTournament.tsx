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
import { TournamentPost } from "../helpers/interfaces"
import "../css/CreateTournament.css"
import { AddTournamentAsync } from "../services/othApiService"
// TODO convert teamMateIds to a list of numbers , in iterfaces have one form interface and one Tournament interface
export default function CreateTournament() {
  const { getIdTokenClaims } = useAuth0()
  const [date, setDate] = useState<string | null>(null)
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
    const claims = await getIdTokenClaims()
    const osuId = claims!.sub.split("|")[2]
    const properDate = new Date(date as string)
    let teamMateIds: number[] | null

    const teamMateIdsString = data.teamMateIds as string
    if (teamMateIdsString) {
      teamMateIds = teamMateIdsString.split(",").map((id) => +id)
      teamMateIds.push(parseInt(osuId, 10))
    } else {
      teamMateIds = null
    }
    const allData = {
      ...data,
      date: properDate.toISOString(),
      teamMateIds,
      seed: data.seed ? +data.seed : null,
    }
    AddTournamentAsync(allData)
  }
  return (
    <div className="create-tournament-page">
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

        <div className="input-container">
          <TextField
            label="Team Mate IDs"
            {...register("teamMateIds")}
            variant="outlined"
            autoComplete="off"
          />
          <Tooltip
            title={
              <div>
                Seperated by comma <br />
                ex: 3191010, 12240324
              </div>
            }
          >
            <InfoIcon />
          </Tooltip>
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
