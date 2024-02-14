import { useEffect, useState } from "react"
import {
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Checkbox,
} from "@mui/material"
import "../../css/MatchCompare.scss"
import { SubmitHandler, useForm } from "react-hook-form"
import { AxiosError } from "axios"
import toast from "react-hot-toast"
import { MatchCompareRequest } from "../../helpers/interfaces"
import { compareMatches } from "../../services/othApiService"

export default function MatchCompareForm() {
  const { register, handleSubmit, setValue, getValues } =
    useForm<MatchCompareRequest>()

  const [teamType, setTeamType] = useState("teams")
  const [ignoreMaps, setIgnoreMaps] = useState(false)

  const onSubmit: SubmitHandler<MatchCompareRequest> = async (data) => {
    toast.loading("Comparing matches...")
    const test = await compareMatches(data).catch((e) => {
      toast.dismiss()
      if (e instanceof AxiosError) {
        console.log(e)
        if (e.response?.status === 404) {
          toast.error(e.response.data.detail)
        }
      }
    })
    console.log(test)
  }

  useEffect(() => {
    if (!getValues("teamType")) {
      setValue("teamType", "teams")
    }
    if (!getValues("team1Color")) {
      setValue("team1Color", "blue")
    }
    if (!getValues("team2Color")) {
      setValue("team2Color", "blue")
    }
  })

  return (
    <form className="compare__form" onSubmit={handleSubmit(onSubmit)}>
      <div className="compare__lobby-inputs">
        <TextField
          label="Lobby id 1"
          {...register("matchId1")}
          variant="filled"
        />
        <TextField
          label="Lobby id 2"
          {...register("matchId2")}
          variant="filled"
        />
      </div>
      <div>
        <FormControlLabel
          control={<Checkbox color="warning" />}
          label="Ignore maps?"
          labelPlacement="top"
          onChange={() => setIgnoreMaps(!ignoreMaps)}
        />
      </div>
      {ignoreMaps ? (
        <div className="compare__ignore-inputs">
          <div className="flex gap-3">
            <TextField label="Ignore start 1" {...register("ignoreStart1")} />
            <TextField label="Ignore end 1" {...register("ignoreEnd1")} />
          </div>
          <div className="flex gap-3">
            <TextField label="Ignore start 2" {...register("ignoreStart2")} />
            <TextField label="Ignore end 2" {...register("ignoreEnd2")} />
          </div>
        </div>
      ) : null}
      <div className="compare__team-type">
        <FormLabel id="team-type">Team type</FormLabel>
        <RadioGroup
          aria-labelledby="team-type"
          defaultValue="teams"
          row
          onChange={(e) => {
            setValue("teamType", e.target.value)
            setTeamType(e.target.value)
          }}
        >
          <FormControlLabel
            value="teams"
            control={<Radio color="secondary" />}
            label="Team-vs"
          />
          <FormControlLabel
            value="h2h"
            control={<Radio color="secondary" />}
            label="Head to head"
          />
        </RadioGroup>
      </div>

      {teamType === "h2h" ? (
        <div className="compare__names">
          <TextField label="Name1" {...register("team1Name")} />
          <TextField label="Name2" {...register("team2Name")} />
        </div>
      ) : (
        <div className="compare__team-color">
          <div>
            <FormLabel id="team-color1">Color 1</FormLabel>
            <RadioGroup
              aria-labelledby="team-color1"
              defaultValue="blue"
              row
              onChange={(e) => setValue("team1Color", e.target.value)}
            >
              <FormControlLabel value="blue" control={<Radio />} label="Blue" />
              <FormControlLabel
                value="red"
                control={<Radio color="error" />}
                label="Red"
              />
            </RadioGroup>
          </div>
          <div>
            <FormLabel id="team-color2">Color 2</FormLabel>
            <RadioGroup
              aria-labelledby="team-color2"
              defaultValue="blue"
              row
              onChange={(e) => setValue("team2Color", e.target.value)}
            >
              <FormControlLabel value="blue" control={<Radio />} label="Blue" />
              <FormControlLabel
                value="red"
                control={<Radio color="error" />}
                label="Red"
              />
            </RadioGroup>
          </div>
        </div>
      )}
      <Button type="submit" onSubmit={(e) => console.log("da", e)}>
        Compare
      </Button>
    </form>
  )
}
