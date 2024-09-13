import { useState } from "react"
import "./SelectBox.scss"

interface Props {
  options: Options[]
  onChange: (value: string) => void
}

interface Options {
  label: string
  value: string
}

function SelectBox({ options, onChange }: Props) {
  const [currentValue, setCurrentValue] = useState<string>()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentValue(e.target.value)
    onChange(e.target.value)
  }
  return (
    <select className="select" onChange={handleChange} value={currentValue}>
      {options.map((o) => (
        <option value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}

export default SelectBox
