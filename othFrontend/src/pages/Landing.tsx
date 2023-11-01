import { Test } from "../services/osuApiService"

export default function Landing() {
  const handleClick = () => {
    Test()
  }
  return (
    <div>
      <button type="button" onClick={() => handleClick()}>
        CLick
      </button>
    </div>
  )
}
