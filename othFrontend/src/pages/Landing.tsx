import { Link } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import { TbPlus } from "react-icons/tb"
import LinkBtn from "../components/common/LinkBtn/LinkBtn"
import "./Landing.scss"

export default function Landing() {
  const { loginWithRedirect, isAuthenticated } = useAuth0()

  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="landing__hero">
        <div className="landing__hero-content">
          <h1 className="landing__title">
            Track Your <span className="landing__title-highlight">osu!</span> Tournament Journey
          </h1>
          <p className="landing__subtitle">
            Manage and showcase your tournament results.
          </p>
          <div className="landing__hero-actions">
            {isAuthenticated ? (
              <Link to="/tournament/create" className="landing__cta-button">
                <TbPlus size={20} />
                Create Tournament
              </Link>
            ) : (
              <button
                className="landing__cta-button"
                onClick={() => loginWithRedirect()}
              >
                Get Started
              </button>
            )}
            <LinkBtn href="https://osu.ppy.sh" color="pink">
              Visit osu!
            </LinkBtn>
          </div>
        </div>
        <div className="landing__hero-visual">
          <div className="landing__hero-circle landing__hero-circle--purple"></div>
          <div className="landing__hero-circle landing__hero-circle--blue"></div>
          <div className="landing__hero-circle landing__hero-circle--green"></div>
        </div>
      </section>

  
    </div>
  )
}
