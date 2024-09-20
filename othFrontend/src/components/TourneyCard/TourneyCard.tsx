import { useState } from "react"
import { Link } from "react-router-dom"
import { TbEdit, TbTournament, TbFileSpreadsheet } from "react-icons/tb"
import dayjs from "dayjs"
import { Tournament } from "../../helpers/interfaces"
import TeamBox from "../TeamBox/TeamBox"
import "./TourneyCard.scss"
import LinkBtn from "../common/LinkBtn/LinkBtn"

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
      <div className="tournament-card__content">
        <div className="tournament-card__header">
          <p className="tournament-card__title">{t.name}</p>
        </div>
        {logdinId === t.addedById ? (
          <Link
            className="tournament-card__edit"
            to={`/tournament/edit/${t.id}`}
          >
            <TbEdit size={20} />
          </Link>
        ) : null}

        <div className="tournament-card__info">
          <div className="tournament-card__placement">
            <p className={`t-placement ${t.placement.substring(1, 3)}`}>
              {t.placement === "Did Not Qualify"
                ? "DNQ"
                : t.placement.split("(")[0]}
            </p>
            {t.seed ? <p className="t-seed">Seed: {t.seed}</p> : null}
          </div>
          <p className="">{t.rankRange}</p>

          <p className="tournament-card__date">
            {dayjs(t.date).format("DD MMM YYYY")}
          </p>
        </div>

        <div className="tournament-card__links">
          {t.forumPostLink ? (
            <LinkBtn href={t.forumPostLink} color="pink">
              Forum Post
            </LinkBtn>
          ) : null}
          {t.bracketLink ? (
            <LinkBtn href={t.bracketLink} color="blue">
              <TbTournament size={17} />
              <p className="inline">Bracket</p>
            </LinkBtn>
          ) : null}
          {t.mainSheetLink ? (
            <LinkBtn href={t.mainSheetLink} color="green" textColor="black">
              <TbFileSpreadsheet size={17} />
              <p className="inline">Sheet</p>
            </LinkBtn>
          ) : null}
        </div>

        {t.teamMates.length > 1 ? (
          <div className="tournament-card__team">
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

        {showTeam ? <TeamBox t={t} /> : null}

        <div className="tournament-card__format">
          <div>{t.teamSize}</div>
          <div>{t.format}</div>
        </div>
      </div>
    </div>
  )
}
