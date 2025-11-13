import React from 'react';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);


    const status = error?.status || 500;
    const message = error?.statusText || error?.message ||  "An unexpected error occurred.";

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center p-6">
            <div className="max-w-md w-full p-8 rounded-xl shadow-2xl glass-card bg-base-100">
                 <FaExclamationTriangle className="text-8xl text-error mx-auto mb-6" />

                 <h1 className='text-7xl font-extrabold text-primary mb-2'>
                    {status}
                 </h1>

                 <h2 className="text-3xl font-bold text-secondary mb-4">
                    {status === 404 ? "Page Not Found" : "Something Went Wrong!"}
                 </h2>

                 <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                     {status === 404 
                    ? "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
                    : message}
                 </p>


                 <Link to='/' className='btn btn-primary btn-lg'><FaHome/>Go to Homepage</Link>
            </div>
        </div>
    );
};

export default ErrorPage;