// src/pages/MyModels/MyModels.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaSpinner, FaPlus, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyModels = () => {
    const { user } = useContext(AuthContext);
    const [myModels, setMyModels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const SERVER_URL = 'https://assignment-10-server-two-beta.vercel.app/';

    const fetchMyModels = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${SERVER_URL}/models`);  // সব মডেল fetch করো
            if (!response.ok) {
                throw new Error('Failed to fetch models.');
            }
            const allModels = await response.json();
            // Filter: শুধু user-এর তৈরি মডেল
            const userModels = allModels.filter(model => model.createdBy === user.email);
            setMyModels(userModels);
        } catch (err) {
            console.error("Fetch Error:", err);
            setError("Failed to load your models. Please try again.");
        } finally {
            setLoading(false);  // এটা জরুরি! সবসময় loading শেষ করবে
        }
    };

    useEffect(() => {
        if (user) {
            fetchMyModels();
        } else {
            setLoading(false);
        }
    }, [user]);

    // ফুল ডিলিট লজিক (ModelDetails-এর মতো)
    const handleDelete = (modelId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This model will be permanently deleted from the database.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`${SERVER_URL}/models/${modelId}`, {
                        method: 'DELETE',
                    });
                    if (!response.ok) {
                        throw new Error('Delete request failed.');
                    }
                    const data = await response.json();
                    if (data.success) {
                        Swal.fire('Deleted!', 'Your model has been deleted.', 'success');
                        // List refresh: নতুন করে fetch করো
                        fetchMyModels();
                    } else {
                        throw new Error(data.message || 'Deletion failed.');
                    }
                } catch (error) {
                    console.error("Delete Error:", error);
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
                <button onClick={fetchMyModels} className="btn btn-primary mt-4">Retry</button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold mb-8">My Models</h1>
            {myModels.length === 0 ? (
                <p className="text-xl text-gray-600">No models yet. <Link to="/add-model" className="text-primary">Add one!</Link></p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myModels.map(model => (
                        <div key={model._id} className="bg-base-100 p-4 rounded-xl shadow-lg">
                            <img src={model.image} alt={model.name} className="w-full h-48 object-cover rounded" />
                            <h3 className="text-2xl font-bold mt-2">{model.name}</h3>
                            <p className="text-gray-600">{model.description.substring(0, 100)}...</p>
                            <div className="flex gap-2 mt-4">
                                <Link to={`/models/${model._id}`} className="btn btn-primary btn-sm">View</Link>
                                <Link to={`/update-model/${model._id}`} className="btn btn-warning btn-sm">Edit</Link>
                                <button onClick={() => handleDelete(model._id)} className="btn btn-error btn-sm">
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Link to="/add-model" className="btn btn-success mt-6 flex items-center gap-2">
                <FaPlus /> Add New Model
            </Link>
        </div>
    );
};

export default MyModels;