import { Route } from "react-router-dom";
import { BrowserRouter as Switch } from "react-router-dom";
import LogIn from "./Pages/LogIn"
import { Link } from "react-router-dom";
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import './App.css'
import Principal from './Pages/Principal';
import Singup from './Pages/SingUp';
import { useState } from "react";
import { useEffect } from "react";

const theme = createTheme({
  palette: {
    /* cada cosa q tenga como color "primary", va a usareste verde*/
    primary: {
      main: '#2C7B42'
    }
  }
});

function App() {
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    window.userInfo = userInfo
  }, [userInfo])

  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Switch>
          <Route path="/login">
            <LogIn setUserInfo={setUserInfo} />
          </Route>
          <Route path="/" exact component={Principal} />
          <Route path="/" exact component={Singup} />
        </Switch>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
