import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaImage, FaUser, FaUserPlus, FaGoogle, FaLock } from 'react-icons/fa';

const SERVER_URL = 'https://assignment-10-server-two-beta.vercel.app/';

const Registration = () => {
    const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
    const [registerError, setRegisterError] = useState('');
    const navigate = useNavigate();

    const saveUserToDB = async (name, email, photoURL = '') => {
        const userDetails = { name, email, photoURL };
        try {
            const response = await fetch(`${SERVER_URL}/users`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDetails),
            });
            const data = await response.json();
            if (data.success) {
                console.log("user saved to DB successfully", data);
            } else {
                console.warn("user already exists or failed to save to DB: ", data);
            }
        } catch (error) {
            console.error('error saving user to db:', error);
        }
    };

    const handleRegistration = (e) => {
        e.preventDefault();
        setRegisterError('');
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        const photoURL = form.photoURL.value || '';

        if (password !== confirmPassword) {
            setRegisterError('Passwords do not match');
            return;
        }

        createUser(email, password)
            .then(result => {
                return updateUserProfile(name, photoURL);
            })
            .then(() => {
                return saveUserToDB(name, email, photoURL);
            })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful!',
                    text: `Welcome, ${name}! You are now registered.`,
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate('/');
            })
            .catch(error => {
                console.error("Registration failed:", error);
                let errorMessage = "Registration failed. Please check your details.";
                if (error.code === 'auth/email-already-in-use') {
                    errorMessage = "Email already in use. Please use a different email.";
                } else if (error.code === 'auth/weak-password') {
                    errorMessage = "Password is too weak. Please choose a stronger one.";
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed!',
                    text: errorMessage,
                    confirmButtonColor: '#d33'
                });
                setRegisterError(errorMessage);
            });
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                return saveUserToDB(user.displayName, user.email, user.photoURL || '')
                    .then(() => user);
            })
            .then(user => {
                Swal.fire({
                    icon: 'success',
                    title: 'Google Registration Successful!',
                    text: `Welcome, ${user.displayName}!`,
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate('/');
            })
            .catch(error => {
                console.error("Google Sign-in failed:", error);
                let errorMessage = 'Could not register with Google.';
                if (error.code === 'auth/popup-closed-by-user') {
                    errorMessage = 'Google sign-in was cancelled.';
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Google Sign-in Failed!',
                    text: errorMessage,
                    confirmButtonColor: '#d33'
                });
            });
    };

    return (
        <div className="flex justify-center items-center  min-h-screen">
            <div className="w-full max-w-md p-8 space-y-6 bg-base-100 shadow-2xl rounded-xl glass-card">
                <h2 className="text-3xl font-bold text-center text-primary">
                    <FaUserPlus className="inline mr-2" /> Register for AI Model Inventory Manager
                </h2>

                <form onSubmit={handleRegistration} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text flex items-center gap-2">
                                <FaUser /> Name
                            </span>
                        </label>
                        <input type="text" placeholder="Full Name" name="name" className="input w-full input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text flex items-center gap-2">
                                <FaUser /> Email
                            </span>
                        </label>
                        <input type="email" placeholder="you@example.com" name="email" className="input w-full input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text flex items-center gap-2">
                                <FaImage /> Profile Photo URL (Optional)
                            </span>
                        </label>
                        <input
                            type="url"
                            placeholder="https://example.com/your-photo.jpg"
                            name="photoURL"
                            className="input input-bordered w-full"
                        />
                        <span className="label-text-alt text-xs text-gray-500">Enter a direct image URL for your profile picture.</span>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text flex items-center gap-2">
                                <FaLock /> Password
                            </span>
                        </label>
                        <input type="password" placeholder="Password"  name="password" className="input  w-full input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text flex items-center gap-2">
                                <FaLock /> Confirm Password
                            </span>
                        </label>
                        <input type="password" placeholder="Confirm Password" name="confirmPassword" className="input w-full input-bordered" required /> 
                    </div>

                    {registerError && (
                        <div role="alert" className="alert alert-error">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="stroke-current shrink-0 h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>{registerError}</span>
                        </div>
                    )}

                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary w-full">Register</button>
                    </div>
                </form>

                <div className="divider">OR</div>

                <div className="form-control">
                    <button onClick={handleGoogleSignIn} className="btn btn-outline  w-full btn-info flex items-center gap-2">
                        <FaGoogle /> Sign up with Google
                    </button>
                </div>

                <p className="text-center text-sm mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="link link-primary font-semibold">
                        Login Now
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Registration;