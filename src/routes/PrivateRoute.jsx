import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaSpinner } from 'react-icons/fa';

const PrivateRoute = ({ children }) => {
    const {user, loading } = useContext(AuthContext);
    const location = useLocation()

    if(loading){
        return(
            <div>
                <FaSpinner className="animate-spin text-5xl text-primary"/>
            </div>
        )
    }
    if(user){
        return children
    }

    return <Navigate state={location.pathname} to='/login' replace></Navigate>
};

export default PrivateRoute;