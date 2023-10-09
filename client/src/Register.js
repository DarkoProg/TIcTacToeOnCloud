import { db, auth } from './Firebase.js';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import Cookies from 'universal-cookie';
import { useHistory } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
            .then((credential) => {
                const addDataInfo = addDoc(collection(db, 'userStats'), {
                    userID: credential.user.uid,
                    wins: 0,
                })
                    .then((info) => {
                        console.log("added entry to database: ", info);
                    })
                    .catch((err) => {
                        console.log("error when trying to add entry: ", err);
                    })
                    history.push("/join");
            })
            .catch((err) => {
                console.log(err.message)
            })
    }


    return (
        <div className='register'>
            <form onSubmit={handleSubmit}>
                <h1>REGISTER</h1>
                <input className='textinput' type="text" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} /><br />
                <input className='textinput' type="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} /><br />
                <input className='submitinput' type='submit' value="register" />
            </form>
        </div>
    );
}

export default Register;