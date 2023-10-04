import { auth } from './Firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth'

const Navbar = () => {

    const logOut = () => {
        signOut(auth)
        .then(() => {
            //console.log('the user signed out');
            const unsubscribeUser = onAuthStateChanged(auth, (user) => {
                console.log("status change: ", user);
            })
            unsubscribeUser();
        })
        .catch((err) => {
            console.log((err) => {
                console.log("error when signing out: ", err);
            });
        })
    }
    return (
        <nav className="navbar">
            <h1>The Dojo Blog</h1>
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