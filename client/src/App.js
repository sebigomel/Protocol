import { Route } from "react-router-dom";
import { BrowserRouter as Switch } from "react-router-dom";
import LogIn from "./Pages/LogIn"
import { Link } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css'
import Principal from './Pages/Principal';
import Singup from './Pages/SingUp';
import { useState } from "react";
import { useEffect } from "react";
import makeStyles from '@mui/styles/makeStyles';


const theme = createTheme({
  palette: {
    /* cada cosa q tenga como color "primary", va a usareste verde*/
    primary: {
      main: '#2C7B42'
    }
  }
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));


function AppContent(props) {
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    window.userInfo = userInfo
  }, [userInfo])

  return (
      <div className="App">
        <Switch >
          <Route path="/login">
            <LogIn setUserInfo={setUserInfo} />
          </Route>
          <Route path="/principal" exact component = {Principal} />
          <Route path="/singup" exact component={Singup} />
        </Switch>
      </div>
  );
}



function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <AppContent {...props} />
    </ThemeProvider>
  );
}

export default App;
