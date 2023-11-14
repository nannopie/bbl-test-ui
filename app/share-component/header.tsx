"use client"
import * as React from 'react';
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import Link from 'next/link'
import { useEffect, useState } from 'react';

const pages = [{ pageName: 'User', path: '/users', mode: 'user' }, { pageName: 'Post', path: '/posts', mode: 'post' }];

export function Header(props: any) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="sticky" sx={{top:0}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
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
            BBL TEST
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
              {pages.map((page) => (
                <MenuItem key={page.pageName} onClick={handleCloseNavMenu} >
                  <Link href={page.path}> <Typography textAlign="center">{page.pageName}</Typography></Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button href={page.path}
                key={page.pageName}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2, color: 'white', display: 'block', fontWeight: props.mode == page.mode ? 'bold' : '',
                  textDecorationLine: props.mode == page.mode ? 'underline' : ''
                }}>
                {page.pageName}
              </Button>
            ))}
          </Box>

          <ShowProfile></ShowProfile>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

const ShowProfile = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [username, setUsername] = useState<null | string>();
  const [loged, setLoged] = useState<null | string>();
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const findLog = localStorage.getItem('bblTestLogin');
      setLoged(findLog);
      if (findLog) {
        const findUsername = localStorage.getItem('bblTestLoginUsername');
        setUsername(findUsername);
      }
    }

    checkLogin();
  });

  function logOut() {
    localStorage.removeItem("bblTestLogin");
    localStorage.removeItem("bblTestLoginUsername");
    handleCloseUserMenu();
  }

  if (loged) {
    return (
      <>
        <Box sx={{ flexGrow: 0 }}>
          <Typography textAlign="center">Hello {username} &nbsp;</Typography>
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={username ? username : ""} />
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
            <MenuItem>
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            <MenuItem>
              <Typography textAlign="center">Accout</Typography>
            </MenuItem>
            <MenuItem onClick={logOut}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </>
    )
  } else {
    return (
      <Box sx={{ flexGrow: 0 }}>
        <Button color="inherit" variant="outlined" sx={{ fontWeight: "bold" }} href='/login'>Login</Button>
      </Box>
    )
  }
}