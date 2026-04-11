import React from 'react';

function Admin({ foods }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Gambar</th>
            <th className="px-4 py-2 border">Nama</th>
            <th className="px-4 py-2 border">Kategori</th>
            <th className="px-4 py-2 border">Harga</th>
            <th className="px-4 py-2 border">Rating</th>
            <th className="px-4 py-2 border">Nutrisi</th>
            <th className="px-4 py-2 border">Bahan</th>
            <th className="px-4 py-2 border">Restaurant</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr key={food.id} className="border-b">
              <td className="px-4 py-2 border text-center">{food.id}</td>
              <td className="px-4 py-2 border">
                <img src={food.imageUrl} alt={food.name} className="w-12 h-12 object-cover rounded" />
              </td>
              <td className="px-4 py-2 border">{food.name}</td>
              <td className="px-4 py-2 border">{food.category}</td>
              <td className="px-4 py-2 border">Rp {food.price.toLocaleString()}</td>
              <td className="px-4 py-2 border">{food.rating}</td>
              <td className="px-4 py-2 border text-sm">
                {food.nutrition.calories} cal / {food.nutrition.protein}g
              </td>
              <td className="px-4 py-2 border text-sm">
                {food.ingredients.main.join(", ")}
              </td>
              <td className="px-4 py-2 border">
                {food.restaurant.name}<br/>
                <span className="text-xs">{food.restaurant.location}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;