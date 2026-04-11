import React, { useState } from 'react';
import data from './makanan.json';
import Guest from './components/Guest';
import Admin from './components/Admin';

const Dashboard = () => {
  const [view, setView] = useState('guest'); // 'guest' or 'admin'
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    isVegetarian: '',
    isSpicy: ''
  });

  const foods = data.foods;

  // Get unique categories
  const categories = [...new Set(foods.map(food => food.category))];

  // Handle Search Change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle Filter Changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  // Handle Reset Filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setFilters({
      category: '',
      isVegetarian: '',
      isSpicy: ''
    });
  };

  // Filter logic
  const filteredFoods = foods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          food.restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filters.category === '' || food.category === filters.category;
    
    const matchesVegetarian = filters.isVegetarian === '' || 
      (filters.isVegetarian === 'true' ? food.isVegetarian === true : 
       filters.isVegetarian === 'false' ? food.isVegetarian === false : true);
    
    const matchesSpicy = filters.isSpicy === '' ||
      (filters.isSpicy === 'true' ? food.isSpicy === true :
       filters.isSpicy === 'false' ? food.isSpicy === false : true);
    
    return matchesSearch && matchesCategory && matchesVegetarian && matchesSpicy;
  });

  // Cek apakah ada filter yang aktif
  const isFilterActive = searchTerm !== '' || 
                         filters.category !== '' || 
                         filters.isVegetarian !== '' || 
                         filters.isSpicy !== '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl animate-bounce">🍜</span>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Food Explorer Dashboard
                </h1>
                <p className="text-sm text-gray-500">Discover the best culinary delights</p>
              </div>
            </div>
            
            {/* View Toggle Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setView('guest')}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  view === 'guest'
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🎨 Guest Mode (Card View)
              </button>
              <button
                onClick={() => setView('admin')}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  view === 'admin'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                📊 Admin Mode (Table View)
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filter Section */}
      <div className="sticky top-[72px] md:top-[80px] z-40 bg-white/95 backdrop-blur-sm shadow-md">
        <div className="container mx-auto px-4 py-4">
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                name="search"
                placeholder="🔍 Cari makanan atau restaurant..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-4 py-3 pl-10 pr-4 text-gray-700 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
              />
              <span className="absolute left-3 top-3 text-gray-400 text-xl">🔍</span>
              {searchTerm && (
                <button
                  onClick={handleResetFilters}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Filter Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Category Filter */}
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            >
              <option value="">📋 Semua Kategori</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Vegetarian Filter */}
            <select
              name="isVegetarian"
              value={filters.isVegetarian}
              onChange={handleFilterChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            >
              <option value="">🌱 Vegetarian (Semua)</option>
              <option value="true">🌱 Vegetarian Only</option>
              <option value="false">🍖 Non-Vegetarian</option>
            </select>

            {/* Spicy Filter */}
            <select
              name="isSpicy"
              value={filters.isSpicy}
              onChange={handleFilterChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            >
              <option value="">🌶️ Tingkat Pedas (Semua)</option>
              <option value="true">🌶️ Pedas</option>
              <option value="false">😊 Tidak Pedas</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Result Count and Reset Button */}
        <div className="mb-6 flex justify-between items-center flex-wrap gap-3">
          <div className="text-gray-600">
            Menampilkan <span className="font-bold text-orange-600 text-lg">{filteredFoods.length}</span> dari{' '}
            <span className="font-bold">{foods.length}</span> makanan
          </div>
          {isFilterActive && (
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Reset All Filters
            </button>
          )}
        </div>

        {/* Conditional Rendering */}
        {view === 'guest' ? (
          <Guest foods={filteredFoods} />
        ) : (
          <Admin foods={filteredFoods} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">By Nabil Sahendra</p>
          <p className="text-gray-500 text-sm mt-2">
            {view === 'guest' ? '🎨 Guest Mode: Menampilkan dalam bentuk Card' : '📊 Admin Mode: Menampilkan dalam bentuk Tabel'}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;