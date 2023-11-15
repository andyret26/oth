import { MouseEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
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
import { AddPlayerAsync } from "../services/othApiService"
import Search from "./Search"

export default function NavBar() {
  const navigate = useNavigate()
  const { loginWithPopup, isAuthenticated, logout, user, getIdTokenClaims } =
    useAuth0()

  const [anchorElUser, setAnchorElUser] = useState<HTMLButtonElement | null>(
    null
  )

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
    AddPlayerAsync(osuId, claims!.__raw)
  }

  return (
    <AppBar position="static" className="nav-bar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" className="nav-logo-text">
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

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }} />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} />

          {isAuthenticated ? (
            <Box sx={{ flexGrow: 0 }}>
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
                <MenuItem onClick={handleCloseUserMenu}>
                  <Button onClick={() => navigate("/history")}>
                    My Tournament
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Button>Profile</Button>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Button
                    onClick={() =>
                      logout({
                        logoutParams: { returnTo: window.location.origin },
                      })
                    }
                    color="error"
                  >
                    Logout
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box>
              <Button onClick={() => handleLogin()}>Login</Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
