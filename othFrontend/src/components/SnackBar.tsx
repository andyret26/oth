import { Alert, Snackbar } from "@mui/material"
import { useEffect, useState } from "react"

interface CompProps {
  open: boolean
  hideAfterDuration: number
  severity: "success" | "error" | "warning" | "info"
}
export default function SnackBar({
  open,
  hideAfterDuration,
  severity,
}: CompProps) {
  const [open2, setOpen] = useState<boolean>(false)

  useEffect(() => {
    setOpen(open)
  }, [open])

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  return (
    <Snackbar
      open={open2}
      autoHideDuration={hideAfterDuration}
      onClose={handleClose}
    >
      <Alert severity={severity} sx={{ width: "100%" }} onClose={handleClose}>
        This is a success message!
      </Alert>
    </Snackbar>
  )
}
