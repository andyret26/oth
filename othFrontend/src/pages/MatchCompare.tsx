import { useState } from "react"
import MatchCompareForm from "../components/MatchCompare/MatchCompareForm"
import MatchCompareResults from "../components/MatchCompare/MatchCompareResults"
import "../css/MatchCompare.scss"
import { Map } from "../helpers/interfaces"

export default function MatchCompare() {
  const [maps, setMaps] = useState<Map[] | null>(null)

  const onCompare = (data: Map[]) => {
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
