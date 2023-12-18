import { PlayerMin } from "./interfaces"

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
