import { Tournament } from "../helpers/interfaces"
import { FadeInOnScroll } from "./FadeInOnScroll"
import TourneyCard from "./TourneyCard/TourneyCard"

interface CompProps {
  tournamentsList: Tournament[]
  logdinId: number
}

export default function TournamentContainer({
  tournamentsList,
  logdinId,
}: CompProps) {
  return (
    <div className="history-page__container">
      {tournamentsList.map((t, i) => (
        <FadeInOnScroll key={t.id} index={i} length={tournamentsList.length}>
          <TourneyCard tournament={t} logdinId={logdinId} />
        </FadeInOnScroll>
      ))}
    </div>
  )
}
