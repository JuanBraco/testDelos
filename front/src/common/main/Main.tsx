import "./Main.css";
import { useContext} from "react";
import { UserContext } from "../../App";
import Tennis from "../../features/game/Tennis";
import { Cookies } from "react-cookie";
import { Grid, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      default: '#FFFFFF' // Votre couleur de fond personnalisée
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#366873', // votre couleur personnalisée
          color: '#fff', // texte blanc
          '&:hover': {
            backgroundColor: '#2d5559',
          },
        },
      },
    },
  },
});

const Main: React.FC = () => {
  const cookies = new Cookies();
  const { user, setUser } = useContext(UserContext);

  //const matchProfile = useRouteMatch("/profile/:userId");
  function updateUserOnLogout() {
    setUser(null);
  }

  if (!cookies.get("jwt")) {
    //if (gameSocket) gameSocket.disconnect;
    updateUserOnLogout();
    return;
  }

  return (
    <ThemeProvider theme={theme}>
      {user ? (
        <div className="Main">
          <Grid item xs={12} md={8} lg={9}>
            <Grid container>
              <Grid item xs={8} md={9} lg={10}>
                <Tennis />
              </Grid>
            </Grid>
          </Grid>

        </div>
      ) : (
       <div className="text-center">
        </div>
      )}
    </ThemeProvider>
  );
};

export default Main;
