import { IconType } from "react-icons/lib"
import "./IconBtn.scss"
import { forwardRef } from "react"

interface Props {
  Icon: IconType
  bgColor?:
    | "purple"
    | "blue"
    | "green"
    | "pink"
    | "brown"
    | "yellow"
    | "red"
    | "none"
  textColor?: string
  disabled?: boolean
  onClick: () => void
  size?: number
}

const IconBtn = forwardRef<HTMLButtonElement, Props>(
  (
    {
      Icon,
      onClick,
      bgColor = "purple",
      textColor = "black",
      disabled = false,
      size = 15,
    },
    ref
  ) => {
    return (
      <button
        type="button"
        className="icon-btn"
        onClick={onClick}
        disabled={disabled}
        style={{ backgroundColor: `var(--osu-${bgColor})`, color: textColor }}
        ref={ref}
      >
        <Icon size={size} />
      </button>
    )
  }
)

export default IconBtn
