import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import SettingsDialog from "./dialogs/SettingsDialog";
import { Logo, NavigationMenu, UserMenu } from "./DisplayHeader";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#015958', // ou 'rgb(0, 143, 140)' pour la valeur RGB
    },
  },
});

function Header() {
  // console.log("Debut fonction Header");

  const { user, setUser } = useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [openSettings, setOpenSettings] = useState<boolean>(false);

  const logOut = () => {
      setUser(null);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const isUserLoggedIn = user !== null ? true : false ;

  return (
    <ThemeProvider theme={theme}> 
    <AppBar position="static" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          <NavigationMenu
            isUserLoggedIn={isUserLoggedIn!}
            anchorElNav={anchorElNav}
            handleOpenNavMenu={handleOpenNavMenu}
            handleCloseNavMenu={handleCloseNavMenu}
          />
          {isUserLoggedIn && (
            <UserMenu
              imageUrl={user!.imageUrl!}
              nickname={user!.nickname!}
              anchorElUser={anchorElUser}
              handleOpenUserMenu={handleOpenUserMenu}
              handleCloseUserMenu={handleCloseUserMenu}
              setOpenSettings={setOpenSettings}
              logOut={logOut}
            />
          )}
          {openSettings && <SettingsDialog display={openSettings} setDisplay={setOpenSettings}></SettingsDialog>}
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
}

export default Header;
