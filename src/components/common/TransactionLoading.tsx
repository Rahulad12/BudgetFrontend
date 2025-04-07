import Skeleton from 'react-loading-skeleton'


const TransactionLoading = () => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Skeleton height={100} />
                <Skeleton height={100} />
                <Skeleton height={100} />
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Transactions
                </h2>
                <Skeleton height={400} />
            </div>
        </div>
    )
}

export default TransactionLoading;