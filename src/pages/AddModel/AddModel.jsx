import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaCode, FaDatabase, FaImage, FaInfoCircle, FaPlusCircle, FaTag } from 'react-icons/fa';
const SERVER_URL = 'https://assignment-10-server-two-beta.vercel.app/';

const AddModel = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const newModel = {
            name: form.name.value,
            framework: form.framework.value,
            dataset: form.dataset.value,
            description: form.description.value,
            image: form.image.value,
            createdBy: user?.email,
        }
        console.log('submitting model:', newModel);

        try{
            const response = await fetch(`${SERVER_URL}/models`,{
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(newModel),
            });

            const data = await response.json()

            if(data.success){
                Swal.fire({
                    icon: 'success',
                    title: 'Model Added!',
                    text: 'The new AI Model has been successfully added to the inventory.',
                    showConfirmButton: false,
                    timer: 2500
                });
                form.reset();
                navigate('/models');
            }
            else{
                throw new Error(data.message || 'Failed to add model due to server issue')
            }
        }
        catch(error){
            console.error('Error submitting')
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed!',
                text: error.message || 'Could not connect to the server or unknown error occurred.',
                confirmButtonColor: '#d33'
            });
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <div>
            <div>
                <h2 className="text-4xl font-extrabold text-center text-primary mb-8 flex items-center justify-center gap-3">
                    <FaPlusCircle className='text-secondary'/> Add New AI Model
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Enter the details to catalog a new AI model in the inventory.
                </p>


            <form onSubmit={handleSubmit} className=' space-y-6'>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Model Name *</span></label>
                        <input type="text" placeholder="e.g., BERT, ResNet-50" name="name" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold flex items-center gap-1"><FaCode/> Framework *</span></label>
                        <input type="text" placeholder="e.g., TensorFlow, PyTorch, Keras" name="framework" className="input input-bordered w-full" required />
                    </div>
                </div>



                <div className="grid md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold flex items-center gap-1"><FaTag/> Use Case *</span></label>
                        <input type="text" placeholder="e.g., NLP, Computer Vision, Generative AI" name="useCase" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold flex items-center gap-1"><FaDatabase/> Dataset Used *</span></label>
                        <input type="text" placeholder="e.g., ImageNet, COCO, Wikipedia" name="dataset" className="input input-bordered w-full" required />
                    </div>
                </div>


                {/* img URL */}
                <div className="form-control">
                    <label className="label"><span className="label-text font-semibold flex items-center gap-1"><FaImage/> Image (ImgBB URL) *</span></label>
                    <input type="url" placeholder="Paste the ImgBB URL for the model's diagram/screenshot" name="image" className="input input-bordered w-full" required />
                </div>

                {/* description */}
                <div className="form-control">
                    <label className="label"><span className="label-text font-semibold flex items-center gap-1"><FaInfoCircle/> Description *</span></label>
                    <textarea placeholder="Brief description of the model’s purpose and architecture..." name="description" className="textarea textarea-bordered h-24 w-full" required></textarea>
                </div>

                <input type="hidden" name="createdBy" value={user?.email || ''} />

                <div className="form-control pt-4">
                    <button type="submit" className="btn btn-primary w-full rounded-2xl btn-lg" disabled={loading}>
                    {loading ? (
                        <span className="loading loading-spinner"></span>
                    ) : (
                        "Add Model to Inventory"
                    )}
                    </button>
                </div>

            </form>

            </div>
        </div>
    );
};

export default AddModel;



