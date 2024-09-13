import "./NavBar.scss"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import { AxiosError } from "axios"
import { AddPlayerAsync } from "../../services/othApiService"
import Search from "./Search"
import StandardBtn from "../common/standardBtn/StandardBtn"
import ProfileMenu from "./ProfileMenu"
import NavMenu from "./NavMenu"

export default function NavBar() {
  const { loginWithPopup, isAuthenticated, logout, user, getIdTokenClaims } =
    useAuth0()

  const [logdinId, setLogdinId] = useState<string>("")
  useEffect(() => {
    if (isAuthenticated) {
      getIdTokenClaims().then((token) => {
        setLogdinId(token!.sub.split("|")[2])
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  const handleLogin = async () => {
    await loginWithPopup()
    const claims = await getIdTokenClaims()
    const osuId = claims!.sub.split("|")[2]
    setLogdinId(osuId)
    try {
      await AddPlayerAsync(osuId, claims!.__raw)
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          // User already exists
          // Do nothing
        } else {
          console.error(error)
        }
      }
    }
  }

  const handleLogout = () => {
    logout({
      logoutParams: { returnTo: window.location.origin },
    })
  }

  return (
    <div className="navbar">
      <div className="navbar__inner">
        <div className="navbar__left">
          <Link to="/" className="navbar__logo-wrapper">
            <img
              src="/Images/othLogo.png"
              width={50}
              alt="Logo"
              className="navbar__logo"
            />
          </Link>

          <div className="">
            <Search />
          </div>

          <NavMenu />
        </div>
        <div className="navbar__right">
          {isAuthenticated ? (
            <ProfileMenu
              logdinId={logdinId}
              logout={handleLogout}
              profileImg={user ? user.picture : undefined}
            />
          ) : (
            <StandardBtn btnText="Login" onClick={handleLogin} />
          )}
        </div>
      </div>
    </div>
  )
}
