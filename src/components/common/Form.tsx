import React, { useState } from 'react';
import { authUser } from '../../types';
import { TailSpin } from 'react-loader-spinner';
import { useAppSelector } from '../../hooks/redux';
import { Eye, EyeOff } from 'lucide-react';

interface FormProps {
    submitHandler: (formData: authUser) => void;
    formType: 'login' | 'register'; // Explicit form type
}

const Form = ({ submitHandler, formType }: FormProps) => {
    const { loading } = useAppSelector(state => state.loading);
    const [showPassword, setShowPassword] = useState(false);
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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Determine if email field should be shown (only for register)
    const shouldShowEmail = formType === 'register';

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">
                {formType === 'login' ? 'Login' : 'Sign Up'}
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
                        minLength={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {shouldShowEmail && (
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                )}

                <div className="relative">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-70"
                >
                    {loading ? (
                        <>
                            <TailSpin height="20" width="20" color="#fff" />
                            <span>Processing...</span>
                        </>
                    ) : (
                        formType === 'login' ? 'Login' : 'Sign Up'
                    )}
                </button>
            </form>
        </div>
    );
};

export default Form;