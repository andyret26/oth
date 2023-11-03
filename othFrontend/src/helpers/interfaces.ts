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
  date: string | null
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
  teamMateIds: number[] | string | null
}