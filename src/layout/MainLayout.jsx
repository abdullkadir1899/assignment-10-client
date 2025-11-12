import React from 'react';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <NavBar></NavBar>
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;