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
  btnText,
  color,
  disabled,
  textColor,
  onClick,
  margin,
}: Props) {
  return (
    <button
      className="btn"
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

StandardBtn.defaultProps = {
  btnText: "Defualt",
  color: "pink",
  textColor: "white",
  disabled: false,
  margin: "0px",
}
