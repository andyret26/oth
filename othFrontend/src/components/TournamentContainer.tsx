import { Tournament } from "../helpers/interfaces"
import { FadeInOnScroll } from "./FadeInOnScroll"
import TourneyCard from "./TourneyCard/TourneyCard"

interface CompProps {
  tournamentsList: Tournament[]
  logdinId: number
  isOwnHistory: boolean
  deletingTournamentId: number | null
  onDeleteTournament: (tournamentId: number) => void
}

export default function TournamentContainer({
  tournamentsList,
  logdinId,
  isOwnHistory,
  deletingTournamentId,
  onDeleteTournament,
}: CompProps) {
  return (
    <div className="history-page__container">
      {tournamentsList.map((t, i) => (
        <FadeInOnScroll key={t.id} index={i} length={tournamentsList.length}>
          <TourneyCard
            tournament={t}
            logdinId={logdinId}
            isOwnHistory={isOwnHistory}
            isDeleting={deletingTournamentId !== null}
            onDelete={onDeleteTournament}
          />
        </FadeInOnScroll>
      ))}
    </div>
  )
}
