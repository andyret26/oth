export interface OsuUserData {
  user_id: string
  username: string
  join_date: string
  count300: string
  count100: string
  count50: string
  playcount: string
  ranked_score: string
  total_score: string
  pp_rank: string
  level: string
  pp_raw: string
  accuracy: string
  count_rank_ss: string
  count_rank_ssh: string
  count_rank_s: string
  count_rank_sh: string
  count_rank_a: string
  country: string
  total_seconds_played: string
  pp_country_rank: string
}

export interface TournamentPost {
  id: string | null | undefined
  date: string | null | undefined
  name: string
  teamName: string | null
  forumPostLink: string | null
  mainSheetLink: string | null
  bracketLink: string | null
  rankRange: string | null
  seed: number | null
  format: string | null
  teamSize: string | null
  placement: string | null
  notes: string | null
  imageLink: string | null
  teamMateIds: number[] | string | null
  addedById: number
}

export interface Tournament {
  id: number
  date: Date
  name: string
  teamName: string
  forumPostLink: string
  mainSheetLink: string
  bracketLink: string
  rankRange: string
  seed: number
  format: string
  teamSize: string
  placement: string
  notes: string
  imageLink: string
  teamMates: Player[]
  addedById: number
}

export interface Player {
  id: number
  username: string
  avatar_url: string
  global_rank: number
  country_code: string
  tournaments: Tournament[]
}

export interface PlayerMin {
  id: number
  username: string
}

export interface PlayerStats {
  totalTournaments: number
  uniqueTeamMatesCount: number
  uniqueFlagCount: number
  firstPlaces: number
  secondPlaces: number
  thirdPlaces: number
  firstRate: number
  top3Rate: number
  avgPlacement: number
}

export interface MatchCompareRequest {
  matchId1: number
  matchId2: number
  ignoreStart1: number
  ignoreStart2: number
  ignoreEnd1: number
  ignoreEnd2: number
  teamType: string
  team1Color: string
  team2Color: string
  user1Id: number
  user2Id: number
}

export interface MapV2 {
  title: string
  artist: string
  mods: string[]
  score1: number
  score2: number
  diff: number
}

export interface MapV1 {
  beatmap_id: number
  mods: number
  score1: number
  score2: number
  diff: number
  title: string
  imgUrl: string
}
