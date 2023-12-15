import { Dialog, DialogTitle } from "@mui/material"

export interface SimpleDialogProps {
  open: boolean
  onClose: (value: string) => void
}

export function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open } = props

  const handleClose = () => {
    onClose("hello")
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <p>Hello</p>
    </Dialog>
  )
}
