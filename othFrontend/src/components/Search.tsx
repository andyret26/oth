// Search.tsx

import { TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { TbSearch } from "react-icons/tb"
import { PlayerMin } from "../helpers/interfaces"
import { GetPlayersMinAsync } from "../services/othApiService"

const Search = () => {
  const [query, setQuery] = useState<string>("")
  const [players, setPlayers] = useState<PlayerMin[] | null>(null)
  const [searchPlayers, setSearchPlayers] = useState<PlayerMin[] | null>(null)

  useEffect(() => {
    const fetchPlayers = async () => {
      setPlayers(await GetPlayersMinAsync())
    }
    fetchPlayers()
  }, [])

  function handleSearch(searchtest: string): void {
    if (!players) {
      return
    }
    if (searchtest === "") {
      setSearchPlayers(null)
      return
    }
    const filtered = players.filter(
      (item) =>
        item.username.toLowerCase().includes(searchtest.toLowerCase()) ||
        item.id.toString().includes(searchtest.toLowerCase())
    )

    if (filtered.length === 0) {
      setSearchPlayers(null)
      return
    }
    setSearchPlayers(filtered)
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    handleSearch(event.target.value)
  }

  function handleSearchClick() {
    setSearchPlayers(null)
    setQuery("")
  }

  return (
    <div className="w-48">
      <TextField
        type="text"
        value={query}
        size="small"
        onChange={handleChange}
        placeholder="Search Player"
        data-cy="nav-search"
        InputProps={{
          startAdornment: <TbSearch size={20} className="mr-3" />,
        }}
      />

      {searchPlayers ? (
        <div className="w-44 bg-[#4e3c44] absolute z-50 rounded-md max-h-56 overflow-y-scroll">
          {searchPlayers?.map((p) => (
            <div key={p.id} className="hover:bg-[#6b535e]">
              <Link
                to={`/history/${p.id}`}
                onClick={() => handleSearchClick()}
                data-cy={`player-${p.id}`}
              >
                <p className="pl-3 py-1">{p.username}</p>
              </Link>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default Search
