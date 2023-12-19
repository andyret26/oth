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
import { useAuth0 } from "@auth0/auth0-react"
import { AxiosError } from "axios"
import toast from "react-hot-toast"
import {
  AddPlayerAsync,
  AddPlayerByUsernameAsync,
} from "../services/othApiService"

export default function AddPlayer() {
  const { getIdTokenClaims } = useAuth0()

  const [addBy, setAddBy] = useState<"id" | "username">("id")
  const [userToAdd, setUserToAdd] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()
    const claims = await getIdTokenClaims()
    try {
      if (addBy === "id") {
        if (/^\d+$/.test(userToAdd)) {
          await AddPlayerAsync(parseInt(userToAdd, 10), claims!.__raw)
        } else {
          setError("Id must be a number")
        }
      } else if (addBy === "username") {
        await AddPlayerByUsernameAsync(userToAdd, claims!.__raw)
      } else {
        console.log("nothing error ??")
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          toast.error(err.response.data)
        }
        if (err.response?.status === 404) {
          toast.error(err.response.data)
        }
      }
    } finally {
      setLoading(false)
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
        <Button variant="contained" type="submit" disabled={loading}>
          <div>{loading ? "Adding..." : "Add"}</div>
        </Button>
      </form>
    </div>
  )
}
