import { useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { RadioGroup, InputFiled, StandardBtn } from "@components/common"
import {
  AddPlayerAsync,
  AddPlayerByUsernameAsync,
} from "../../services/othApiService"
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
        onChange={(e) => setAddBy(e as "id" | "username")}
        direction="row"
      />

      <InputFiled
        value={userToAdd}
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
