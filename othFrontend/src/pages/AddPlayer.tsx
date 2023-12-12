import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material"
import { useState } from "react"

export default function AddPlayer() {
  const [addBy, setAddBy] = useState<"id" | "username">("id")
  const [userToAdd, setUserToAdd] = useState<string>("")
  const [error, setError] = useState<string>("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (addBy === "id") {
      console.log("add by id")
      if (/^\d+$/.test(userToAdd)) {
        console.log("is number")
      } else {
        setError("Id must be a number")
      }
    } else if (addBy === "username") {
      console.log("add by username")
    } else {
      console.log("nothing error ??")
    }
  }

  return (
    <div className="h-[50vh] flex flex-col gap-3 justify-center items-center">
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Add by</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="id"
          name="radio-buttons-group"
          row
          value={addBy}
          onChange={(e) => setAddBy(e.target.value as "id" | "username")}
        >
          <FormControlLabel value="id" control={<Radio />} label="Id" />
          <FormControlLabel
            value="username"
            control={<Radio />}
            label="Username"
          />
        </RadioGroup>
      </FormControl>
      <form onSubmit={(e) => handleSubmit(e)} className=" flex flex-col gap-4">
        <TextField
          variant="outlined"
          label={addBy}
          value={userToAdd}
          onChange={(e) => {
            setUserToAdd(e.target.value)
            setError("")
          }}
          autoComplete="off"
          error={error !== ""}
          helperText={error}
        />
        <Button variant="contained" type="submit">
          Add
        </Button>
      </form>
    </div>
  )
}
