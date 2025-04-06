import React, { useState } from 'react';
import { authUser } from '../../types';
import { useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';

interface FormProps {
    submitHandler: (formData: authUser) => void
}
const Form = ({ submitHandler }: FormProps) => {

    const authState = useSelector((state: any) => state.auth);
    const { loading } = authState;

    const [formData, setFormData] = useState<authUser>({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitHandler(formData);
    };

    const windowLocation = window.location.href;

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">
                {
                    windowLocation.includes('login') ? 'Login' : 'Sign Up'
                }
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    disabled={loading}
                >
                    {loading ? (
                        <TailSpin height="20" width="20" color="#fff" />
                    ) : (
                        windowLocation.includes('login') ? 'Login' : 'Sign Up'
                    )}
                </button>
            </form>
        </div>
    );
};

export default Form;
