import { Button } from "@mui/material"

export default function History() {
  async function handleClick() {
    const x = 1
    return x
  }
  return (
    <div>
      <h1>History</h1>
      <Button onClick={() => handleClick()}>Get</Button>
    </div>
  )
}
