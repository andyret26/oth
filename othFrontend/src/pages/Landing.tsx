import PlayerMinCard from "../components/PlayerMinCard/PlayerMinCard"

export default function Landing() {
  return (
    <div className="page">
      Landing!
      <PlayerMinCard
        onCardClick={(e) => console.log()}
        hasXBtn
        hasCheckBtn
        player={{ id: 121, username: "test" }}
      />
    </div>
  )
}
