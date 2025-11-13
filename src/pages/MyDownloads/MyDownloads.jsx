import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaListAlt, FaShoppingCart, FaSpinner } from 'react-icons/fa';

const MyDownloads = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [purchasedModels, setPurchasedModels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const SERVER_URL = 'https://simple-server-smoky.vercel.app';

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            setPurchasedModels([]);
            setLoading(false);
            return;
        }

        //  Fetch user's purchased models
        fetch(`${SERVER_URL}/my-purchases/${user.email}`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch purchases');
                return res.json();
            })
            .then(data => {
                setPurchasedModels(data || []);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
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
        <div className="py-8">
            <div className="text-center mb-10">
                <h1 className="text-5xl font-extrabold text-secondary flex items-center justify-center gap-3">
                    <FaShoppingCart /> My Model Purchase List
                </h1>
                <p className="mt-3 text-xl text-gray-500">
                    Models you’ve purchased for collaboration and usage.
                </p>
            </div>

            {purchasedModels.length === 0 ? (
                //  No Purchases Yet
                <div className="text-center py-20 p-8 bg-base-100 rounded-xl shadow-lg glass-card max-w-lg mx-auto">
                    <h2 className="text-3xl font-bold text-primary">No Models Purchased Yet</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        You haven’t purchased any model details yet.
                    </p>
                    <Link to="/models" className="btn btn-primary mt-6">
                        <FaListAlt /> Explore All Models
                    </Link>
                </div>
            ) : (
                //  Table of Purchases
                <div className="overflow-x-auto bg-base-100 p-6 rounded-xl shadow-lg glass-card">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr className="text-lg">
                                <th>#</th>
                                <th>Model Name</th>
                                <th>Framework</th>
                                <th>Use Case</th>
                                <th>Creator</th>
                                <th>Purchased On</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchasedModels.map((purchase, index) => (
                                <tr key={purchase._id}>
                                    <td>{index + 1}</td>
                                    <td>{purchase.purchasedModelData?.name || 'N/A'}</td>
                                    <td>{purchase.purchasedModelData?.framework || 'N/A'}</td>
                                    <td>{purchase.purchasedModelData?.useCase || 'N/A'}</td>
                                    <td>{purchase.purchasedModelData?.creatorEmail || 'Unknown'}</td>
                                    <td>{new Date(purchase.purchasedAt).toLocaleDateString()}</td>
                                    <td>
                                        <Link
                                            to={`/models/${purchase.originalModelId}`}
                                            className="btn btn-sm btn-primary"
                                        >
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyDownloads;
