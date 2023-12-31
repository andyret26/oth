import { TextField } from "@mui/material"
import React, { useState } from "react"
import { TbSearch, TbCheck } from "react-icons/tb"
import { PlayerMin } from "../helpers/interfaces"
import NameCard from "./NameCard"

interface CompProps {
  selectedPlayers: PlayerMin[]
  players: PlayerMin[] | null
  setSelectedPlayers: React.Dispatch<React.SetStateAction<PlayerMin[]>>
}

const ChooseTeamSearch = (props: CompProps) => {
  const { selectedPlayers, players, setSelectedPlayers } = props
  const [query, setQuery] = useState<string>("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const onPlayerClick = (player: PlayerMin) => {
    if (selectedPlayers.some((p) => p.id === player.id)) return
    setSelectedPlayers([...selectedPlayers, player])
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full">
        <TextField
          type="text"
          value={query}
          size="small"
          onChange={handleChange}
          placeholder="Search Player"
          InputProps={{
            startAdornment: <TbSearch size={20} className="mr-3" />,
          }}
        />
      </div>

      <div className="w-full z-50 rounded-md flex flex-wrap gap-2 bg-[var(--bg2)] p-5 max-h-60 overflow-y-scroll">
        {players
          ?.filter(
            (p) =>
              !query || p.username.toLowerCase().includes(query.toLowerCase())
          )
          .map((p) => (
            <div
              key={p.id}
              className="flex items-center bg-[#4e3c44] hover:bg-[#6b535e] p-2 rounded-md gap-3"
              onClick={() => onPlayerClick(p)}
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  onPlayerClick(p)
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div>
                <p className="">{p.username}</p>
                <p className="text-xs">{p.id}</p>
              </div>
              <div className="bg-[var(--bg2)] w-5 h-5 flex items-center justify-center rounded-full hover:bg-[var(--bg1)]">
                {selectedPlayers.some((pl) => pl.id === p.id) ? (
                  <TbCheck className="rounded-full bg-white text-green-500 " />
                ) : null}
              </div>
            </div>
          ))}
      </div>
      <div className="flex flex-col gap-2">
        <h1>Players you want to add</h1>
        <div className="w-full z-50 rounded-md flex flex-wrap gap-2 pb-5">
          {selectedPlayers.map((p) => (
            <NameCard
              key={p.id}
              selectedPlayers={selectedPlayers}
              setSelectedPlayers={setSelectedPlayers}
              player={p}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChooseTeamSearch
