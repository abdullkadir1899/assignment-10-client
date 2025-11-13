import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { FaEdit, FaEnvelope, FaImage, FaSave, FaSpinner, FaUserCircle } from 'react-icons/fa'; // Fixed: FaImages → FaImage

const Profile = () => {
    const {user, updateUserProfile, loading: authLoading} = useContext(AuthContext)
    const [displayName, setDisplayName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false)



    useEffect(() => {
        if(user){
            setDisplayName(user.displayName || '');
            setPhotoURL(user.photoURL || '');
        }
    }, [user])


    const handleUpdateProfile = (e) => {
        e.preventDefault();
        setUpdateLoading(true);


        updateUserProfile(displayName, photoURL)
        .then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Profile Updated!',
                text: 'Your profile details have been successfully updated.',
                showConfirmButton: false,
                timer: 2000
            });
            setIsEditing(false)
        })
        .catch(error => {
            console.error('Profile update failed', error);
            Swal.fire({
                icon: 'error',
                title: 'Update Failed!',
                text: error.message || 'Could not update profile.',
                confirmButtonColor: '#d33'
            });
        })
        .finally(() => {
            setUpdateLoading(false);
        })
        
    };


    if (authLoading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <FaSpinner className="animate-spin text-5xl text-primary" />
                <span className="ml-3 text-xl">Loading Profile...</span>
            </div>
        );
    };



    
    if (!user) {
        return (
            <div className="text-center py-20">
                <h2 className="text-3xl font-bold text-red-600">Access Denied</h2>
                <p className="mt-4 text-lg">Please login to view your profile.</p>
            </div>
        );
    }


    return (
        <div className="py-10">
            <div className="max-w-xl mx-auto p-8 bg-base-100 shadow-2xl rounded-xl glass-card">
                <h2 className="text-4xl font-extrabold text-center text-primary mb-8 flex items-center justify-center gap-3">
                    <FaUserCircle className='text-secondary'/> My Profile
                </h2>

                <div className="flex justify-center mb-6">
                    <div className="avatar">
                        <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img 
                                src={user.photoURL || "https://i.ibb.co/bF93c4g/default-user.jpg"} 
                                alt="User Profile"
                            />
                        </div>
                    </div>
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="form-control">
                        <label className="label"><span className="label-text flex items-center gap-2"><FaUserCircle /> Name</span></label>
                        <input 
                            type="text" 
                            placeholder="Display Name" 
                            value={displayName} 
                            onChange={(e) => setDisplayName(e.target.value)} 
                            className="input input-bordered w-full" 
                            readOnly={!isEditing}
                            required={!isEditing}
                        />
                    </div>
                    
                    <div className="form-control">
                        <label className="label"><span className="label-text flex items-center gap-2"><FaEnvelope /> Email</span></label>
                        <input 
                            type="email" 
                            value={user.email} 
                            className="input input-bordered w-full bg-base-200 cursor-not-allowed" 
                            readOnly
                        />
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text flex items-center gap-2"><FaImage /> Photo URL</span></label>
                        <input 
                            type="url" 
                            placeholder="Paste your image URL" 
                            value={photoURL} 
                            onChange={(e) => setPhotoURL(e.target.value)} 
                            className="input input-bordered w-full" 
                            readOnly={!isEditing}
                        />
                    </div>
                    
                    <div className="form-control pt-4">
                        {isEditing ? (
                            <button type="submit" className="btn btn-primary" disabled={updateLoading}>
                                {updateLoading ? (
                                    <FaSpinner className="animate-spin" />
                                ) : (
                                    <><FaSave /> Save Changes</>
                                )}
                            </button>
                        ) : (
                            <button type="button" onClick={() => setIsEditing(true)} className="btn btn-secondary">
                                <FaEdit /> Edit Profile
                            </button>
                        )}
                        {isEditing && !updateLoading && (
                            <button type="button" onClick={() => { setIsEditing(false); }} className="btn btn-outline btn-sm mt-3">
                                Cancel Edit
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;