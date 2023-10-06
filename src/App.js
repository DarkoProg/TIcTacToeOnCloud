import logo from './logo.svg';
import './styles/App.css';
import TicTacToe from './TicTacToe';
import Home from './Home'
import Navbar from './Navbar';
import Login from './Login'
import Register from './Register';
import JoinGame from './JoinGame';
import { Stream } from "./Stream";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { StreamChat } from "stream-chat"
import { Chat } from 'stream-chat-react';
import { auth } from './Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';

function App() {
  const cookies = new Cookies();
  const client = StreamChat.getInstance(Stream.api);
  const [user, loading, error] = useAuthState(auth);
  const [isAuth, setIsAuth] = useState(false);

  if (user) {
    const token = cookies.get("token");
    client.connectUser({
      id: user.uid,
      email: user.email,
    }, token
    )
      .then((user) => {
        setIsAuth(true);
      })
  }
  /*   const token = cookies.get("token");
    
  
    if (token) {
      client.connectUser({
        id: cookies.get("uid"),
        email: cookies.get("email"),
      },
      token
      )
      .then((user) => {
        console.log(user);
      }) */
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
              {isAuth ?
                (<div className="game">
                  <Chat client={client} />
                    <JoinGame />
                  <Chat />
                </div>) : (
                <h1>Waiting</h1>
                )}
            </Route>
          </Switch>
        </div>
      </div>
    </Router>

  );
}

export default App;
