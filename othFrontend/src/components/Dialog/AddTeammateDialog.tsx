import { Tooltip } from "@mui/material"
import { useEffect, useState } from "react"
import InfoIcon from "@mui/icons-material/Info"
import ChooseTeamSearch from "./ChooseTeamSearch"
import { GetPlayersMinAsync } from "../../services/othApiService"
import { PlayerMin } from "../../helpers/interfaces"
import PlayerMinCard from "../PlayerMinCard/PlayerMinCard"
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
    <div className="dialog-overlay">
      <div className="dialog">
        <div className="dialog__header">
          <div>
            <h2>Choose team members</h2>
            <p>
              Search your roster, add players quickly, and remove any selection
              before saving.
            </p>
          </div>
          <Tooltip
            title={
              <div>
                <p>Can&apos;t find the player you are looking for?</p>
                <p>Go to Add Player and add them.</p>
                <br />
                <p>
                  You can choose to skip teammates now and update the tournament
                  later.
                </p>
              </div>
            }
          >
            <InfoIcon className="dialog__info-icon" />
          </Tooltip>
        </div>

        <div className="dialog__body">
          <div className="dialog__column">
            <ChooseTeamSearch
              players={players}
              selectedPlayers={selectedPlayers}
              setSelectedPlayers={setSelectedPlayers}
            />
          </div>

          <div className="dialog__column dialog__column--summary">
            <div className="dialog__summary-card">
              <h3>Selected players</h3>
              <p>
                {selectedPlayers.length > 0
                  ? `${selectedPlayers.length} selected`
                  : "No players selected yet."}
              </p>
              <div className="dialog__selected-list">
                {selectedPlayers.length ? (
                  selectedPlayers.map((player) => (
                    <PlayerMinCard
                      key={player.id}
                      player={player}
                      hasXBtn
                      onXClick={() =>
                        setSelectedPlayers((prev) =>
                          prev.filter((p) => p.id !== player.id)
                        )
                      }
                    />
                  ))
                ) : (
                  <span className="dialog__placeholder">
                    Use the search on the left to add teammates.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="dialog__footer">
          <StandardBtn
            onClick={() => onClose("onCloseDialog")}
            btnText="Save teammates"
            color="blue"
          />
        </div>
      </div>
    </div>
  )
}
