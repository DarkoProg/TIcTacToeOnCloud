import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { auth } from './Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';

import './styles/App.css';
import TicTacToe from './TicTacToe';
import Home from './Home'
import Navbar from './Navbar';
import Login from './Login'
import Register from './Register';
import JoinGame from './JoinGame';

function App() {
  const cookies = new Cookies();
  const [user, loading, error] = useAuthState(auth);
  //const [isAuth, setIsAuth] = useState(false);

  return (
    <Router>
      <div className="App">
        <h1>Hello there</h1>
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/tictactoe">
              <TicTacToe />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login cookies={cookies}/>
            </Route>
            <Route exact path="/join">
{/*               {isAuth ?
                (<div className="game">
                    <JoinGame />
                </div>) : (
                <h1>Waiting</h1>
                )} */}
                <JoinGame />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>

  );
}

export default App;
