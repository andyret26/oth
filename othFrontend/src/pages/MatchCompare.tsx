import { useState } from "react"
import MatchCompareForm from "../components/MatchCompare/MatchCompareForm"
import MatchCompareResults from "../components/MatchCompare/MatchCompareResults"
import "../css/MatchCompare.scss"
import { MapV1 } from "../helpers/interfaces"

export default function MatchCompare() {
  const [maps, setMaps] = useState<MapV1[] | null>(null)

  const onCompare = (data: MapV1[]) => {
    setMaps(data)
    console.log(data)
  }

  const onReset = () => {
    setMaps(null)
  }
  return (
    <div className="compare page">
      <h1 className="compare__title">Compare matches</h1>
      {maps ? (
        <MatchCompareResults onReset={onReset} maps={maps} />
      ) : (
        <MatchCompareForm onCompare={onCompare} />
      )}
    </div>
  )
}
