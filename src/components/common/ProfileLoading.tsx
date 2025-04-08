const ProfileLoading = () => {
    return (
        <div className="max-w-4xl mx-auto p-4 animate-pulse">
            {/* Profile Header Skeleton */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-48 rounded-lg shadow-md flex items-end p-6 mb-8">
                <div className="bg-white p-2 rounded-full shadow-lg">
                    <div className="w-24 h-24 rounded-full bg-gray-300" />
                </div>
                <div className="ml-6 mb-4 text-white">
                    <div className="h-6 w-48 bg-blue-300 rounded mb-2" />
                    <div className="h-4 w-32 bg-blue-200 rounded" />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Profile Info Card Skeleton */}
                <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                    <div className="h-6 w-40 bg-gray-200 rounded" />
                    <div className="space-y-3">
                        <div>
                            <div className="h-4 w-24 bg-gray-300 rounded mb-1" />
                            <div className="h-5 w-full bg-gray-200 rounded" />
                        </div>
                        <div>
                            <div className="h-4 w-24 bg-gray-300 rounded mb-1" />
                            <div className="h-5 w-full bg-gray-200 rounded" />
                        </div>
                    </div>
                </div>

                {/* Password Card Skeleton */}
                <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                    <div className="h-6 w-56 bg-gray-200 rounded" />
                    <div className="space-y-3">
                        <div className="h-4 w-40 bg-gray-300 rounded mb-1" />
                        <div className="h-5 w-full bg-gray-200 rounded" />
                        <div className="h-4 w-40 bg-gray-300 rounded mb-1" />
                        <div className="h-5 w-full bg-gray-200 rounded" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileLoading;
