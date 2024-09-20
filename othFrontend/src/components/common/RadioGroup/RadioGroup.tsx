import "./RadioGroup.scss"

interface RadioOption {
  label: string
  value: string
}

interface Props {
  id: string
  label?: string
  value: string
  options: RadioOption[]
  direction?: "row" | "column"
  onChange: (newValue: RadioOption) => void
}

function RadioGroup({ id, options, value, direction, label, onChange }: Props) {
  const handleFieldKeypress = (
    e: React.KeyboardEvent<HTMLDivElement>,
    option: RadioOption
  ) => {
    if (e.key === "Enter") {
      onChange(option)
    }
  }
  return (
    <div className="radio-group">
      <legend v-if="label" className="radio-group__label">
        {label}
      </legend>
      <div className="radio-group__fields" style={{ flexDirection: direction }}>
        {options.map((option) => (
          <div
            role="button"
            className="radio-group__field"
            key={option.label}
            tabIndex={0}
            onKeyDown={(e) => handleFieldKeypress(e, option)}
          >
            <input
              className="radio-group__input"
              id={`${id}-${option.value}`}
              name="id"
              type="radio"
              onChange={() => onChange(option)}
              checked={value === option.value}
            />
            <label
              className="radio-group__input-label"
              htmlFor={`${id}-${option.value}`}
            >
              {option.label}
            </label>
            <span className="radio-group__checkbox" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default RadioGroup
