import { TbCheck, TbX } from "react-icons/tb"
import { PlayerMin } from "../../helpers/interfaces"
import "./PlayerMinCard.scss"

interface Props {
  player: PlayerMin
  onCardClick?: (player: PlayerMin) => void
  onCheckClick?: (player: PlayerMin) => void
  onXClick?: (player: PlayerMin) => void
  hasCheckBtn?: boolean
  hasXBtn?: boolean
}

export default function PlayerMinCard({
  player,
  onCardClick,
  onCheckClick,
  onXClick,
  hasCheckBtn,
  hasXBtn,
}: Props) {
  const HandleCheckClick = () => {
    if (onCheckClick) onCheckClick(player)
  }
  const HandleXClick = () => {
    if (onXClick) onXClick(player)
  }
  return (
    <div
      className="player-min-card"
      tabIndex={0}
      key={player.id}
      role="button"
      onClick={() => {
        if (onCardClick) {
          onCardClick(player)
        }
      }}
    >
      <div>
        <p className="player-min-card__username">{player.username}</p>
        <p className="player-min-card__id">{player.id}</p>
      </div>

      {hasCheckBtn === false && hasXBtn === false ? null : (
        <div className="player-min-card__buttons">
          {hasCheckBtn ? (
            <TbCheck
              title="Add"
              tabIndex={0}
              className="player-min-card__check"
              onClick={() => HandleCheckClick()}
              onKeyUp={(e) => {
                if (e.key === "Enter") HandleCheckClick()
              }}
            />
          ) : null}
          {hasXBtn ? (
            <TbX
              title="Remove"
              tabIndex={0}
              className="player-min-card__x"
              onClick={() => HandleXClick()}
              onKeyUp={(e) => {
                if (e.key === "Enter") HandleXClick()
              }}
            />
          ) : null}
        </div>
      )}
    </div>
  )
}
