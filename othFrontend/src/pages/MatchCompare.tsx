import { useEffect } from "react"
import {
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material"
import "../css/MatchCompare.scss"
import { SubmitHandler, useForm } from "react-hook-form"
import { MatchCompareRequest } from "../helpers/interfaces"

export default function MatchCompare() {
  const { register, handleSubmit, setValue, getValues } =
    useForm<MatchCompareRequest>()

  const onSubmit: SubmitHandler<MatchCompareRequest> = (data) => {
    console.log(data)
  }

  useEffect(() => {
    if (!getValues("teamType")) {
      setValue("teamType", "teams")
    }
  })

  return (
    <div className="compare">
      <h1 className="compare__title">Match compare</h1>
      <form className="compare__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="compare__lobby-inputs">
          <TextField label="Lobby id 1" {...register("matchId1")} />
          <TextField label="Lobby id 1" {...register("matchId2")} />
        </div>
        <div className="compare__ignore-inputs">
          <TextField label="Ignore start" {...register("ignoreStart1")} />
          <TextField label="Ignore end" {...register("ignoreEnd1")} />
          <TextField label="Ignore start" {...register("ignoreStart2")} />
          <TextField label="Ignore end" {...register("ignoreEnd2")} />
        </div>
        <div className="compare__team-type">
          <FormLabel id="team-type">Team type</FormLabel>
          <RadioGroup
            aria-labelledby="team-type"
            defaultValue="teams"
            row
            onChange={(e) => setValue("teamType", e.target.value)}
          >
            <FormControlLabel
              value="teams"
              control={<Radio />}
              label="Team-vs"
            />
            <FormControlLabel
              value="h2h"
              control={<Radio />}
              label="Head to head"
            />
          </RadioGroup>
        </div>
        <div />
        <div />
        <Button type="submit" onSubmit={(e) => console.log("da", e)}>
          Compare
        </Button>
      </form>
    </div>
  )
}
