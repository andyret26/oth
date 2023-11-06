import { MouseEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import Avatar from "@mui/material/Avatar"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from "@mui/material/MenuItem"
import AdbIcon from "@mui/icons-material/Adb"
import Button from "@mui/material/Button"
import { useAuth0 } from "@auth0/auth0-react"
import { AddPlayerAsync } from "../services/othApiService"

export default function NavBar() {
  const navigate = useNavigate()
  const { loginWithPopup, isAuthenticated, logout, user, getIdTokenClaims } =
    useAuth0()

  const [anchorElNav, setAnchorElNav] = useState<HTMLButtonElement | null>(null)
  const [anchorElUser, setAnchorElUser] = useState<HTMLButtonElement | null>(
    null
  )

  const handleOpenNavMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLogin = async () => {
    await loginWithPopup()
    const claims = await getIdTokenClaims()
    const osuId = claims!.sub.split("|")[2]
    AddPlayerAsync(osuId)
  }

  return (
    <AppBar position="static" className="nav-bar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />

          <Link to="/" className="nav-logo-text">
            OTH!
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(e) => handleOpenNavMenu(e)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link className="nav-link-menu" to="/history">
                  My History
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link className="nav-link-menu" to="/history">
                  My History
                </Link>
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link className="nav-link" to="/history">
              My History
            </Link>
            <Link className="nav-link" to="/history">
              My History
            </Link>
          </Box>
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
                  <Button onClick={() => logout()} color="error">
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
