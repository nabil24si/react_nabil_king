import { DatabaseZap } from "lucide-react"; 

export default function EmptyState({ text = "Belum ada data" }) {
    return (
        <div className="p-12 text-center text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200 mt-6">
            <DatabaseZap className="mx-auto h-12 w-12 text-gray-300 mb-3 animate-pulse" />
            <p className="text-base font-medium text-gray-500">{text}</p>
        </div>
    )
}