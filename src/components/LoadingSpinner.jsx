export default function LoadingSpinner({ text = "Loading..." }) {
    return (
        <div className="p-12 text-center text-gray-500 bg-white rounded-2xl mt-6">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600 mx-auto mb-3"></div>
            <p className="text-sm font-medium text-gray-600">{text}</p>
        </div>
    )
}