import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    sendPasswordResetEmail,
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    updateProfile 
} from 'firebase/auth';
import app from '../firebase/firebase.config';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUserProfile = (name, photoUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoUrl,
        });
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    
    const resetPassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        createUser,
        logOut,
        user,
        loading,
        updateUserProfile,
        signIn,
        googleSignIn,
        resetPassword, 
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
