import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthContext';
import { FaPlus, FaTrash, FaSpinner } from 'react-icons/fa';

const MyModels = () => {
    const { user } = useContext(AuthContext);
    const [myModels, setMyModels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const SERVER_URL = 'https://simple-server-smoky.vercel.app';


    const fetchMyModels = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${SERVER_URL}/my-models/${user.email}`);
            if (!response.ok) throw new Error('Failed to fetch models.');
            const data = await response.json();
            setMyModels(data || []);
        } catch (err) {
            console.error('Fetch Error:', err);
            setError('Failed to load your models. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.email) {
            fetchMyModels();
        } else {
            setLoading(false);
        }
    }, [user]);

    const handleDelete = (modelId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This model will be permanently deleted from the database.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`${SERVER_URL}/models/${modelId}`, {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ createdBy: user.email }),
                    });

                    if (!response.ok) throw new Error('Delete request failed.');
                    const data = await response.json();

                    if (data.success) {
                        Swal.fire('Deleted!', 'Your model has been deleted.', 'success');
                        fetchMyModels(); // Refresh list
                    } else {
                        throw new Error(data.message || 'Deletion failed.');
                    }
                } catch (error) {
                    console.error('Delete Error:', error);
                    Swal.fire('Failed!', error.message, 'error');
                }
            }
        });
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <FaSpinner className="animate-spin text-5xl text-primary" />
                <span className="ml-3 text-xl">Loading Your Models...</span>
            </div>
        );
    }

 
    if (error) {
        return (
            <div className="text-center py-20">
                <h2 className="text-3xl font-bold text-red-500">{error}</h2>
                <button onClick={fetchMyModels} className="btn btn-primary mt-4">
                    Retry
                </button>
            </div>
        );
    }


    return (
        <div className="max-w-5xl mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold mb-8 text-center text-secondary flex justify-center items-center gap-2">
                My Models
            </h1>

            {myModels.length === 0 ? (
                <div className="text-center py-20 bg-base-100 rounded-xl shadow-lg glass-card">
                    <h2 className="text-2xl font-semibold text-primary">No Models Yet</h2>
                    <p className="mt-3 text-lg text-gray-500">
                        You haven’t added any models yet.
                    </p>
                    <Link to="/add-model" className="btn btn-success mt-6 flex items-center gap-2 mx-auto">
                        <FaPlus /> Add Your First Model
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myModels.map((model) => (
                        <div key={model._id} className="bg-base-100 p-5 rounded-xl shadow-md hover:shadow-xl transition">
                            <img
                                src={model.image}
                                alt={model.name}
                                className="w-full h-48 object-cover rounded-md"
                            />
                            <h3 className="text-2xl font-bold mt-3">{model.name}</h3>
                            <p className="text-gray-600 mt-1">
                                {model.description?.substring(0, 100)}...
                            </p>

                            <div className="flex gap-2 mt-4">
                                <Link
                                    to={`/models/${model._id}`}
                                    className="btn btn-sm btn-primary"
                                >
                                    View
                                </Link>
                                <Link
                                    to={`/update-model/${model._id}`}
                                    className="btn btn-sm btn-warning"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(model._id)}
                                    className="btn btn-sm btn-error"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="text-center mt-10">
                <Link to="/add-model" className="btn btn-success flex items-center gap-2 mx-auto">
                    <FaPlus /> Add New Model
                </Link>
            </div>
        </div>
    );
};

export default MyModels;
