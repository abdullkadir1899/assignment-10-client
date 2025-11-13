import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaGoogle, FaUser, FaLock } from 'react-icons/fa';

const Login = () => {
    const { signIn, googleSignIn, resetPassword } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from || '/';

    const handleLogin = (e) => {
        e.preventDefault();
        setLoginError('');
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                console.log("login successful", result.user);
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful!',
                    text: `Welcome back, ${result.user.displayName || result.user.email}!`,
                    showConfirmButton: false,
                    timer: 2000
                });

                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error("Login Error:", error);
                let errorMessage = "An unexpected error occurred during login.";
                if (error.code === 'auth/invalid-credential') {
                    errorMessage = "Invalid email or password. Please check your credentials.";
                } else if (error.code === 'auth/user-not-found') {
                    errorMessage = "User not found. Please register first.";
                }
                setLoginError(errorMessage);
            });
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log('google sign-in successful', result.user);
                Swal.fire({
                    icon: 'success',
                    title: 'Google Login Successful!',
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error("Google Sign-in Error:", error);
                setLoginError("Failed to sign in with Google. Please try again.");
            });
    };

    const handleResetPassword = async () => {
        const { value: email } = await Swal.fire({
            title: 'Reset Password',
            input: 'email',
            inputLabel: 'Enter your registered email address',
            inputPlaceholder: 'you@example.com',
            confirmButtonText: 'Send Reset Email',
            showCancelButton: true,
        });

        if (email) {
            try {
                await resetPassword(email);
                Swal.fire({
                    icon: 'success',
                    title: 'Reset Email Sent!',
                    text: 'Please check your inbox to reset your password.',
                });
            } catch (error) {
                console.error("Password Reset Error:", error);
                let errorMsg = "Failed to send reset email.";
                if (error.code === 'auth/user-not-found') {
                    errorMsg = "Email not found. Please check and try again.";
                } else if (error.code === 'auth/invalid-email') {
                    errorMsg = "Invalid email address. Please try again.";
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to send reset email',
                    text: errorMsg,
                });
            };
        }
    };

    return (
        <div className=' flex items-center justify-center min-h-screen'>
            <div className='max-w-md mx-auto p-8  bg-base-100 shadow-2xl rounded-xl glass-card'>
                <h2 className="text-4xl font-extrabold text-center text-primary mb-8">
                    Login to Your Account
                </h2>

                <div className="divider text-sm text-gray-500">OR USE EMAIL</div>

                <form onSubmit={handleLogin} className='space-y-4'>
                    {/* email */}
                    <div>
                        <label className="label">
                            <span className="label-text flex items-center gap-2">
                                <FaUser /> Email
                            </span>
                        </label>
                        <input 
                            type="email" 
                            placeholder="Your Email" 
                            name="email" 
                            className="input input-bordered w-full" 
                            required 
                        />
                    </div>

                    {/* password */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text flex items-center gap-2">
                                <FaLock /> Password
                            </span>
                        </label>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            name="password" 
                            className="input input-bordered w-full" 
                            required 
                        />
                        <label className="label">
                            <button 
                                type='button' 
                                onClick={handleResetPassword}
                                className="label-text-alt link link-hover"
                            >
                                Forgot Password?
                            </button>
                        </label>
                    </div>

                    {loginError && (
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
                            <span>{loginError}</span>
                        </div> 
                    )}

                    <div>
                        <button className='btn btn-primary w-full rounded-2xl' type='submit'>Login</button>
                    </div>
                </form>

                {/* Google Sign In */}
                <div className="mb-6">
                    <button onClick={handleGoogleSignIn} className="btn rounded-2xl btn-outline w-full btn-info">
                        <FaGoogle /> Login with Google
                    </button>
                </div>

                <p className="text-center mt-6">
                    Don't have an account?{' '}
                    <Link to="/register" className="link link-secondary font-bold">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;