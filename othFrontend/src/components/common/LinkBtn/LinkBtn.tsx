import { useState } from "react"
import "./LinkBtn..scss"

interface Props {
  children: React.ReactNode
  href: string
  color:
    | "purple"
    | "blue"
    | "green"
    | "pink"
    | "brown"
    | "yellow"
    | "red"
    | "none"
  textColor?: "black" | "white"
}

const LinkBtn: React.FC<Props> = ({ children, href, color, textColor }) => {
  const [isHover, setisHover] = useState<boolean>(false)
  return (
    <a
      className="link-btn"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        backgroundColor: isHover ? `var(--osu-${color})` : "#00000055",
        color: isHover ? textColor : `var(--osu-${color})`,
        borderColor: `var(--osu-${color})`,
      }}
      onMouseEnter={() => setisHover(true)}
      onMouseLeave={() => setisHover(false)}
    >
      {children}
    </a>
  )
}

export default LinkBtn
