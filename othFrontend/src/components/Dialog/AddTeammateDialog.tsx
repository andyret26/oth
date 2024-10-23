import { Tooltip } from "@mui/material"
import { useEffect, useState } from "react"
import InfoIcon from "@mui/icons-material/Info"
import ChooseTeamSearch from "./ChooseTeamSearch"
import { GetPlayersMinAsync } from "../../services/othApiService"
import { PlayerMin } from "../../helpers/interfaces"
import "./AddTeammateDialog.scss"
import StandardBtn from "../common/standardBtn/StandardBtn"

interface Props {
  onClose: (value: string) => void
  selectedPlayers: PlayerMin[]
  setSelectedPlayers: React.Dispatch<React.SetStateAction<PlayerMin[]>>
}

export function SimpleDialog({
  onClose,

  selectedPlayers,
  setSelectedPlayers,
}: Props) {
  const [players, setPlayers] = useState<PlayerMin[] | null>(null)

  useEffect(() => {
    const fetchPlayers = async () => {
      setPlayers(await GetPlayersMinAsync())
    }
    fetchPlayers()
  }, [])

  return (
    <div className="dialog">
      <div className="">
        <div>Choose team members</div>
        <Tooltip
          title={
            <div>
              <p>Can&apos;t finde the player you are looking for?</p>
              <p>Go to Add Player and add them.</p>
              <br />
              <p>
                You can choose to not add them here and update the tournament
                later when you have added them
              </p>
            </div>
          }
        >
          <InfoIcon />
        </Tooltip>
      </div>
      <div className="dialog__search">
        <ChooseTeamSearch
          players={players}
          selectedPlayers={selectedPlayers}
          setSelectedPlayers={setSelectedPlayers}
        />

        <StandardBtn
          onClick={() => onClose("onCloseDialog")}
          btnText="Add"
          color="blue"
          margin="10px 0px 0px 0px"
        />
      </div>
    </div>
  )
}
