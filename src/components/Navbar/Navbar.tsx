import { useEffect, useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import { NavbarProps } from '../../helpers/interfaces';
import { getDownloadURL, ref } from "firebase/storage"; 
import { auth, storage } from '../../helpers/firebaseConfig';
import { authContext } from '../../helpers/authContext';

const pages = ['Home', 'Search'];

const Navbar = () => {

    const loggedIn = useContext(authContext);
    const [profilePhoto, setProfilePhoto] = useState<string | undefined>('/');



    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

    const button = loggedIn === true ? `<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />` : "<Button sx{{my:2, color:white, display:block}}>Log in</Button";
  
    // const handleCloseUserMenu = () => {
    //   setAnchorElUser(null);
    // };

    useEffect(() => {
      if (auth.currentUser) {
        const storageRef = ref(storage, `/users/${auth.currentUser.uid}/avatar`);
        getDownloadURL(storageRef).then((url) => {setProfilePhoto(url)}).catch((error) => {console.error(error.message)});
      }
    });
  
    return (
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              MS
            </Typography>
  
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
                {/* {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))} */}
                <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Home</Typography>
                  </MenuItem>
                </Link>
                <Link to="/search" style={{ textDecoration: "none", color: "black" }}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Search</Typography>
                  </MenuItem>
                </Link>

              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'Roboto',
                fontWeight: 100,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              NEWS
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
                <Link to={loggedIn ? "/user" : "/login"} style={{ textDecoration: "none" }}>
                  {loggedIn && (
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src={profilePhoto} />
                    </IconButton>
                  )}
                  {!loggedIn && (
                    <Button
                      sx={{
                        my: '2',
                        color: 'white',
                        display: 'block',
                      }}
                    >
                      Log in
                    </Button>
                  )}
                </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
}

export default Navbar