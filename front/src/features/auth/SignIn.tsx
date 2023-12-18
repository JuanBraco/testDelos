import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthService from "../../utils/auth-service";
import { UserContext } from "../../App";
import { Alert, Button, Container, Divider, Grid, ThemeProvider, createTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import AuthFormLayout from "./utils/AuthFormLayout";
import FormField from "./utils/FormField";


const theme = createTheme({
  palette: {
    background: {
      default: '#FFFFFF' // Votre couleur de fond personnalisée
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        // Appliquez ce style aux boutons avec la variante "contained"
        contained: {
          backgroundColor: '#366873', // votre couleur personnalisée
          color: '#fff', // texte blanc
          '&:hover': {
            backgroundColor: '#2d5559', // une teinte légèrement plus foncée pour l'effet hover
          },
        },
      },
    },
  },
});

function SignIn() {
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  /*  Yup permet de définir des schémas de validation pour les données. 
	*/
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email must have a valid format").required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleSubmit = async (formValue: { email: string; password: string }) => {
    const { email, password } = formValue;
    setMessage("");
    setLoading(true);

    try {
      const user = await AuthService.login(email, password);
      if (user) {
          const response = await axiosInstance.post("/user/setOnline", null);
          setUser(response.data.user);
      }
    } catch (error) {
      if (typeof error === "object" && error !== null && "message" in error) {
        // Assuming the error object has a 'message' property
        const errorMessage = (error as { message: string }).message;
        setMessage(errorMessage);
      } else {
        // Handle the case where the error is not an object with a 'message' property
        setMessage("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ bgcolor: 'background.default', maxHeight: '100vh - 120px', display: 'flex', flexDirection: 'column' }}>
        <AuthFormLayout title="Sign In">
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <FormField field="email" formik={formik} type='text'/>
              <FormField field="password" formik={formik} 
              type={showPassword ? 'text' : 'password'} 
              handleShowPassword={handleClickShowPassword}
              showPassword={showPassword}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 0.5,
                fontWeight: "bold",
                
              }}
            >
              {loading && <span className="spinner-border spinner-border-sm"></span>}
              <span>Login</span>
            </Button>

            <Divider variant="middle" sx={{ my: 1, color: "text.secondary" }}>
              or
            </Divider>

            <Grid container>
              <Grid item>
                <RouterLink to="/signup" style={{ fontSize: "0.9rem", fontWeight: "normal", color: "#366873"}}>
                  {"Don't have an account? Sign Up"}
                </RouterLink>
              </Grid>
            </Grid>
          </form>
          {message && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {message}
            </Alert>
          )}
        </AuthFormLayout>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
