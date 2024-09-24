import React from "react"
import { TbX } from "react-icons/tb"
import { PlayerMin } from "../helpers/interfaces"

interface CompProps {
  selectedPlayers: PlayerMin[]
  setSelectedPlayers: React.Dispatch<React.SetStateAction<PlayerMin[]>>
  player: PlayerMin
}

export default function NameCard(props: CompProps) {
  const { selectedPlayers, setSelectedPlayers, player } = props
  return (
    <div
      key={player.id}
      className="flex items-center bg-[#4e3c44] p-2 rounded-md gap-3"
    >
      <div>
        <p className="">{player.username}</p>
        <p className="text-xs">{player.id}</p>
      </div>
      <div className="bg-[var(--bg2)] w-5 h-5 flex items-center justify-center rounded-full hover:bg-[var(--bg1)]">
        <TbX
          role="button"
          tabIndex={0}
          onClick={() =>
            setSelectedPlayers(selectedPlayers.filter((sp) => sp !== player))
          }
          onKeyUp={(event: React.KeyboardEvent<SVGElement>) => {
            if (event.key === "Enter") {
              setSelectedPlayers(selectedPlayers.filter((sp) => sp !== player))
            }
          }}
          className="hover:bg-red-500 hover:text-white rounded-full bg-white text-red-500 hover:cursor-pointer"
        />
      </div>
    </div>
  )
}
