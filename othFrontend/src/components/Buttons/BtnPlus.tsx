interface CompProps {
  onClick: () => void
}

export default function BtnPlus({ onClick }: CompProps) {
  return (
    <button type="button" onClick={onClick}>
      +
    </button>
  )
}
