/* eslint-disable @typescript-eslint/no-explicit-any */
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./common/main/Main";
import SignIn from "./features/auth/SignIn";
import SignUp from "./features/auth/SignUp";
import NotFound from "./common/notFound/notFound";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthService from "./utils/auth-service";
import { createContext, useEffect, useState } from "react";
import { UserDetails } from "./model/UserDetails";
import { Navigate } from "react-router-dom";
//import { useThrowAsyncError } from "./utils/useThrowAsyncError";
import Header from "./common/header/Header";
import { Cookies } from "react-cookie";
import { CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';


interface UserContextProps {
  user: UserDetails | null;
  setUser: React.Dispatch<React.SetStateAction<UserDetails | null>>;
}

const initialContext: UserContextProps = {
  user: null,
  setUser: () => {},
};

const theme = createTheme({
  palette: {
    background: {
      default: '#FFFFFF' // Votre couleur de fond personnalisée
    },
  },
  // ... autres personnalisations du thème si nécessaire
});

export const UserContext = createContext<UserContextProps>(initialContext);

function App() {
  //console.log("Debut fonction App");
  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  //const throwAsyncError = useThrowAsyncError();

  const cookies = new Cookies();


  const initializeUserSession = async () => {
    try {
      if (cookies.get("error")) {
        //console.log('HERE', cookies.get("error"))
        if (cookies.get("jwt")) {
          cookies.remove("error");
        } else {
          alert(cookies.get("error").message);
        }
        return
      }

      if (!cookies.get("jwt")) {
        return;
      }
      // Fetch the user details from the backend
      const fetchedUser = await AuthService.getUserFromBack();
      setUser(fetchedUser);
    } catch (error) {
      setUser(null);
      //throwAsyncError(error);
    } finally {
      setLoading(false); // Arrêtez le chargement une fois que tout est fini
    }
  };

  useEffect(() => {
    initializeUserSession();
  }, []);

  if (loading) {
    return (
      <div className="centered">
        <CircularProgress size={100}/>
      </div>
    );
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <div className="container-fluid">
          <Routes>
            <Route path="/signin" element={user ? <Navigate to="/" /> : <SignIn/>} />
            <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUp />} />
            <Route path="/" element={user ? <Main /> : <Navigate to="/signin" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
