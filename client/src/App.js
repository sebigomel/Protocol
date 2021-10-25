import { Route } from "react-router-dom";
import { BrowserRouter as Switch } from "react-router-dom";
import LogIn from "./Pages/LogIn"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css'
import Principal from './Pages/Principal';
import Singup from './Pages/SingUp';
import makeStyles from '@mui/styles/makeStyles';
import Home from './Pages/Home';


const theme = createTheme({
  palette: {
    /* cada cosa q tenga como color "primary", va a usar este verde*/
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
  

  return (
      <div className="App">
        <Switch >
          <Route path="/login">
            <LogIn/>
          </Route>
          <Route path="/home" exact component = {Home} />
          <Route path="/signup" exact component={Singup} />
          <Route path="/" exact component = {Principal} />
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
