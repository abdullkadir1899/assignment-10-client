import React from 'react';
import Banner from '../../components/Banner';
import { FaRobot } from 'react-icons/fa';

const Home = () => {
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
            </section>

        </div>
    );
};

export default Home;