import { Dialog, DialogTitle } from "@mui/material"
import ChooseTeamSearch from "./ChooseTeamSearch"

export interface SimpleDialogProps {
  open: boolean
  onClose: (value: string) => void
}

export function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open } = props

  const handleClose = () => {
    const test = [1, 2, 3]
    onClose(JSON.stringify(test))
  }

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="md">
      <DialogTitle>Choose team members</DialogTitle>
      <div className="w-full max-h-96 p-6">
        <ChooseTeamSearch />
      </div>
    </Dialog>
  )
}
