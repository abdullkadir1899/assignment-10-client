import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { FaHome, FaListUl, FaPlus, FaSignOutAlt, FaUser, FaBars } from 'react-icons/fa';
import { CiDark, CiLight } from 'react-icons/ci';
import { MdDownload } from 'react-icons/md';

const NavBar = () => {
  const { user, logOut, loading } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => console.log('User logged out successfully'))
      .catch(error => console.log('Logout error', error));
  };

  const navLinks = (
    <>
      <li><NavLink to="/" className={({ isActive }) => isActive ? 'text-primary font-semibold' : ''}><FaHome /> Home</NavLink></li>
      <li><NavLink to="/add-model" className={({ isActive }) => isActive ? 'text-primary font-semibold' : ''}><FaPlus /> Add Model</NavLink></li>
      <li><NavLink to="/models" className={({ isActive }) => isActive ? 'text-primary font-semibold' : ''}><FaListUl /> All Models</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md fixed top-0 left-0 w-full z-50 px-4">
      
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <FaBars className="text-xl" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>

        {/* Logo */}
        <NavLink to="/" className="text-xl font-bold text-primary ml-2">
          AI Model <span className="text-secondary">Manager</span>
        </NavLink>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          {navLinks}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {/* Theme Toggle */}
        <label className="swap swap-rotate mr-4 cursor-pointer">
          <input type="checkbox" className="theme-controller" value="dark" />
          <CiLight className="swap-off fill-current w-6 h-6" />
          <CiDark className="swap-on fill-current w-6 h-6" />
        </label>

        {/* User Section */}
        {loading ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt={user.displayName || 'User Profile'}
                  src={user.photoURL || 'https://i.ibb.co/bF93c4g/default-user.jpg'}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-64"
            >
              <li className="p-3 text-sm border-b mb-2">
                <p className="font-semibold text-lg">{user.displayName || 'User Name'}</p>
                <p className="text-xs text-gray-500 break-words">{user.email}</p>
              </li>
              <li><NavLink to="/profile"><FaUser /> Profile</NavLink></li>
              <li><NavLink to="/model-purchase"><MdDownload /> Model Purchase</NavLink></li>
              <li><NavLink to="/my-models"><FaListUl /> My Models</NavLink></li>
              <li onClick={handleLogout} className="mt-2">
                <button className="text-red-600"><FaSignOutAlt /> Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <NavLink to="/login" className="btn ">Login</NavLink>
        )}
      </div>
    </div>
  );
};

export default NavBar;
