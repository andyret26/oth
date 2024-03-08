import { MouseEvent, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import Container from "@mui/material/Container"
import Avatar from "@mui/material/Avatar"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from "@mui/material/MenuItem"
import Button from "@mui/material/Button"
import { useAuth0 } from "@auth0/auth0-react"
import { AxiosError } from "axios"
import { AddPlayerAsync } from "../services/othApiService"
import Search from "./Search"

export default function NavBar() {
  const { loginWithPopup, isAuthenticated, logout, user, getIdTokenClaims } =
    useAuth0()

  const [anchorElUser, setAnchorElUser] = useState<HTMLButtonElement | null>(
    null
  )
  const [logdinId, setLogdinId] = useState<string>("")

  useEffect(() => {
    if (isAuthenticated) {
      getIdTokenClaims().then((token) => {
        setLogdinId(token!.sub.split("|")[2])
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  const handleOpenUserMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

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

  return (
    <AppBar position="sticky" className="nav-bar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" className="nav__logo-link">
            <img
              src="/Images/othLogo.png"
              width={50}
              alt="Logo"
              className="mr-3"
            />
          </Link>

          <div className="mr-4">
            <Search />
          </div>

          <div className="">
            <Link className="link" to="/match-compare">
              Match Compare
            </Link>
            <Link
              className="link"
              to="/qual-stats"
              style={{ marginLeft: "10px" }}
            >
              Qualifier Stats
            </Link>
          </div>

          <div className="ml-auto">
            {isAuthenticated ? (
              <Box>
                {}
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={(e) => handleOpenUserMenu(e)}
                    sx={{ p: 0 }}
                  >
                    <Avatar
                      alt="Picture"
                      src={user ? user.picture : "/Images/profileImg"}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Link to={`/history/${logdinId}`}>
                    <MenuItem onClick={handleCloseUserMenu}>
                      My History
                    </MenuItem>
                  </Link>
                  <Link to={`/player/${logdinId}/stats`}>
                    <MenuItem onClick={handleCloseUserMenu}>My Stats</MenuItem>
                  </Link>

                  <Link to="/player/add">
                    <MenuItem onClick={handleCloseUserMenu}>
                      Add Player
                    </MenuItem>
                  </Link>

                  <Link to="/tournament/create">
                    <MenuItem onClick={handleCloseUserMenu}>
                      Add Tournament
                    </MenuItem>
                  </Link>

                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu()
                      logout({
                        logoutParams: { returnTo: window.location.origin },
                      })
                    }}
                  >
                    <p className="text-red-500">Logout</p>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box>
                <Button onClick={() => handleLogin()}>Login</Button>
              </Box>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
