/* eslint-disable no-nested-ternary */
import { MapV1 } from "../../helpers/interfaces"
import StandardBtn from "../common/standardBtn/StandardBtn"

interface CompProps {
  onReset: () => void
  maps: MapV1[]
}

export default function MatchCompareResults({ onReset, maps }: CompProps) {
  return (
    <div className="results">
      <StandardBtn onClick={onReset} btnText="New Compare" color="blue" />
      <div className="results__maps">
        {maps.map((map) => (
          <div
            className="results__map"
            style={{
              background: `url(${map.imgUrl})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <h3 className="results__map-title">{map.title}</h3>
            <img
              className="results__map-mod"
              src={`/Images/mods/${map.mods}.jpg`}
              alt=""
            />
            <div className="results__scores">
              <p className="results__score-field results__score1">
                {map.score1.toLocaleString()}
              </p>
              <p
                className="results__score-field results__diff"
                style={{
                  backgroundColor:
                    map.diff < 0
                      ? "#ff4444"
                      : map.diff > 0
                      ? "lightgreen"
                      : "orange",
                }}
              >
                {map.diff.toLocaleString()}
              </p>
              <p className="results__score-field results__score2">
                {map.score2.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
