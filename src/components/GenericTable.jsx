export default function GenericTable({ columns, data, renderRow }) {
    return (
        <div className="w-full overflow-x-auto rounded-2xl shadow-lg border border-gray-100">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#CDEEDD] text-black">
                    <tr>
                        {columns.map((col, idx) => (
                            <th key={idx} className="px-6 py-4 text-left font-semibold text-sm tracking-wider">
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100 text-sm text-gray-800">
                    {data.map((item, index) => (
                        <tr key={item.id || index} className="hover:bg-gray-50 transition-colors">
                            {renderRow(item, index)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}