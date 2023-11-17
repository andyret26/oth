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
import { TbX } from "react-icons/tb"
import { Tournament, TournamentPost } from "../helpers/interfaces"
import "../css/CreateTournament.css"
import { GetTournamentById } from "../services/othApiService"

export default function CreateTournament() {
  const { getIdTokenClaims } = useAuth0()
  const [date, setDate] = useState<Dayjs | null>(null)
  const [teamMateIds, setTeamMateIds] = useState<number[]>([])
  const [tempValue, setTempValue] = useState<string>("")
  const [currentTournament, setCurrentTournament] =
    useState<Tournament | null>()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TournamentPost>()

  useEffect(() => {
    const tourneyid = window.location.pathname.split("/")[3]
    GetTournamentById(+tourneyid).then((res) => {
      const playersTemp: number[] = []
      setCurrentTournament(res)
      setDate(dayjs(res.date))
      setValue("name", res.name)
      setValue("teamName", res.teamName)
      setValue("rankRange", res.rankRange)
      setValue("format", res.format)
      setValue("teamSize", res.teamSize)
      setValue("seed", res.seed)
      setValue("placement", res.placement)
      res.teamMates.forEach((player) => playersTemp.push(player.id))
      setTeamMateIds(playersTemp.filter((p) => p !== res.addedById))
      setValue("notes", res.notes)
      setValue("forumPostLink", res.forumPostLink)
      setValue("mainSheetLink", res.mainSheetLink)
      setValue("bracketLink", res.bracketLink)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

    const allData = {
      ...data,
      date: date?.toISOString(),
      teamMateIds: [...teamMateIds, +osuId],
      seed: data.seed ? +data.seed : null,
      addedById: +osuId,
    }
    // TODO use othApiService to update db
    console.log(allData)
  }

  function handleTeamMateChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { value } = e.target
    setTempValue(value)
  }

  function handleTeamMatePress(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === ",") {
      const target = e.target as HTMLInputElement
      const { value } = target
      const id = +value.substring(0, value.length - 1)
      if (Number.isNaN(id)) {
        setTempValue("")
        return
      }
      setTempValue("")
      setTeamMateIds([...teamMateIds, +id])
    }
  }

  function handleXClick(id: number) {
    const newTeamMateIds = teamMateIds.filter((teamMateId) => teamMateId !== id)
    setTeamMateIds(newTeamMateIds)
  }

  return (
    <div className="create-tournament-page page">
      <h1 className="text-4xl text-red-600">Work in progress</h1>
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
          value={currentTournament ? currentTournament.format : "1 vs 1"}
          onChange={(_, value) => setValue("format", value)}
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
          value={currentTournament ? currentTournament.teamSize : "Solo"}
          onChange={(_, value) => setValue("format", value)}
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
          value={currentTournament ? currentTournament.placement : "1st"}
          onChange={(_, value) => setValue("format", value)}
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

        <div>
          <div className="flex items-center w-full gap-3">
            <TextField
              className="w-full"
              label="Team Mate Ids (comma seperated)"
              variant="outlined"
              autoComplete="off"
              value={tempValue}
              onChange={(e) => handleTeamMateChange(e)}
              onKeyUp={(e) => handleTeamMatePress(e)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div className="flex flex-col">
              <Tooltip
                title={
                  <div>
                    {/* Select from list <br /> */}
                    Write Osu user Id <br />
                    Then press , (Comma) <br />
                  </div>
                }
              >
                <InfoIcon />
              </Tooltip>
              {/* // TODO Maybe add quick add button */}
              {/* <Button>Quick Add</Button> */}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {teamMateIds.map((id) => (
              <div
                key={id}
                className="flex items-center bg-[#7f4b62] rounded-md py-1 px-2"
              >
                <p>{id}</p>
                <TbX
                  onClick={() => handleXClick(id)}
                  className="ml-2 hover:bg-red-500 hover:text-white rounded-full bg-white text-red-500 hover:cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

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
