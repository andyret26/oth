import { useState } from "react"
import { Link } from "react-router-dom"
import { TbEdit, TbTournament, TbFileSpreadsheet } from "react-icons/tb"
import dayjs from "dayjs"
import { Tournament } from "../helpers/interfaces"
import ShowTeamBox from "./ShowTeamBox"

interface CompProps {
  tournament: Tournament
  logdinId: number
}

export default function TourneyCard({ tournament, logdinId }: CompProps) {
  const [showTeam, setShowTeam] = useState<boolean>(false)
  const t = tournament
  return (
    <div className="rounded-lg">
      <div
        className="bg-image rounded-lg opacity-40 z-[-1]"
        style={{
          backgroundImage: t.imageLink
            ? `url(${t.imageLink})`
            : "url(https://i.ytimg.com/vi/isjoS8N4QZk/maxresdefault.jpg)",
        }}
      />
      <div id="tourney-card" className="tourney-card">
        <div className="border-b-[5px] rounded-md w-full flex justify-center border-[#ff66ab]">
          <p className="t-name z-10">{t.name}</p>
        </div>
        {logdinId === t.addedById ? (
          <Link
            className="absolute right-4 top-2 text-white/75 rounded-lg p-1 hover:bg-[#6c585e]"
            to={`/tournament/edit/${t.id}`}
          >
            <TbEdit size={20} />
          </Link>
        ) : null}
        <div className="w-full flex justify-between mt-2 z-10">
          <div className="flex flex-col items-center">
            <p className={`t-placement ${t.placement.substring(1, 3)}`}>
              {t.placement === "Did Not Qualify"
                ? "DNQ"
                : t.placement.split("(")[0]}
            </p>
            {t.seed ? <p className="t-seed">Seed: {t.seed}</p> : null}
          </div>
          <p className="pl-3">{t.rankRange}</p>

          <p className="text-white/75">{dayjs(t.date).format("DD MMM YYYY")}</p>
        </div>

        <div className="flex gap-2 absolute bottom-2 left-3 text-xs font-medium">
          {t.forumPostLink ? (
            <a
              href={t.forumPostLink}
              className="border-solid border-2 border-[#ff66ab] p-1 text-[#ff66ab] rounded-md hover:bg-[#ff66ab] hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Forum Post
            </a>
          ) : null}
          {t.bracketLink ? (
            <a
              href={t.bracketLink}
              className="border-solid border-2 border-[#02b6c3] p-1 text-[#02b6c3] rounded-md hover:bg-[#02b6c3] hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TbTournament size={17} className="inline mr-1" />
              <p className="inline">Bracket</p>
            </a>
          ) : null}
          {t.mainSheetLink ? (
            <a
              href={t.mainSheetLink}
              className="border-solid border-2 border-[#88da20] p-1 text-[#88da20] rounded-md hover:bg-[#88da20] hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TbFileSpreadsheet size={17} className="inline mr-1" />
              <p className="inline">Sheet</p>
            </a>
          ) : null}
        </div>

        {t.teamMates.length > 1 ? (
          <div className="absolute top-20 z-10">
            <div
              id="team"
              onMouseEnter={() => {
                setShowTeam(true)
              }}
              onMouseOut={() => {
                setShowTeam(false)
              }}
              onBlur={() => {
                setShowTeam(false)
              }}
              className="text-sm p-1 border-2 border-red-300 text-red-300 rounded-md hover:bg-red-300 hover:text-white hover:cursor-default"
            >
              {t.teamName}
            </div>
          </div>
        ) : null}

        {showTeam ? <ShowTeamBox t={t} /> : null}
        <div className="text-sm flex flex-col items-center absolute bottom-3 right-4">
          <p>{t.teamSize}</p>
          <p>{t.format}</p>
        </div>
      </div>
    </div>
  )
}
