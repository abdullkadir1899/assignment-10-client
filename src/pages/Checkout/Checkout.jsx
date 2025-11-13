// src/pages/Checkout/Checkout.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaSpinner, FaDollarSign, FaCreditCard, FaCheckCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Checkout = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [model, setModel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [purchaseLoading, setPurchaseLoading] = useState(false);

    const SERVER_URL = 'https://simple-server-smoky.vercel.app';

    // 🔹 Model Data Fetch
    useEffect(() => {
        const fetchModel = async () => {
            try {
                const response = await fetch(`${SERVER_URL}/models/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setModel(data);
                } else {
                    throw new Error('Model not found.');
                }
            } catch (error) {
                Swal.fire('Error!', 'Model not found.', 'error');
                navigate('/models');
            } finally {
                setLoading(false);
            }
        };
        fetchModel();
    }, [id, navigate]);

    // 🔹 Purchase Handler
    const handlePurchase = async () => {
        if (!user) {
            Swal.fire('Login Required!', 'Please log in to purchase.', 'warning');
            navigate('/login');
            return;
        }

        setPurchaseLoading(true);
        try {
            const response = await fetch(`${SERVER_URL}/purchase-model/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    purchaserEmail: user.email,
                    purchasedModelData: { ...model, creatorEmail: model.createdBy }
                }),
            });

            const data = await response.json();

            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Purchase Successful!',
                    text: `Paid $${model.price || 'Free'}. Details unlocked!`,
                    showConfirmButton: false,
                    timer: 2500
                });
                navigate(`/models/${id}`); // Redirect to details page
            } else {
                throw new Error(data.message || 'Purchase failed.');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Purchase Failed!',
                text: error.message,
                confirmButtonColor: '#d33'
            });
        } finally {
            setPurchaseLoading(false);
        }
    };

    // 🔹 Loading State
    if (loading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <FaSpinner className="animate-spin text-5xl text-primary" />
            </div>
        );
    }

    if (!model) return <div>Model not found.</div>;

    // 🔹 Main UI
    return (
        <div className="max-w-md mx-auto py-10">
            <div className="bg-base-100 p-8 rounded-xl shadow-2xl glass-card">
                <h2 className="text-3xl font-bold text-center text-primary mb-6">Checkout</h2>
                
                <div className="space-y-4 mb-6">
                    <p><strong>Model:</strong> {model.name}</p>
                    <p><strong>Framework:</strong> {model.framework}</p>
                    <p><strong>Price:</strong> <FaDollarSign className="inline" /> {model.price || 'Free'}</p>
                    <p><strong>Total:</strong> <FaDollarSign className="inline" /> {model.price || 'Free'}</p>
                </div>

                <div className="form-control mb-6">
                    <label className="label"><span className="label-text">Payment Method</span></label>
                    <select className="select select-bordered w-full">
                        <option>Credit Card</option>
                        <option>PayPal</option>
                    </select>
                </div>

                <button 
                    onClick={handlePurchase} 
                    disabled={purchaseLoading}
                    className="btn btn-primary w-full mb-4"
                >
                    {purchaseLoading ? (
                        <FaSpinner className="animate-spin" />
                    ) : (
                        <>
                            <FaCreditCard className="inline mr-2" /> Pay Now
                        </>
                    )}
                </button>

                <Link to={`/models/${id}`} className="btn btn-outline w-full">
                    <FaCheckCircle className="inline mr-2" /> Cancel
                </Link>
            </div>
        </div>
    );
};

export default Checkout;
