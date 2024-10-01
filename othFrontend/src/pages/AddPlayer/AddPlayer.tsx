import { useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { AxiosError } from "axios"
import toast from "react-hot-toast"
import RadioGroup from "../../components/common/RadioGroup/RadioGroup"
import {
  AddPlayerAsync,
  AddPlayerByUsernameAsync,
} from "../../services/othApiService"
import InputFiled from "../../components/common/InputFiled/InputField"
import StandardBtn from "../../components/common/standardBtn/StandardBtn"
import "./AddPlayer.scss"

export default function AddPlayer() {
  const { getIdTokenClaims } = useAuth0()

  const [addBy, setAddBy] = useState<"id" | "username">("id")
  const [userToAdd, setUserToAdd] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async () => {
    setLoading(true)
    const claims = await getIdTokenClaims()
    try {
      if (addBy === "id") {
        if (/^\d+$/.test(userToAdd)) {
          await AddPlayerAsync(parseInt(userToAdd, 10), claims!.__raw)
        } else {
          setError(true)
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
    <div className="add-player">
      <RadioGroup
        id="player-add"
        options={[
          { label: "Id", value: "id" },
          { label: "Username", value: "username" },
        ]}
        value={addBy}
        onChange={(e) => setAddBy(e.value as "id" | "username")}
        direction="row"
      />

      <InputFiled
        onChange={(e) => {
          setUserToAdd(e.target.value)
          setError(false)
        }}
        placeholder={addBy}
        error={error}
      />
      <StandardBtn
        disabled={loading}
        onClick={handleSubmit}
        btnText={loading ? "Adding..." : "Add"}
        color="blue"
      />
    </div>
  )
}
