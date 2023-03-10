import React, { createContext, useEffect, useState } from 'react';
import { getAuth,signInWithPopup,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut,updateProfile } from "firebase/auth";
import app from '../Firebase/firebase.init';
export const UserContext=createContext(); 
const auth=getAuth(app);

const AuthContext = ({children}) => {
    
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    // email pass login
const logIn=(email, password)=>{
  setLoading(true);
    return signInWithEmailAndPassword(auth,email,password);
  
  }

  // get current user
  useEffect(()=>{
    const unSubscribe=onAuthStateChanged(auth,(currentUser)=>{
      setUser(currentUser);
      setLoading(false);
    });
    return ()=>unSubscribe();
  
  },[])
// logout here
  const logOut=()=>{
    setLoading(true);
    return signOut(auth);
  }
  // register here

const register=(email,password)=>{
  setLoading(true);
    return createUserWithEmailAndPassword(auth,email,password);
}
// user update here
const userUpdate=(profile)=>{
    return updateProfile(auth.currentUser,profile)
  }

  // google log in
const handleGoogleLogin=(Provider)=>{
  setLoading(true);
    return signInWithPopup(auth,Provider);
}

    
    const info={user,logIn,handleGoogleLogin,register,logOut,userUpdate,loading,setLoading};
    return (
        <UserContext.Provider value={info}>
            {children}
        </UserContext.Provider>
    );
};

export default AuthContext;