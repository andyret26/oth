import "./RadioGroup.scss"

interface RadioOption {
  label: string
  value: string
}

interface Props {
  id: string
  label?: string
  labelPosition?: "top-left" | "top-center"
  value: string
  options: RadioOption[]
  direction?: "row" | "column"
  onChange: (newValue: string) => void
}

function RadioGroup({
  id,
  options,
  value,
  direction,
  label,
  onChange,
  labelPosition,
}: Props) {
  return (
    <div className="radio-group">
      {label ? (
        <legend
          className="radio-group__label"
          style={{
            textAlign: labelPosition === "top-center" ? "center" : "unset",
          }}
        >
          {label}
        </legend>
      ) : null}
      <div className="radio-group__fields" style={{ flexDirection: direction }}>
        {options.map((option) => (
          <div className="radio-group__field" key={option.value}>
            <div
              role="radio"
              tabIndex={0}
              className="radio-group__input"
              id={`${id}-${option.value}`}
              onClick={() => onChange(option.value)}
              aria-checked={value === option.value}
            >
              {option.value === value ? (
                <div className="radio-group__dot" />
              ) : null}
            </div>
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

RadioGroup.defaultProps = {
  labelPosition: "top-center",
}

export default RadioGroup
