import { auth } from './Firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { useHistory } from "react-router-dom";

const Navbar = () => {

    const history = useHistory();
    const logOut = () => {
        signOut(auth)
            .then(() => {
                //console.log('the user signed out');
                const unsubscribeUser = onAuthStateChanged(auth, (user) => {
                    console.log("status change: ", user);
                })
                unsubscribeUser();
                console.log("signed out")
                history.push("/");
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
                <ul className="navLinks">
                    <li className='left'><a href="/">Home</a></li>
                    <li className='left'><a href="/register" >register</a></li>
                    <li className='left'><a href="/login">login</a></li>
                    <li className='logout'><button onClick={logOut}>Logout</button></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;