import { Link } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import { TbTournament, TbChartBar, TbUsers, TbPlus, TbTrendingUp } from "react-icons/tb"
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
            Manage, analyze, and showcase your tournament results with comprehensive statistics and team management tools.
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

      {/* Features Section */}
      <section className="landing__features">
        <h2 className="landing__section-title">Everything You Need</h2>
        <div className="landing__features-grid">
          <div className="landing__feature-card">
            <div className="landing__feature-icon">
              <TbTournament size={32} />
            </div>
            <h3>Tournament Management</h3>
            <p>Track your tournament participations, results, and performance across different formats and team sizes.</p>
          </div>

          <div className="landing__feature-card">
            <div className="landing__feature-icon">
              <TbUsers size={32} />
            </div>
            <h3>Team Collaboration</h3>
            <p>Manage team compositions, view teammate profiles, and analyze team performance statistics.</p>
          </div>

          <div className="landing__feature-card">
            <div className="landing__feature-icon">
              <TbChartBar size={32} />
            </div>
            <h3>Detailed Analytics</h3>
            <p>Get insights into your tournament performance with comprehensive statistics and trend analysis.</p>
          </div>

          <div className="landing__feature-card">
            <div className="landing__feature-icon">
              <TbTrendingUp size={32} />
            </div>
            <h3>Progress Tracking</h3>
            <p>Monitor your improvement over time with historical data and performance metrics.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="landing__stats">
        <h2 className="landing__section-title">Join the Community</h2>
        <div className="landing__stats-grid">
          <div className="landing__stat">
            <div className="landing__stat-number">100+</div>
            <div className="landing__stat-label">Tournaments Tracked</div>
          </div>
          <div className="landing__stat">
            <div className="landing__stat-number">500+</div>
            <div className="landing__stat-label">Players Registered</div>
          </div>
          <div className="landing__stat">
            <div className="landing__stat-number">50+</div>
            <div className="landing__stat-label">Active Teams</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="landing__cta">
        <h2>Ready to Track Your Success?</h2>
        <p>Start building your tournament history and unlock detailed insights into your osu! career.</p>
        {isAuthenticated ? (
          <Link to="/history" className="landing__cta-button landing__cta-button--secondary">
            View Your History
          </Link>
        ) : (
          <button
            className="landing__cta-button landing__cta-button--secondary"
            onClick={() => loginWithRedirect()}
          >
            Sign In to Get Started
          </button>
        )}
      </section>
    </div>
  )
}
