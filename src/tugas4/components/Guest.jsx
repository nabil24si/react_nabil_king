import React from 'react';

function Guest({ foods }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {foods.map((food) => (
        <div key={food.id} className="border rounded-lg p-4 bg-white shadow">
          <img 
            src={food.imageUrl} 
            alt={food.name}
            className="w-full h-40 object-cover rounded mb-3"
          />
          <h3 className="font-bold text-lg">{food.name}</h3>
          <p className="text-orange-600 font-bold">Rp {food.price.toLocaleString()}</p>
          <p className="text-sm text-gray-600">⭐ {food.rating}</p>
          <p className="text-sm">🏠 {food.restaurant.name}</p>
          <p className="text-xs text-gray-500">📍 {food.restaurant.location}</p>
          
          {/* Nested structure */}
          <div className="mt-2 text-sm">
            <p>🔥 {food.nutrition.calories} kalori</p>
            <p>🥩 {food.nutrition.protein}g protein</p>
          </div>
          
          <div className="mt-2 text-xs text-gray-600">
            Bahan: {food.ingredients.main.join(", ")}
          </div>
          
          <div className="mt-2">
            {food.isVegetarian && <span className="bg-green-200 px-2 py-1 rounded text-xs">Vegetarian</span>}
            {food.isSpicy && <span className="bg-red-200 px-2 py-1 rounded text-xs ml-1">Pedas</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Guest;