// src/components/Footer.jsx
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
    // এখানে আপনার GitHub রিপোজিটরি লিংক যোগ করুন
    const clientRepo = "YOUR_CLIENT_REPO_LINK";
    const serverRepo = "YOUR_SERVER_REPO_LINK";

    return (
        <footer className="footer p-6 md:p-10 bg-base-200 text-base-content mt-12 border-t">
            <nav className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 justify-items-center text-sm">
                <a href="#about" className="link link-hover">About AI Models</a>
                <a href="#get-started" className="link link-hover">Get Started</a>
                <a
                    href={clientRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-hover flex items-center gap-1"
                >
                    <FaGithub className="text-lg" /> Client Repo
                </a>
                <a
                    href={serverRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-hover flex items-center gap-1"
                >
                    <FaGithub className="text-lg" /> Server Repo
                </a>
            </nav>

            <aside className="text-center mt-6 space-y-2">
                <div className="text-xl md:text-2xl font-bold text-primary">
                    AI Model <span className="text-secondary">Inventory Manager</span>
                </div>
                <p className="text-xs sm:text-sm">
                    © {new Date().getFullYear()} - All rights reserved by AI Model Inventory Manager
                </p>
                <p className="text-[11px] sm:text-xs text-gray-500">
                    A Project for Beginner Web Developers
                </p>
            </aside>
        </footer>
    );
};

export default Footer;
