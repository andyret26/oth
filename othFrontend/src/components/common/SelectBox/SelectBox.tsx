import { useState } from "react"
import "./SelectBox.scss"

interface Props {
  label?: string
  id: string
  options: Options[] | string[]
  onChange: (value: string) => void
}

interface Options {
  label: string
  value: string
}

function SelectBox({ options, onChange, id, label }: Props) {
  const [currentValue, setCurrentValue] = useState<string>()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentValue(e.target.value)
    onChange(e.target.value)
  }
  return (
    <div className="select">
      {label ? (
        <label className="select__label" htmlFor={id}>
          {label}
        </label>
      ) : null}
      <select
        id={id}
        className="select__field"
        onChange={handleChange}
        value={currentValue}
        style={{ height: "40px" }}
      >
        {options.every((item) => typeof item === "string")
          ? options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))
          : options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
      </select>
    </div>
  )
}

export default SelectBox
