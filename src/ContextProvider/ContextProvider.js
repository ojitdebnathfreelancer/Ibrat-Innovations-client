import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth';
import app from '../Firebase/firebase.config';

export const EcomerceContext = createContext();
const auth = getAuth(app);

const ContextProvider = ({ children }) => {

    const [user, setUser] = useState({});

    const registerUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    };
    // user registaton with email and password 

    const loginUser = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    };
    // login user 

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
        });
        return ()=> unsubscribe();
    },[]);

    const updateUser = (name) =>{
        return updateProfile(auth.currentUser, {displayName:name, photoURL:''});
    };
    // update user 

    const logoutUser = () =>{
        return signOut(auth);
    };
    // logout user 

    const info = {user, registerUser, loginUser, updateUser, logoutUser};
    return (
        <EcomerceContext.Provider value={info}>
            {children}
        </EcomerceContext.Provider>
    );
};

export default ContextProvider;