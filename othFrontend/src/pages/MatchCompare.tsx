import { useState } from "react"
import MatchCompareForm from "../components/MatchCompare/MatchCompareForm"
import MatchCompareResults from "../components/MatchCompare/MatchCompareResults"
import "../css/MatchCompare.scss"
import { Map } from "../helpers/interfaces"

export default function MatchCompare() {
  const [maps, setMaps] = useState<Map[] | null>([
    {
      title: "MC Mental at His Best",
      artist: "MC Mental",
      mods: [],
      score1: 0,
      score2: 274999,
      diff: 0,
    },
    {
      title: "Vanished truth",
      artist: "Draw the Emotional feat. Meramipop",
      mods: [],
      score1: 942209,
      score2: 350369,
      diff: 591840,
    },
    {
      title: "XENO",
      artist: "Hitsuji to Ojisan",
      mods: ["NF"],
      score1: 1843506,
      score2: 1869301,
      diff: -25795,
    },
    {
      title: "Pulsation",
      artist: "syrela",
      mods: ["NF"],
      score1: 1526643,
      score2: 1848285,
      diff: -321642,
    },
    {
      title: "Nadeshiko color Heart",
      artist: "YURRY CANON",
      mods: ["NF", "DT"],
      score1: 0,
      score2: 1866251,
      diff: 0,
    },
    {
      title: "- FALLEN -",
      artist: "Kaneko Chiharu",
      mods: [],
      score1: 1275610,
      score2: 1750940,
      diff: -475330,
    },
    {
      title: "Vanished truth",
      artist: "Draw the Emotional feat. Meramipop",
      mods: [],
      score1: 942209,
      score2: 1230044,
      diff: -287835,
    },
    {
      title: "Utopiosphere -Platonism-",
      artist: "Mili",
      mods: ["NF"],
      score1: 0,
      score2: 1707818,
      diff: 0,
    },
    {
      title: "Sleeping Lover",
      artist: "Infinite Stratos Cast",
      mods: [],
      score1: 1333206,
      score2: 865127,
      diff: 468079,
    },
  ])

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
