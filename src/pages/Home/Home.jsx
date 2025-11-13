import React, { useContext, useEffect, useState } from 'react';
import Banner from '../../components/Banner';
import { FaCheckCircle, FaPlusCircle, FaRobot, FaSpinner, FaUserPlus } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {
    const {user} = useContext(AuthContext)
    const [featuredModels, setFeaturedModels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)


    const SERVER_URL = 'https://assignment-10-server-two-beta.vercel.app/'

    const fetchFeaturedModels = async () => {
        setLoading(true);
        setError(null);
        try{
            const response = await fetch(`${SERVER_URL}/featured-models`)
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setFeaturedModels(data)
        }
        catch(err){ 
            console.log('failed to fetch featured models:', err);
            setError('failed to load featured AI Models')
        }
        finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        fetchFeaturedModels();
    }, [])



    const FeaturedModelsSection = () => {
        if(loading){
            return (
                <div className="flex justify-center items-center py-20">
                    <FaSpinner/>
                    <span className="ml-3 text-lg">Loading Featured Models...</span>
                </div>
            )
        };

        if(error){
            return(
                <div className="text-center py-10">
                    <h3 className="text-2xl font-bold text-red-600">Error</h3>
                    <p className='mt-2'>{error}</p>
                </div>
            )
        };

        if(fetchFeaturedModels.length === 0){
            return (
                <div className="text-center py-10">
                    <h3 className="text-2xl font-bold text-secondary">No Featured Models Yet</h3>
                    <p className="mt-2">Be the first to <Link to="/add-model" className="link link-primary">add a model!</Link></p>
                </div>
            )
        };

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredModels.map(model => (
                    <ModelCard key={model._id} model={model} />
                ))}
            </div>
);



    }


    return (
        <div>
            <Banner></Banner>
            <section className="py-16" id="about-ai-models">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-center text-primary mb-6 flex items-center justify-center gap-3">
                        <FaRobot className='text-secondary'/> What Are AI Models?
                    </h2>
                <div className="bg-base-200 p-8 rounded-xl shadow-lg glass-card">
                    <p className="text-lg leading-relaxed mb-4">
                    AI Models are sophisticated algorithms, often based on **Neural Networks**, that have been trained on vast amounts of data to recognize patterns, make predictions, or generate new content. They are the core intellectual property in machine learning applications.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                    <li>**Use Cases:** Ranging from simple classifiers (e.g., image recognition) to complex generative systems (e.g., chatbots like ChatGPT).</li>
                    <li>**Importance:** They drive modern technology, enabling automation, personalized experiences, and cutting-edge research.</li>
                    <li>**Frameworks:** Typically developed using frameworks like **TensorFlow** or **PyTorch**, and require careful management and version control.</li>
                </ul>
                </div>
                </div>
            </section>

            <section>
                <h2>Featured AI Models</h2>
                {/* set item */}
            </section>

            <section className='py-16' id='get-started'>
                <div className="max-w-4xl mx-auto text-center p-10 bg-primary text-primary-content rounded-xl shadow-2xl">
                    <h2 className="text-4xl font-extrabold mb-4">Ready to Manage your Ai Inventory</h2>
                    <p className="text-lg mb-8 opacity-90"></p>

                {user ? (
                    <Link to='/add-model' className='btn btn-secondary btn-lg text-lg'><FaPlusCircle></FaPlusCircle></Link>
                ) : (
                    <div>
                        <Link to='/login' className='btn btn-secondary btn-lg text-lg'> <FaCheckCircle></FaCheckCircle> Login</Link>
                        <Link to='/register' className='btn btn-outline btn-secondary btn-lg text-lg'><FaUserPlus></FaUserPlus>Register now</Link>
                    </div>
                )}
                </div>
            </section>

        </div>
    );
};

export default Home;