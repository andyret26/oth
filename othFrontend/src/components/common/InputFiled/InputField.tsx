import { useEffect, useMemo, useState, useId } from "react"
import { IconType } from "react-icons/lib"
import "./InputFiled.scss"

interface Props {
  placeholder?: string
  Icon?: IconType
  bgColor?: string
  maxTextLength?: number
  label?: string
  maxWidth?: string
  error?: boolean
  value: string | null | undefined
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function InputFiled({
  bgColor,
  Icon,
  label,
  maxTextLength,
  maxWidth,
  placeholder,
  onChange,
  value,
  error,
}: Props) {
  const id = useId()
  const [text, setText] = useState<string | null | undefined>("")

  const validTextLength = useMemo<boolean>(() => {
    const modelText = text

    if (modelText && maxTextLength && modelText.length > maxTextLength) {
      return false
    }
    return true
  }, [text, maxTextLength])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
    onChange(e)
  }

  useEffect(() => {
    setText(value)
  }, [value])

  return (
    <div
      className="input"
      style={{
        maxWidth,
        outline: error ? " 1px solid var(--osu-red)" : "unset",
      }}
    >
      <label className="input__label" v-if="label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="input__field"
        type="text"
        value={text || ""}
        onChange={(e) => handleChange(e)}
        placeholder={placeholder}
        autoComplete="off"
        style={{
          backgroundColor: bgColor,
          outline: validTextLength ? "none" : "2px solid var(--osu-red)",
          marginTop: label ? "5px" : "0",
        }}
      />
      <div className="input__icon">{Icon ? <Icon size={20} /> : null}</div>
    </div>
  )
}

InputFiled.defaultProps = {
  bgColor: "var(--bg3)",
  maxWidth: "200px",
  error: false,
}

export default InputFiled
