import { useEffect, useRef, useState } from "react"
import "./ProfileMenu.scss"
import { Link } from "react-router-dom"
import StandardBtn from "../common/standardBtn/StandardBtn"

interface Props {
  logdinId: string
  profileImg: string | undefined
  logout: () => void
}

function ProfileMenu({ logdinId, profileImg, logout }: Props) {
  const [profileMenuIsOpen, setProfileMenuIsOpen] = useState<boolean>(false)
  const dropDownRef = useRef<HTMLDivElement>(null)
  const menuBtnRef = useRef<HTMLButtonElement>(null)
  const handleMenuClick = () => {
    setProfileMenuIsOpen(!profileMenuIsOpen)
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropDownRef.current &&
      !dropDownRef.current.contains(e.target as Node) &&
      !(menuBtnRef.current && menuBtnRef.current.contains(e.target as Node))
    ) {
      setProfileMenuIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  return (
    <div className="profile-menu">
      <button
        className="profile-menu__btn"
        type="button"
        onClick={() => handleMenuClick()}
        ref={menuBtnRef}
      >
        <img
          className="profile-menu__img"
          src={profileImg || "/Images/ProfileImg.jpg"}
          alt="profileImg"
        />
      </button>
      {profileMenuIsOpen && (
        <div
          className="profile-menu__dropdown"
          onClick={handleMenuClick}
          role="menu"
          ref={dropDownRef}
        >
          <Link className="profile-menu__link" to={`/history/${logdinId}`}>
            My history
          </Link>
          <Link className="profile-menu__link" to={`/player/${logdinId}/stats`}>
            My Stats
          </Link>

          <Link className="profile-menu__link" to="/player/add">
            Add Player
          </Link>

          <Link className="profile-menu__link" to="/tournament/create">
            Add Tournament
          </Link>

          <StandardBtn btnText="Logout" color="red" onClick={() => logout()} />
        </div>
      )}
    </div>
  )
}

export default ProfileMenu
