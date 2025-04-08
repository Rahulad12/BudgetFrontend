import { useEffect, useState } from "react"
import { updateUser, passwordChange } from "../service/authService"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { User, Lock, Edit, X } from 'lucide-react';
import { toast } from "react-toastify";
import { fetchUser } from "../Actions/FetchUser";
import ProfileLoading from "../components/common/ProfileLoading";
const Profile = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        fetchUser(dispatch);
    }, [])

    const { user } = useAppSelector((state: any) => state.auth);
    const { loading } = useAppSelector((state: any) => state.loading)

    const [editMode, setEditMode] = useState({
        profile: false,
        password: false
    });
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        currentPassword: '',
        newPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Add your profile update logic here
        try {
            const res = await updateUser(formData.username, formData.email);
            if (res?.success) {
                toast.success(res.message);
            }
        } catch (error) {
            const errMsg = (error as Error).message;
            console.log(errMsg);
            toast.error(errMsg);
        }

        setEditMode({ ...editMode, profile: false });
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Add your password change logic here
        try {
            const res = await passwordChange(formData.currentPassword, formData.newPassword);
            if (res?.success) {
                toast.success(res.message);
            }
        } catch (error) {
            const errMsg = (error as Error).message;
            console.log(errMsg);
            toast.error(errMsg);
        }
        setEditMode({ ...editMode, password: false });
        // Clear password fields
        setFormData({
            ...formData,
            currentPassword: '',
            newPassword: '',
        });
    };

    const toggleEditMode = (field: 'profile' | 'password') => {
        setEditMode({
            ...editMode,
            [field]: !editMode[field]
        });
    };

    if (loading) {
        return <ProfileLoading />
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-48 rounded-lg shadow-md flex items-end p-6 mb-8">
                <div className="bg-white p-2 rounded-full shadow-lg">
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-600">
                        {user?.username?.charAt(0).toUpperCase()}
                    </div>
                </div>
                <div className="ml-6 mb-4 text-white">
                    <h1 className="text-3xl font-bold">{user?.username}</h1>
                    <p className="text-blue-100">{user?.email}</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Profile Information Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold flex items-center">
                            <User className="mr-2" size={20} />
                            Profile Information
                        </h2>
                        {!editMode.profile ? (
                            <button
                                onClick={() => toggleEditMode('profile')}
                                className="text-blue-600 hover:text-blue-800 flex items-center"
                            >
                                <Edit className="mr-1" size={16} />
                                Edit
                            </button>
                        ) : (
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => toggleEditMode('profile')}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}
                    </div>

                    {!editMode.profile ? (
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-500">Username</p>
                                <p className="font-medium">{user?.username}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">{user?.email}</p>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleProfileSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                            >
                                Save Changes
                            </button>
                        </form>
                    )}
                </div>

                {/* Change Password Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold flex items-center">
                            <Lock className="mr-2" size={20} />
                            Change Password
                        </h2>
                        {!editMode.password ? (
                            <button
                                onClick={() => toggleEditMode('password')}
                                className="text-blue-600 hover:text-blue-800 flex items-center"
                            >
                                <Edit className="mr-1" size={16} />
                                Change
                            </button>
                        ) : (
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => toggleEditMode('password')}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}
                    </div>

                    {editMode.password ? (
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                    required
                                    minLength={6}
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                            >
                                Update Password
                            </button>
                        </form>
                    ) : (
                        <div className="text-gray-500">
                            Click "Change" to update your password
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile
