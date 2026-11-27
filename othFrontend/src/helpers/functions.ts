import { PlayerMin, TournamenErrors, Tournament, TournamentPost } from "./interfaces"

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


export function validateTournament(form: TournamentPost): TournamenErrors
{
  const errors: TournamenErrors = {}

  const convertedDate = form.date?.split("/").reverse().join("-")
  if (convertedDate === undefined) {
    errors.date = "Date is required"
  }

  if (form.name == null || form.name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters"
  }


  return errors
}
