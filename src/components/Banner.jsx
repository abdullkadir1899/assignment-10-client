import React from 'react';

const Banner = () => {
    return (
        <div className="carousel w-full h-[50vh] md:h-[30vh] rounded-xl shadow-lg mt-6">
            
            {/* Slide 1 */}
            <div id="slide1" className="carousel-item relative w-full bg-cover bg-center" 
                 style={{ backgroundImage: 'url(https://i.ibb.co/313yv6W/ai-slide1.jpg)' }}>
                <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                    <div className='text-center text-white p-8'>
                        <h2 className='text-4xl md:text-6xl font-bold mb-4'>Cataloging the Future</h2>
                        <p className='text-lg md:text-xl'>Manage your AI models seamlessly across frameworks.</p>
                    </div>
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide3" className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>

            {/* Slide 2 */}
            <div id="slide2" className="carousel-item relative w-full bg-cover bg-center"
                 style={{ backgroundImage: 'url(https://i.ibb.co/xL3tG6V/ai-slide2.jpg)' }}>
                <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                    <div className='text-center text-white p-8'>
                        <h2 className='text-4xl md:text-6xl font-bold mb-4'>From PyTorch to TensorFlow</h2>
                        <p className='text-lg md:text-xl'>Detailed metadata management for every AI asset in your inventory.</p>
                    </div>
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle">❮</a>
                    <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
            </div>

            {/* Slide 3 */}
            <div id="slide3" className="carousel-item relative w-full bg-cover bg-center"
                 style={{ backgroundImage: 'url(https://i.ibb.co/P99745c/ai-slide3.jpg)' }}>
                <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                    <div className='text-center text-white p-8'>
                        <h2 className='text-4xl md:text-6xl font-bold mb-4'>Powering Collaboration</h2>
                        <p className='text-lg md:text-xl'>Share and track model usage with purchase counts and creator details.</p>
                    </div>
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle">❮</a>
                    <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
            </div>
        </div>
    );
};

export default Banner;