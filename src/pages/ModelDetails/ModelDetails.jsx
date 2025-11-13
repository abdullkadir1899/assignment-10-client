import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaCode, FaDollarSign, FaSpinner, FaTag, FaUser } from 'react-icons/fa';

const ModelDetails = () => {
    const {user} = useContext(AuthContext)
    const {id} = useParams()

    const [model, setModels] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isPurchased, setIsPurchased] = useState(false);

    const SERVER_URL = 'https://assignment-10-server-two-beta.vercel.app/';

    const fetchModelDetails = async () => {
        setLoading(true);
        setError(null);
        try{
            const response = await fetch(`${SERVER_URL}/models/${id}`);
            if(!response.ok){
                throw new Error('failed to fetch model details')
            }
            const data = await response.json();
            setModels(data)
            if(user && user.email){
                checkPurchaseStatus(data.createdBy);
            }
        }
        catch(err) {
            console.error('Fetch Error', err);
            setError('failed to load model details')
        }
        finally{
            setLoading(false);
        }
    }


    const checkPurchaseStatus = async (creatorEmail) => {
        if(user.email === creatorEmail) {
            setIsPurchased(true);
            return
        }


        try{
            const response = await fetch(`${SERVER_URL}/check-purchase-status`, {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({userEmail: user.email, modelId: id}),
            });
            if(response.ok){
                const data = await response.json();
                setIsPurchased(data.isPurchased);
            }
        }
        catch(error){
            console.error('purchase check failed', error)
        }
    }


    const handleBuyNow = async () => {
        if(!user){
            Swal.fire('Login Required!', 'Please log in to purchase.', 'warning');
            return;
        }

        try{
            const response = await fetch(`${SERVER_URL}/purchase-model/${id}`, {
                method: "POST",
                headers: {'Context-Type': 'application/json'},
                body: JSON.stringify({
                    purchaserEmail: user.email,
                    purchasedModelData: {...model, creatorEmail: model.createdBy}
                }),
            });

            const data = await response.json();

            if(data.success){
                    Swal.fire({
                    icon: 'success',
                    title: 'Purchase Successful!',
                    text: `Model details unlocked for $${model.price || 'Free'}. Check your purchases!`,
                    showConfirmButton: false,
                    timer: 2500
                });
            }
            else{
                throw new Error(data.message || 'Purchase failed.')
            }
        }
        catch(error){
            console.error("Purchase Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Purchase Failed!',
                text: error.message || 'Could not complete purchase.',
                confirmButtonColor: '#d33'
            });
        }
    }



    useEffect(() => {
        if(id) {
            fetchModelDetails();
        }
    }, [id, user]);


    if(loading){
        return(
            <div className="flex justify-center items-center h-[80vh]">
                <FaSpinner className="animate-spin text-5xl text-primary" />
                <span className="ml-3 text-xl">Loading Model...</span>
            </div>
        )
    }


    if (error) {
        return (
            <div className="text-center py-20">
                <h2 className="text-3xl font-bold text-red-600">Error!</h2>
                <p className="mt-4 text-lg">{error}</p>
            </div>
        );
    }


    if (!model) {
        return (
            <div className="text-center py-20">
                <h2 className="text-3xl font-bold text-secondary">Model Not Found</h2>
                <p className="mt-4 text-lg">The requested model does not exist.</p>
                <Link to="/models" className="btn btn-primary mt-6">Go to Models</Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <div className="bg-base-100 p-8 rounded-xl shadow-2xl">
                <h1 className="text-5xl font-extrabold text-primary mb-4">{model.name}</h1>
                <p className="text-xl text-gray-600 mb-8">{model.description}</p>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                <p className="text-lg flex items-center gap-2"><FaCode className="text-secondary" /> <strong>Framework:</strong> {model.framework}</p>
                <p className="text-lg flex items-center gap-2"><FaTag className="text-secondary" /> <strong>Use Case:</strong> {model.useCase}</p>
                <p className="text-lg flex items-center gap-2"><FaDollarSign className="text-secondary" /> <strong>Price:</strong> ${model.price || 'Free'}</p> 
                <p className="text-lg flex items-center gap-2"><FaUser className="text-secondary" /> <strong>Creator:</strong> {model.createdBy}</p>
            </div>

            <hr className='my-6' />

            {isPurchased ? (
                <div className="p-6 bg-success/10 border border-success rounded-lg">
                    <h3 className="text-2xl font-bold text-success mb-3">✅ Purchase Confirmed!</h3>
                    <p className="mb-4">You have access to the full details and collaborative resources for this model.</p>
                    
                    <div className="bg-success/20 p-4 rounded-md">
                        <p className="font-semibold text-success">Contact/Download Details (Only for Purchaser):</p>
                        <p className="mt-2"><strong>Creator Email:</strong> {model.creatorEmail || model.createdBy}</p> {/* Fallback */}
                        <p><strong>Download Link:</strong> <a href={model.downloadLink || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Download Model Package <FaFileDownload className="inline ml-1" /></a></p>
                    </div>
                </div>
            ) : (
                <div className="p-6 bg-warning/10 border border-warning rounded-lg text-center">
                    <h3 className="text-2xl font-bold text-warning mb-4"> Purchase Details to Unlock Access</h3>
                    <p className="mb-5">To get the creator's contact details and the model download link, you must purchase the model details for **${model.price || 'Free'}**.</p>

                    <button onClick={handleBuyNow} className="btn btn-warning btn-lg">
                        <FaDollarSign /> Buy Now to Unlock Details
                    </button>

                </div>
            )}

            </div>
        </div>
    );
};

export default ModelDetails;