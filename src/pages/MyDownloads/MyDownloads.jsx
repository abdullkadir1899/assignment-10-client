import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaListAlt, FaShoppingCart } from 'react-icons/fa';

const MyDownloads = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [purchasedModels, setPurchasedModels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const SERVER_URL = 'https://assignment-10-server-two-beta.vercel.app/'

    useEffect(() => {
        if(authLoading) return;
        setLoading(false);
        setPurchasedModels([])
    }, [user, authLoading]);

    if (authLoading || loading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <FaSpinner className="animate-spin text-5xl text-primary" />
                <span className="ml-3 text-xl">Loading...</span>
            </div>
        );
    }


    if (error) {
        return (
            <div className="text-center py-20">
                <h2 className="text-3xl font-bold text-red-600">Error!</h2>
                <p className="mt-4 text-lg">{error}</p>
            </div>
        );
    }

    return (
        <div className=' py-8'>
            <div className="text-center mb-10">
                <h1 className="text-5xl font-extrabold text-secondary flex items-center justify-center gap-3">
                    <FaShoppingCart /> My Model Purchase List
                </h1>
                <p className="mt-3 text-xl text-gray-500">
                    Models whose details you have purchased for collaboration and use.
                </p>
            </div> 


            {purchasedModels.length === 0 ? (
                <div className="text-center py-20 p-8 bg-base-100 rounded-xl shadow-lg glass-card max-w-lg mx-auto">
                    <h2 className="text-3xl font-bold text-primary">No Models Purchased Yet</h2>
                    <p className="mt-4 text-lg">You haven't purchased any model details yet. (Coming soon!)</p>
                    <Link to="/models" className="btn btn-primary mt-6">
                        <FaListAlt /> Explore All Models
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto bg-base-100 p-6 rounded-xl shadow-lg glass-card">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr className='text-lg'>
                                <th>#</th>
                                <th>Model Name</th>
                                <th>Framework</th>
                                <th>Use Case</th>
                                <th>Original Creator</th>
                                <th>Purchased On</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            )} 


        </div>  
    );
};

export default MyDownloads;