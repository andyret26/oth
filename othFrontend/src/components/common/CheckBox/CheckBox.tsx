import { TbCheck } from "react-icons/tb"
import "./CheckBox.scss"

interface Props {
  value: boolean
  onChange: (newValue: boolean) => void
  id: string
  label?: string
}
function CheckBox({ onChange, value, id, label }: Props) {
  return (
    <div className="checkbox">
      {label ? (
        <label className="checkbox__label" htmlFor={id}>
          {label}
        </label>
      ) : null}
      <div
        id={id}
        className="checkbox__input"
        role="checkbox"
        tabIndex={0}
        aria-checked={value}
        onClick={() => onChange(!value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") onChange(!value)
        }}
        style={{ backgroundColor: value ? "var(--osu-pink)" : "" }}
      >
        {value ? <TbCheck className="checkbox__check" size={20} /> : null}
      </div>
    </div>
  )
}

export default CheckBox
