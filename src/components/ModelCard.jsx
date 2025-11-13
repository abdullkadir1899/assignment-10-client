import React from 'react';
import { FaCode, FaTag } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ModelCard = ({model}) => {

    if(!model){
        return <p>No model data available.</p>;
    }

    const shortDescription = model.description.substring(0, 100) + '...';

    return (
        <div className="card w-full h-full bg-base-100 shadow-xl glass-card transition duration-300 hover:shadow-2xl flex flex-col">
            <figure className="h-48 overflow-hidden">
                <img src={model.image}  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" alt={`${model.name} diagram`} />
            </figure>
            
            <div className="card-body p-5 flex flex-col justify-between">
                <div>
                    <h2 className="card-title text-2xl mb-2 text-primary">
                        {model.name}
                    </h2>

                    <div className='space-y-1 text-sm text-gray-600 dark:text-gray-300 mb-3'>
                        <p className="flex items-center gap-2"><FaCode className='text-accent' /> **Framework:** {model.framework}</p>
                        <p className="flex items-center gap-2"><FaTag className='text-secondary' /> **Use Case:** {model.useCase}</p>
                    </div>

                    <p className='text-sm mb-4'>{shortDescription}</p>
                    
                </div>


                <div className="card-actions justify-end mt-auto">
                    <Link to={`/models/${model._id}` } className="btn btn-primary w-full">view Details</Link>
                </div>
            </div>
        </div>
    );
};

export default ModelCard;