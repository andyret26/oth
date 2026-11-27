import { useId, useState } from "react"
import { IconType } from "react-icons/lib"
import "./InputFiled.scss"

interface Props {
  placeholder?: string
  Icon?: IconType
  bgColor?: string
  maxTextLength?: number
  minTextLength?: number
  label?: string
  maxWidth?: string
  error?: boolean
  value: string | null | undefined
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function InputFiled({
  bgColor = "var(--bg3)",
  Icon,
  label,
  maxTextLength,
  minTextLength,
  maxWidth = "200px",
  placeholder,
  onChange,
  value,
  error = false,
}: Props) {
  const id = useId()
  const [reachedMinLimit, setReareachedMinLimit] = useState<boolean>(false)

  const text = value ?? ""

  const isLengthValid =
    (maxTextLength == null || text.length <= maxTextLength) &&
    (minTextLength == null || text.length >= minTextLength)
  const isInvalid = error || (reachedMinLimit && !isLengthValid)

  return (
    <div
      className="input"
      style={{
        maxWidth,
      }}
    >
      {label ? <label className="input__label" htmlFor={id}>{label}</label> : null}

      <input
        id={id}
        className={`input__field${isInvalid ? " input__field--error" : ""}`}
        type="text"
        value={text}
        onChange={onChange}
        onBlur={() => setReareachedMinLimit(true)}
        placeholder={placeholder}
        autoComplete="off"
        style={{
          backgroundColor: bgColor,
          marginTop: label ? "5px" : "0",
        }}
      />
      <div className="input__icon">{Icon ? <Icon size={20} /> : null}</div>
    </div>
  )
}

export default InputFiled
