import { useEffect, useRef, useState } from "react"
import { FaBars } from "react-icons/fa"
import { Link } from "react-router-dom"
import IconBtn from "../common/IconBtn/IconBtn"

function NavMenu() {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const menuBtnRef = useRef<HTMLButtonElement>(null)

  const HandleMenuBtnClick = () => {
    setMenuIsOpen(!menuIsOpen)
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node) &&
      !(menuBtnRef.current && menuBtnRef.current.contains(e.target as Node))
    ) {
      setMenuIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="navbar__menu">
      <IconBtn
        bgColor="pink"
        Icon={FaBars}
        onClick={HandleMenuBtnClick}
        ref={menuBtnRef}
      />
      {menuIsOpen && (
        <div
          role="menu"
          className="navbar__menu-dropdown"
          onClick={() => setMenuIsOpen(!menuIsOpen)}
          ref={dropdownRef}
        >
          <Link className="navbar__link" to="/match-compare">
            Match compare
          </Link>
          <Link className="navbar__link" to="/qual-stats">
            Qualifier Stats
          </Link>
        </div>
      )}
    </div>
  )
}

export default NavMenu
