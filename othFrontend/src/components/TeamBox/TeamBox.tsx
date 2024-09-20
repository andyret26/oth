import { Tournament } from "../../helpers/interfaces"
import "./TeamBox.scss"

interface CompProps {
  t: Tournament
}
export default function TeamBox({ t }: CompProps) {
  return (
    <div className="team-box">
      {t.teamMates.map((tm) => (
        <div key={tm.id} className="team-box__player">
          <img
            className="team-box__player-avatar"
            src={tm.avatar_url}
            alt="avatar"
          />
          {tm.username}
          <img
            src={`https://flagsapi.com/${tm.country_code}/shiny/64.png`}
            alt="Flag"
            className="team-box__player-flag"
          />
        </div>
      ))}
    </div>
  )
}
