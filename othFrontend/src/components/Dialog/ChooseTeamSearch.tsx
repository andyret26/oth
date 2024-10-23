import React, { useState } from "react"
import { TbSearch } from "react-icons/tb"
import { PlayerMin } from "../../helpers/interfaces"
import InputFiled from "../common/InputFiled/InputField"
import "./ChooseTeamSearch.scss"
import PlayerMinCard from "../PlayerMinCard/PlayerMinCard"

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

  const handleAddClick = (player: PlayerMin) => {
    if (selectedPlayers.some((p) => p.id === player.id)) return
    setSelectedPlayers([...selectedPlayers, player])
  }

  const handleXClick = (player: PlayerMin) => {
    setSelectedPlayers(selectedPlayers.filter((p) => p.id !== player.id))
  }

  return (
    <div className="teammate-search">
      <InputFiled
        placeholder="Search player"
        onChange={handleChange}
        value={query}
        Icon={TbSearch}
      />

      <div className="teammate-search__players">
        {players
          ?.filter(
            (p) =>
              !query || p.username.toLowerCase().includes(query.toLowerCase())
          )
          .map((p) => (
            <PlayerMinCard
              player={p}
              key={p.id}
              hasXBtn={selectedPlayers.some((pm) => p.id === pm.id)}
              hasCheckBtn={!selectedPlayers.some((pm) => p.id === pm.id)}
              onCheckClick={() => handleAddClick(p)}
              onXClick={() => handleXClick(p)}
            />
          ))}
      </div>
      <div className="">
        <h1>Players you want to add</h1>
        <div className="teammate-search__players">
          {selectedPlayers.map((p) => (
            <PlayerMinCard
              player={p}
              key={p.id}
              hasXBtn={selectedPlayers.some((pm) => p.id === pm.id)}
              onXClick={() => handleXClick(p)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChooseTeamSearch
