import { Link } from "react-router-dom"

export default function Unauthorized() {
  return (
    <div className="text-center pt-20">
      <h1 className="text-7xl text-red-600">401</h1>
      <h3 className="text-3xl">Unauthorized</h3>
      <Link to="/">Home</Link>
    </div>
  )
}
