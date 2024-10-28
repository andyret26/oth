import { PlayerMin, Tournament, TournamentPost } from "./interfaces"

/**
 * Converts an array of PlayerMin objects to an array of player IDs.
 * @param obj - An array of PlayerMin objects.
 * @returns An array of player IDs.
 */
export function listOfPlayersToIdArray(obj: PlayerMin[]): number[] {
  const arr: number[] = []
  obj.forEach((o) => {
    arr.push(o.id)
  })
  return arr
}

export function convertTournamentToTournamentpost(
  tourney: Tournament
): TournamentPost {
  return {
    ...tourney,
    id: String(tourney.id),
    teamMateIds: tourney.teamMates.flatMap((p) => p.id),
    date: tourney.date.toString().split("T")[0].split("-").reverse().join("/"),
  }
}
