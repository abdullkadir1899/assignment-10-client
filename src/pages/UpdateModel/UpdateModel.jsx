// src/pages/UpdateModel/UpdateModel.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaEdit, FaCode, FaTag, FaDatabase, FaImage, FaInfoCircle, FaDollarSign } from 'react-icons/fa';

const UpdateModel = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [modelData, setModelData] = useState(null);

    const SERVER_URL = 'https://simple-server-smoky.vercel.app';

    useEffect(() => {
        const fetchModel = async () => {
            try {
                const response = await fetch(`${SERVER_URL}/models/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.createdBy !== user?.email) {
                        Swal.fire('Access Denied!', 'You can only edit your own models.', 'error');
                        navigate('/my-models');
                        return;
                    }
                    setModelData(data);
                } else {
                    throw new Error('Model not found.');
                }
            } catch (error) {
                Swal.fire('Error!', error.message, 'error');
                navigate('/my-models');
            }
        };
        if (user) fetchModel();
    }, [id, user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const updateModel = {
            name: form.name.value,
            framework: form.framework.value,
            useCase: form.useCase.value,
            dataset: form.dataset.value,
            price: parseFloat(form.price.value) || 0,
            description: form.description.value,
            image: form.image.value,
            createdBy: modelData.createdBy,
        };

        try {
            const response = await fetch(`${SERVER_URL}/models/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateModel),
            });
            const data = await response.json();

            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Model Updated!',
                    text: 'The AI Model has been successfully updated.',
                    showConfirmButton: false,
                    timer: 2500,
                });
                navigate('/my-models');
            } else {
                throw new Error(data.message || 'Failed to update model.');
            }
        } catch (error) {
            console.error('Error updating model:', error);
            Swal.fire({
                icon: 'error',
                title: 'Update Failed!',
                text: error.message || 'Could not connect to the server.',
                confirmButtonColor: '#d33',
            });
        } finally {
            setLoading(false);
        }
    };

    if (!modelData) {
        return <div className="flex justify-center items-center h-[80vh]">Loading...</div>;
    }

    return (
        <div className="py-10">
            <div className="max-w-4xl mx-auto p-8 bg-base-100 shadow-2xl rounded-xl glass-card">
                <h2 className="text-4xl font-extrabold text-center text-primary mb-8 flex items-center justify-center gap-3">
                    <FaEdit className="text-secondary" /> Update AI Model
                </h2>

                <p className="text-center text-gray-500 mb-6">
                    Update the details of your existing AI model.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label"><span className="label-text font-semibold">Model Name *</span></label>
                            <input type="text" defaultValue={modelData.name} name="name" className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text font-semibold flex items-center gap-1"><FaCode /> Framework *</span></label>
                            <input type="text" defaultValue={modelData.framework} name="framework" className="input input-bordered w-full" required />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label"><span className="label-text font-semibold flex items-center gap-1"><FaTag /> Use Case *</span></label>
                            <input type="text" defaultValue={modelData.useCase} name="useCase" className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text font-semibold flex items-center gap-1"><FaDatabase /> Dataset Used *</span></label>
                            <input type="text" defaultValue={modelData.dataset} name="dataset" className="input input-bordered w-full" required />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label"><span className="label-text font-semibold flex items-center gap-1"><FaDollarSign /> Price ($)</span></label>
                            <input type="number" step="0.01" defaultValue={modelData.price || 0} name="price" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text font-semibold flex items-center gap-1"><FaImage /> Image (ImgBB URL) *</span></label>
                            <input type="url" defaultValue={modelData.image} name="image" className="input input-bordered w-full" required />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold flex items-center gap-1"><FaInfoCircle /> Description *</span></label>
                        <textarea defaultValue={modelData.description} name="description" className="textarea textarea-bordered h-24 w-full" required></textarea>
                    </div>

                    <div className="form-control pt-4">
                        <button type="submit" className="btn btn-primary w-full rounded-2xl btn-lg" disabled={loading}>
                            {loading ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                "Update Model"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateModel;
