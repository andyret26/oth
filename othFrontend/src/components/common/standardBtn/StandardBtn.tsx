import "./StandardBtn.scss"

interface Props {
  btnText?: string
  color?: "purple" | "blue" | "green" | "pink" | "brown" | "yellow" | "red"
  textColor?: string
  disabled?: boolean
  onClick: () => void
  margin?: string
}

export default function StandardBtn({
  btnText = "Default",
  color = "pink",
  disabled = false,
  textColor = "white",
  onClick,
  margin = "0px",
}: Props) {
  return (
    <button
      className="standard-btn btn"
      type="button"
      disabled={disabled}
      style={{
        backgroundColor: `var(--osu-${color})`,
        color: textColor,
        margin,
      }}
      onClick={onClick}
    >
      {btnText}
    </button>
  )
}

