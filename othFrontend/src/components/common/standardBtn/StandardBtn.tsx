import "./StandardBtn.scss"

interface Props {
  btnText?: string
  color?: "purple" | "blue" | "green" | "pink" | "brown" | "yellow" | "red"
  textColor?: string
  disabled?: boolean
  onClick: () => void
}

export default function StandardBtn({
  btnText,
  color,
  disabled,
  textColor,
  onClick,
}: Props) {
  return (
    <button
      className="btn"
      type="button"
      disabled={disabled}
      style={{ backgroundColor: `var(--osu-${color})`, color: textColor }}
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
}
