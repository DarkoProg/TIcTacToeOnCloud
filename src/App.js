import logo from './logo.svg';
import './styles/App.css';
import TicTacToe from './TicTacToe';
import Home from './Home'
import Navbar from './Navbar';
import Login from './Login'
import Register from './Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
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
              <Login />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>

  );
}

export default App;
