export default function Stats() {
  return (
    <div className="text-xl flex flex-col items-center">
      <h1 className="my-8 text-3xl">Stats</h1>
      <div className="bg-[#382e32] p-10 rounded-md flex flex-col gap-16 items-center">
        <p>
          Total Tournaments: <span className="s">67</span>
        </p>
        <div className="flex gap-16">
          <div className="flex flex-col justify-between items-end">
            <p>
              Win Rate: <span className="s">23.3%</span>
            </p>
            <p>
              Top 3 Rate: <span className="s">25.3%</span>
            </p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <p className="text-[#ffbd42]">
              1st: <span className="s">2</span>
            </p>
            <p className="text-[#d9d9d9]">
              2nd: <span className="s">3</span>
            </p>
            <p className="text-[#cf640d]">
              3rd: <span className="s">4</span>
            </p>
          </div>
        </div>
        <p>
          Average Placement: <span className="s">9.2</span>
        </p>
        <div className="flex flex-col items-center gap-3">
          <p>
            Unique Team players: <span className="s">23</span>
          </p>
          <p>
            Unique Countries: <span className="s">19</span>
          </p>
        </div>
      </div>
    </div>
  )
}
