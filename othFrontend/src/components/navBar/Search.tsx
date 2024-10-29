import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { TbSearch } from "react-icons/tb"
import { PlayerMin } from "../../helpers/interfaces"
import { GetPlayersMinAsync } from "../../services/othApiService"
import "./Search.scss"
import InputFiled from "../common/InputFiled/InputField"

const Search = () => {
  const [query, setQuery] = useState<string>("")
  const [players, setPlayers] = useState<PlayerMin[] | null>(null)
  const [searchPlayers, setSearchPlayers] = useState<PlayerMin[] | null>(null)
  const searchDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (players === null) {
      const fetchPlayers = async () => {
        setPlayers(await GetPlayersMinAsync())
      }
      fetchPlayers()
    }
  }, [players])

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

  const handleClickOutside = (e: MouseEvent) => {
    if (
      searchDropdownRef.current &&
      !searchDropdownRef.current.contains(e.target as Node)
    ) {
      setSearchPlayers(null)
      setQuery("")
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="search">
      <InputFiled value={query} Icon={TbSearch} onChange={handleChange} />

      {searchPlayers ? (
        <div className="search__dropdown" ref={searchDropdownRef}>
          {searchPlayers?.map((p) => (
            <div key={p.id} className="search__row">
              <Link
                className="search__link"
                to={`/history/${p.id}`}
                onClick={() => handleSearchClick()}
                data-cy={`player-${p.id}`}
              >
                {p.username}
              </Link>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default Search
