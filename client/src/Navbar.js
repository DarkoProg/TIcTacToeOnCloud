import { auth } from './Firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import Cookies from 'universal-cookie';

const Navbar = () => {

    const logOut = () => {
        signOut(auth)
        .then(() => {
            //console.log('the user signed out');
            const unsubscribeUser = onAuthStateChanged(auth, (user) => {
                console.log("status change: ", user);
            })
            unsubscribeUser();
            console.log("signed out")
        })
        .catch((err) => {
            console.log((err) => {
                console.log("error when signing out: ", err);
            });
        })
    }
    return (
        <nav className="navbar">
            <div className="links">
                <a href="/">Home</a>
                <a href="/register" style={{
                    color: 'white',
                    backgroundColor: '#f1356d',
                    borderRadius: '8px'
                }}>register</a>
                <a href="/login" style={{
                    color: 'white',
                    backgroundColor: '#f1356d',
                    borderRadius: '8px'}}>login</a>
                    <button onClick={logOut}>Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;