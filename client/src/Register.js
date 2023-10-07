import { db, auth } from './Firebase.js';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import Cookies from 'universal-cookie';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const cookies = new Cookies()

    const handleSubmit = async (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
        .then((credential) => {
            const addDataInfo = addDoc(collection(db, 'userStats'), {
                userID: credential.user.uid,
                wins: 0,
            })
            .then((info) => 
            {
                console.log("added entry to database: ", info);
            })
            .catch((err) => {
                console.log("error when trying to add entry: ", err);
            })

        })
        .catch((err) => {
            console.log(err.message)
        })
    }


    return ( 
        <form onSubmit={handleSubmit} className="Register">
            <label>email</label><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
            <label>password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
            <input type='submit' value="register" />
        </form>
     );
}
 
export default Register;