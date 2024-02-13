import MatchCompareForm from "../components/MatchCompare/MatchCompareForm"
import MatchCompareResults from "../components/MatchCompare/MatchCompareResults"
import "../css/MatchCompare.scss"

export default function MatchCompare() {
  return (
    <div className="compare">
      <h1 className="compare__title">Compare matches</h1>
      <MatchCompareForm />
      <MatchCompareResults />
    </div>
  )
}
