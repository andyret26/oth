import { Button } from "@mui/material"
import { Map } from "../../helpers/interfaces"

interface CompProps {
  onReset: () => void
  maps: Map[]
}

export default function MatchCompareResults({ onReset, maps }: CompProps) {
  return (
    <div className="results">
      <Button className="results__btn-new" onClick={onReset} variant="outlined">
        New Compare
      </Button>
      <div className="results__maps-header">
        <p className="results__header-field results__header-title">Title</p>
        <p className="results__header-field results__header-score1">Score1</p>
        <p className="results__header-field results__header-diff">Diff</p>
        <p className="results__header-field results__header-score2">Score2</p>
      </div>
      <div className="results__maps-container">
        {maps.map((map) => (
          <div className="results__map" key={map.score2}>
            <h3 className="results__map-field results__map-title ">
              {map.title}
              <div className="results__icons ">
                {map.mods
                  .filter((m) => m !== "NF")
                  .map((mod) => (
                    <img
                      className="w-8"
                      src={`src/assets/mod_${mod}.png`}
                      alt="test"
                    />
                  ))}
              </div>
            </h3>
            <p className="results__map-field results__map-score1">
              {map.score1}
            </p>
            <p
              className={`results__map-field results__map-diff ${
                map.diff < 0
                  ? "results__map-diff--red"
                  : "results__map-diff--green"
              }`}
            >
              {map.diff}
            </p>
            <p className="results__map-field results__map-score2">
              {map.score2}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
