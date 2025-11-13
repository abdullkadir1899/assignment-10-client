import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { fetchModule } from 'vite';

const UpdateModel = () => {
    const {user} = useContext(AuthContext);
    const {id} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [modelData, setModelData] = useState(null);

    const SERVER_URL = 'https://assignment-10-server-two-beta.vercel.app/'

    useEffect(() => {
        const fetchModel = async () => {
            try{
                const response = await fetch(`${SERVER_URL}/models/${id}`);
                if(response.ok){
                    const data = await response.json();
                    if(data.createdBy !== user?.email){
                        Swal.fire('Access Denied!', 'You can only edit your own models.', 'error');
                        navigate('/my-models');
                        return;
                    }
                    setModelData(data);
            }
            else{
                throw new Error('Model not found.')
            }
        }
        catch(error){
            Swal.fire('Error!', error.message, 'error');
            navigate('/my-models')
        }
        }
        if(user) fetchModel()
    }, [id, user, navigate])




    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)



        const form = e.target;
        const updateModel = {
            name: form.name.value,
            framework: form.framework.value,
            useCase: form.useCase.value,
            dateset: form.dateset.value,
            description: form.description.value,
            image: form.image.value,
        };

        try{
            const response = await fetch(`${SERVER_URL}/models/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updateModel)
            });
            const data = await response.json();

            if(data.success){
                 Swal.fire({
                    icon: 'success',
                    title: 'Model Updated!',
                    text: 'The AI Model has been successfully updated.',
                    showConfirmButton: false,
                    timer: 2500
                });
            }
            else{
                throw new Error(data.message || 'failed to update model')
            }
        }
        catch(error){
            console.error("Error updating model:", error);
            Swal.fire({
                icon: 'error',
                title: 'Update Failed!',
                text: error.message || 'Could not connect to the server.',
                confirmButtonColor: '#d33'
            }); 
        }
        finally{
            setLoading(false)
        }
    }


    if(!modelData){
        return <div className="flex justify-center items-center h-[80vh]">Loading...</div>
    }

    return (
        <div>
            
        </div>
    );
};

export default UpdateModel;