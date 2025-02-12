export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">Product Not Found</h2>
                <p className="mt-2 text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
                <button
                    onClick={() => window.history.back()}
                    className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
}