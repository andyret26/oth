import { useState } from "react"
import { Link } from "react-router-dom"
import { TbEdit, TbTournament, TbFileSpreadsheet } from "react-icons/tb"
import dayjs from "dayjs"
import { Tournament } from "../../helpers/interfaces"
import ShowTeamBox from "../ShowTeamBox"
import "./TourneyCard.scss"

interface CompProps {
  tournament: Tournament
  logdinId: number
}

export default function TourneyCard({ tournament, logdinId }: CompProps) {
  const [showTeam, setShowTeam] = useState<boolean>(false)
  const t = tournament
  return (
    <div className="tournament-card">
      <div className="tournament-card__bg-image">
        <img
          style={{ height: "100%", width: "100%" }}
          src={
            t.imageLink
              ? t.imageLink
              : "https://i.ytimg.com/vi/isjoS8N4QZk/maxresdefault.jpg"
          }
          alt="img"
          onError={(e) => {
            e.currentTarget.src =
              "https://i.ytimg.com/vi/isjoS8N4QZk/maxresdefault.jpg"
          }}
        />
      </div>
      <div id="tourney-card" className="tournament-card__content">
        <div className="">
          <p className="">{t.name}</p>
        </div>
        {logdinId === t.addedById ? (
          <Link className="" to={`/tournament/edit/${t.id}`}>
            <TbEdit size={20} />
          </Link>
        ) : null}
        <div className="">
          <div className="">
            <p className={`t-placement ${t.placement.substring(1, 3)}`}>
              {t.placement === "Did Not Qualify"
                ? "DNQ"
                : t.placement.split("(")[0]}
            </p>
            {t.seed ? <p className="t-seed">Seed: {t.seed}</p> : null}
          </div>
          <p className="">{t.rankRange}</p>

          <p className="">{dayjs(t.date).format("DD MMM YYYY")}</p>
        </div>

        <div className="">
          {t.forumPostLink ? (
            <a
              href={t.forumPostLink}
              className=""
              target="_blank"
              rel="noopener noreferrer"
            >
              Forum Post
            </a>
          ) : null}
          {t.bracketLink ? (
            <a
              href={t.bracketLink}
              className=""
              target="_blank"
              rel="noopener noreferrer"
            >
              <TbTournament size={17} className="" />
              <p className="inline">Bracket</p>
            </a>
          ) : null}
          {t.mainSheetLink ? (
            <a
              href={t.mainSheetLink}
              className=""
              target="_blank"
              rel="noopener noreferrer"
            >
              <TbFileSpreadsheet size={17} className="" />
              <p className="inline">Sheet</p>
            </a>
          ) : null}
        </div>

        {t.teamMates.length > 1 ? (
          <div className="">
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
              className=""
            >
              {t.teamName}
            </div>
          </div>
        ) : null}

        {showTeam ? <ShowTeamBox t={t} /> : null}
        <div className="">
          <p>{t.teamSize}</p>
          <p>{t.format}</p>
        </div>
      </div>
    </div>
  )
}
