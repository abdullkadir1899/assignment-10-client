import React, { useState, useEffect } from 'react';
import ModelCard from '../../components/ModelCard';
import { FaSpinner, FaSearch, FaFilter, FaListAlt } from 'react-icons/fa';


const SERVER_URL = 'https://simple-server-smoky.vercel.app'; 

const AllModels = () => {
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterFramework, setFilterFramework] = useState('All');

    const fetchModels = async () => {
        setLoading(true);
        setError(null);
        try {
            let url = `${SERVER_URL}/models`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setModels(data);
        } catch (err) {
            console.error("Failed to fetch models:", err);
            setError("Failed to load AI models. Please check the server connection.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchModels();
    }, []);


    const filteredModels = models.filter(model => 
        model.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterFramework === 'All' || model.framework === filterFramework)
    );

    const uniqueFrameworks = [...new Set(models.map(model => model.framework))];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <FaSpinner className="animate-spin text-5xl text-primary" />
                <span className="ml-3 text-xl">Loading AI Models...</span>
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
                <h1 className="text-5xl font-extrabold text-primary flex items-center justify-center gap-3">
                    <FaListAlt /> All AI Models
                </h1>
                <p className="mt-3 text-xl text-gray-500">Explore the comprehensive inventory of artificial intelligence models.</p>
            </div>


            <div className="flex flex-col md:flex-row gap-4 mb-10 p-5 bg-base-200 rounded-lg glass-card">
                {/* Search Bar */}
                <div className="form-control flex-grow">
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Search models by name..."
                            className="input input-bordered w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-primary"><FaSearch /></button>
                    </div>
                   
                </div>

                {/* Filter Dropdown */}
                <div className="form-control w-full md:w-64">
                    <label className="label"><span className="label-text flex items-center gap-1"><FaFilter /> Filter by Framework</span></label>
                    <select
                        className="select select-bordered"
                        value={filterFramework}
                        onChange={(e) => setFilterFramework(e.target.value)}
                    >
                        <option value="All">All Frameworks</option>
                        {uniqueFrameworks.map(framework => (
                            <option key={framework} value={framework}>{framework}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Display Models */}
            {filteredModels.length === 0 ? (
                <div className="text-center py-20">
                    <h2 className="text-3xl font-bold text-secondary">No AI Models Found</h2>
                    <p className="mt-2 text-lg">Try adjusting your search or filter settings.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredModels.map(model => (
                        <ModelCard key={model._id} model={model} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllModels;