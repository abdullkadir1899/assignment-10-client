import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home/Home';
import Login from '../pages/Auth/Login';
import Registration from '../pages/Auth/Registration';
import AllModel from '../pages/AllModel/AllModel';
import PrivateRoute from './PrivateRoute';
import AddModel from '../pages/AddModel/AddModel';
import ModelDetails from '../pages/ModelDetails/ModelDetails';
import UpdateModel from '../pages/UpdateModel/UpdateModel';
import MyModels from '../pages/MyModels/MyModels';
import MyDownloads from '../pages/MyDownloads/MyDownloads';
import Profile from '../pages/Profile/Profile';
import Checkout from '../pages/Checkout/Checkout';

const router = createBrowserRouter([
    {
        path: '/', 
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login', 
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Registration></Registration>
            },
            {
                path: '/models',
                element: <AllModel></AllModel>
            },
            {
                path: '/add-model',
                element: <PrivateRoute><AddModel></AddModel></PrivateRoute>
            },
            {
                path: '/models/:id',
                element: <PrivateRoute><ModelDetails></ModelDetails></PrivateRoute>
            },
            {
                path: '/update-model/:id',
                element: <PrivateRoute><UpdateModel></UpdateModel></PrivateRoute>
            },
            {
                path: '/my-models',
                element: <PrivateRoute><MyModels></MyModels></PrivateRoute>
            },
            {
                path: '/model-purchase',
                element: <PrivateRoute><MyDownloads></MyDownloads></PrivateRoute>
            },
            {
                path: '/profile',
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
            {
                path: '/checkout/:id',
                element: <PrivateRoute><Checkout></Checkout></PrivateRoute>
            }
        ]
    }
])

export default router