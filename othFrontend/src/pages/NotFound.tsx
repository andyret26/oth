import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="text-center pt-20">
      <h1 className="text-7xl text-red-600">404</h1>
      <h3 className="text-3xl">Not Found</h3>
      <Link to="/">Home</Link>
    </div>
  )
}
