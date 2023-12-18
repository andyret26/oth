import { Button, Dialog, DialogTitle, Tooltip } from "@mui/material"
import { useEffect, useState } from "react"
import InfoIcon from "@mui/icons-material/Info"
import ChooseTeamSearch from "./ChooseTeamSearch"
import { GetPlayersMinAsync } from "../services/othApiService"
import { PlayerMin } from "../helpers/interfaces"

export interface SimpleDialogProps {
  open: boolean
  onClose: (value: string) => void
  selectedPlayers: PlayerMin[]
  setSelectedPlayers: React.Dispatch<React.SetStateAction<PlayerMin[]>>
}

export function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open, selectedPlayers, setSelectedPlayers } = props

  const [players, setPlayers] = useState<PlayerMin[] | null>(null)

  useEffect(() => {
    const fetchPlayers = async () => {
      setPlayers(await GetPlayersMinAsync())
    }
    fetchPlayers()
  }, [])

  const handleClose = () => {
    const test = [1, 2, 3]
    onClose(JSON.stringify(test))
  }

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="md">
      <div className="flex items-center">
        <DialogTitle>Choose team members</DialogTitle>
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
      <div className="w-full max-h-96 p-6">
        <ChooseTeamSearch
          players={players}
          selectedPlayers={selectedPlayers}
          setSelectedPlayers={setSelectedPlayers}
        />
        <div className="pb-5 w-full flex justify-end">
          <Button
            variant="contained"
            sx={{ width: "12vw" }}
            onClick={() => onClose("Hi")}
          >
            Add
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
