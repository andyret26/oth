import { Tournament } from "../helpers/interfaces"

interface CompProps {
  t: Tournament
}
export default function ShowTeamBox({ t }: CompProps) {
  return (
    <div
      id="team-mates"
      className="z-50 bg-[#4e3c44]/95 flex flex-wrap gap-x-7 gap-y-2 justify-center w-72 absolute top-[7.5rem] rounded-md p-2 animate__animated animate__fadeIn animate__faster"
    >
      {t.teamMates.map((tm) => (
        <div key={tm.id} className="flex items-center gap-1">
          <img src={tm.avatar_url} alt="avatar" className="w-6 h-6" />
          {tm.username}
          <img
            src={`https://flagsapi.com/${tm.country_code}/shiny/64.png`}
            alt="Flag"
            className="w-5 h-5"
          />
        </div>
      ))}
    </div>
  )
}
