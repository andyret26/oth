import { useState } from 'react';
import { Link, useNavigate} from "react-router-dom"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Button from "@mui/material/Button"
import { useAuth0 } from "@auth0/auth0-react"


export default function NavBar() {
    const navigate = useNavigate()
    const { loginWithPopup, isAuthenticated, logout, user } = useAuth0()

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
  
  return (
    <AppBar position="static">
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

          <Link to={"/"} className='nav-logo-text'>OTH!</Link>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            <MenuItem onClick={handleCloseNavMenu}>
              <Link className='nav-link' to={"/history"}>My History</Link>
            </MenuItem>
          </Menu>
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <MenuItem onClick={handleCloseNavMenu}>
            <Link className='nav-link' to={"/history"}>My History</Link>
          </MenuItem>
        </Box>
            {
              isAuthenticated ?
                <Box sx={{ flexGrow: 0 }}>
                  {}
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src={user.picture} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Button onClick={() => navigate("/history")}>My Tournament</Button>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Button>Profile</Button>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Button onClick={() => logout()} color='error'>Logout</Button>
                      </MenuItem>
                  </Menu>
                </Box>
                :
                <Box>
                  <Button onClick={() => loginWithPopup()}>Login</Button>
                </Box>
            }
      </Toolbar>
    </Container>
  </AppBar>
  )
}
