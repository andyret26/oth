import "../css/CreateTournament.css"
import { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import TextField from "@mui/material/TextField/TextField"
import InfoIcon from "@mui/icons-material/Info"
import EditCalendarRoundedIcon from "@mui/icons-material/EditCalendarRounded"
import Tooltip from "@mui/material/Tooltip"
import { Autocomplete } from "@mui/material"
import dayjs, { Dayjs } from "dayjs"

import Button from "@mui/material/Button/Button"
import { DatePicker } from "@mui/x-date-pickers"
import { useAuth0 } from "@auth0/auth0-react"
import { useLocation } from "react-router-dom"
import toast from "react-hot-toast"
import { PlayerMin, TournamentPost } from "../helpers/interfaces"
import { GetTournamentById, UpdateTournament } from "../services/othApiService"
import NameCard from "../components/NameCard"
import { SimpleDialog } from "../components/SimpleDialog"
import { listOfPlayersToIdArray } from "../helpers/functions"

export default function CreateTournament() {
  const { getIdTokenClaims } = useAuth0()
  const { pathname } = useLocation()
  const [date, setDate] = useState<Dayjs | null>(null)

  const [selectedFormat, setSelectedFormat] = useState<string | null>("")
  const [selectedTeamSize, setSelectedTeamSize] = useState<string | null>("")
  const [selectedPlacement, setSelectedPlacement] = useState<string | null>("")
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerMin[]>([])
  const [open, setOpen] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TournamentPost>()

  useEffect(() => {
    const tourneyid = pathname.split("/")[3]
    GetTournamentById(+tourneyid).then((res) => {
      const tempPlayers: PlayerMin[] = []
      setDate(res.date ? dayjs(res.date) : null)
      setValue("name", res.name)
      setValue("teamName", res.teamName)
      setValue("rankRange", res.rankRange)
      setValue("format", res.format)
      setValue("teamSize", res.teamSize)
      setValue("seed", res.seed)
      setValue("placement", res.placement)
      setValue("notes", res.notes)
      setValue("forumPostLink", res.forumPostLink)
      setValue("mainSheetLink", res.mainSheetLink)
      setValue("bracketLink", res.bracketLink)
      setValue("imageLink", res.imageLink)
      setSelectedFormat(res.format)
      setSelectedTeamSize(res.teamSize)
      setSelectedPlacement(res.placement)
      res.teamMates.forEach((p) =>
        tempPlayers.push({
          id: p.id,
          username: p.username,
        })
      )
      setSelectedPlayers(tempPlayers.filter((p) => p.id !== res.addedById))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const openDialog = () => {
    setOpen(true)
  }

  const handleClosedialog = (value: string) => {
    console.log(value)
    setOpen(false)
  }

  const formatOptions = [
    "",
    "1 vs 1",
    "2 vs 2",
    "3 vs 3",
    "4 vs 4",
    "Free For All",
    "Other",
  ]

  const teamSizeOptions = [
    "",
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
    "",
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
    toast.loading("Loading...")
    const claims = await getIdTokenClaims()
    const osuId = claims!.sub.split("|")[2]
    const playersIdsToAdd = listOfPlayersToIdArray(selectedPlayers)

    const allData = {
      ...data,
      date: date?.toISOString(),
      teamMateIds: [...playersIdsToAdd, +osuId],
      seed: data.seed ? +data.seed : null,
      addedById: +osuId,
      id: pathname.split("/")[3],
    }

    const res = await UpdateTournament(allData, claims!.__raw)
    toast.dismiss()
    if (res !== undefined) {
      toast.error(res.data.detail)
    } else {
      toast.success("Tournament updated!")
    }
    console.log(res)
  }

  return (
    <div className="create-tournament-page page">
      <h1 className="text-4xl pb-2">Edit</h1>
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
                InputLabelProps: {
                  shrink: true,
                },
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
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label="Team Name"
          {...register("teamName")}
          variant="outlined"
          autoComplete="off"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <SimpleDialog
          open={open}
          onClose={handleClosedialog}
          selectedPlayers={selectedPlayers}
          setSelectedPlayers={setSelectedPlayers}
        />

        <div>
          <Button onClick={() => openDialog()} variant="outlined">
            Add TeamMates
          </Button>
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
              <p className="pl-2">
                No team mates added (don&#39;t add if solo)
              </p>
            )}
          </div>
        </div>

        <TextField
          label="Rank Range"
          {...register("rankRange")}
          variant="outlined"
          autoComplete="off"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Autocomplete
          disablePortal
          openOnFocus
          options={formatOptions}
          value={selectedFormat}
          onChange={(_, value) => {
            setSelectedFormat(value)
            setValue("format", value)
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Format"
              variant="outlined"
              {...register("format")}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        />

        <Autocomplete
          disablePortal
          openOnFocus
          options={teamSizeOptions}
          value={selectedTeamSize}
          onChange={(_, value) => {
            setValue("teamSize", value)
            setSelectedTeamSize(value)
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Team Size"
              variant="outlined"
              {...register("teamSize")}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        />

        <TextField
          label="Seed"
          {...register("seed")}
          variant="outlined"
          autoComplete="off"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Autocomplete
          disablePortal
          openOnFocus
          options={placementOptions}
          value={selectedPlacement}
          onChange={(_, value) => {
            setSelectedPlacement(value)
            setValue("placement", value)
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Placement"
              variant="outlined"
              {...register("placement")}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        />

        <TextField
          multiline
          rows={3}
          label="Notes"
          {...register("notes")}
          variant="outlined"
          autoComplete="off"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label="Forum Post Link"
          {...register("forumPostLink")}
          variant="outlined"
          autoComplete="off"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label="Main Sheet Link"
          {...register("mainSheetLink")}
          variant="outlined"
          autoComplete="off"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label="Bracket Link"
          {...register("bracketLink")}
          variant="outlined"
          autoComplete="off"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Button variant="contained" type="submit" color="primary">
          Submit
        </Button>
      </form>
    </div>
  )
}
