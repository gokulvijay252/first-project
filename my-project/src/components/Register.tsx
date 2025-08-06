import React, { useState } from "react";
import { createRegister } from '../services/authService';
import { saveToken } from "../utils/tokenUtils";

// ✅ Toastify imports
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [username, setusername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await createRegister(username, email, password);
            saveToken(res.token);

            toast.success('Registration Successful...!');
        } catch (err: any) {
            console.error(err);

            // ✅ Show error toast
            toast.error('Registration failed: ' + err.message);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form 
                onSubmit={handleRegister}
                className="bg-white p-6 rounded-lg shadow-md w-96"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

                <input
                    type="text"
                    placeholder="Username"
                    className="w-full mb-3 p-2 border rounded"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-3 p-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-3 p-2 border rounded"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 w-full rounded hover:bg-blue-700"
                >
                    Register
                </button>
            </form>

            <ToastContainer
                autoClose={false}
                closeButton={false}
                position="bottom-right"
                pauseOnHover={false}
                draggable={false}
            />
        </div>
    );
}

export default Register;
