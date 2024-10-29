import { useState } from "react"
import "../../pages/MatchCompare/MatchCompare.scss"
import { AxiosError } from "axios"
import toast from "react-hot-toast"
import { MatchCompareRequest, MapV1 } from "../../helpers/interfaces"
import { compareMatches } from "../../services/othApiService"
import InputField from "../common/InputFiled/InputField"
import matchCompareForm from "../../helpers/matchCompareForm.json"
import CheckBox from "../common/CheckBox/CheckBox"
import RadioGroup from "../common/RadioGroup/RadioGroup"
import StandardBtn from "../common/standardBtn/StandardBtn"

interface CompProps {
  onCompare: (data: MapV1[]) => void
}

export default function MatchCompareForm({ onCompare }: CompProps) {
  const [form, setForm] = useState<MatchCompareRequest>(matchCompareForm)
  const [ignoreMaps, setIgnoreMaps] = useState(false)

  const onSubmit = async () => {
    toast.loading("Comparing matches...")
    try {
      const res = await compareMatches(form)
      toast.dismiss()
      onCompare(res)
    } catch (e: unknown) {
      toast.dismiss()
      if (e instanceof AxiosError) {
        toast.error(e.response?.data.detail)
      } else {
        toast.error("An error occurred")
      }
    }
  }

  return (
    <div className="compare__form">
      <div className="compare__lobby-inputs">
        <InputField
          label="Lobby 1 id"
          value={String(form.matchId1)}
          onChange={(e) =>
            setForm({ ...form, matchId1: parseInt(e.target.value, 10) })
          }
        />
        <InputField
          label="Lobby 2 id"
          value={String(form.matchId2)}
          onChange={(e) =>
            setForm({ ...form, matchId2: parseInt(e.target.value, 10) })
          }
        />
      </div>

      <div>
        <CheckBox
          id="ignore-maps-check"
          value={ignoreMaps}
          onChange={(v) => setIgnoreMaps(v)}
          label="Ignore maps?"
        />
      </div>
      {ignoreMaps ? (
        <div className="compare__ignore-inputs">
          <div className="">
            <InputField
              label="Ignore start 1"
              value={String(form.ignoreStart1)}
              onChange={(e) =>
                setForm({ ...form, ignoreStart1: parseInt(e.target.value, 10) })
              }
            />
            <InputField
              label="Ignore end 1"
              value={String(form.ignoreEnd1)}
              onChange={(e) =>
                setForm({ ...form, ignoreEnd1: parseInt(e.target.value, 10) })
              }
            />
          </div>
          <div className="">
            <InputField
              label="Ignore start 2"
              value={String(form.ignoreStart2)}
              onChange={(e) =>
                setForm({ ...form, ignoreStart2: parseInt(e.target.value, 10) })
              }
            />
            <InputField
              label="Ignore end 2"
              value={String(form.ignoreEnd2)}
              onChange={(e) =>
                setForm({ ...form, ignoreEnd2: parseInt(e.target.value, 10) })
              }
            />
          </div>
        </div>
      ) : null}
      <div className="compare__team-type">
        <RadioGroup
          id="rg-team-type"
          label="Team Type"
          value={form.teamType}
          options={[
            { label: "Team-vs", value: "teams" },
            { label: "Head to head", value: "h2h" },
          ]}
          onChange={(v) => setForm({ ...form, teamType: v })}
        />
      </div>

      {form.teamType === "h2h" ? (
        <div className="compare__names">
          <InputField
            label="User 1 Id"
            value={String(form.user1Id)}
            onChange={(e) =>
              setForm({ ...form, user1Id: parseInt(e.target.value, 10) })
            }
          />
          <InputField
            label="User 2 Id"
            value={String(form.user2Id)}
            onChange={(e) =>
              setForm({ ...form, user2Id: parseInt(e.target.value, 10) })
            }
          />
        </div>
      ) : (
        <div className="compare__team-color">
          <div>
            <RadioGroup
              id="tester532423"
              label="Color team 1"
              value={form.team1Color}
              options={[
                { label: "Red", value: "red" },
                { label: "Blue", value: "blue" },
              ]}
              onChange={(v) => setForm({ ...form, team1Color: v })}
            />
          </div>
          <div>
            <RadioGroup
              id="tester123"
              label="Color team 2"
              value={form.team2Color}
              options={[
                { label: "Red", value: "red" },
                { label: "Blue", value: "blue" },
              ]}
              onChange={(v) => setForm({ ...form, team2Color: v })}
            />
          </div>
        </div>
      )}
      <StandardBtn onClick={() => onSubmit()} color="blue" btnText="Compare" />
    </div>
  )
}
