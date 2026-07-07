import { FaBoxOpen, FaPlus, FaTimes, FaLayerGroup } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import productsData from "../data/ProductsData.json";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Products(props) {
  const [products, setProducts] = useState(productsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: products.length + 1,
    title: "",
    code: "",
    category: "Face",
    brand: "",
    price: "",
    stock: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProducts([formData, ...products]);
    setIsModalOpen(false);
    setFormData({
      id: products.length + 2,
      title: "",
      code: "",
      category: "Face",
      brand: "",
      price: "",
      stock: "",
    });
  };

  const getCategoryStyle = (cat) => {
    switch (cat) {
      case "Face":
        return "bg-[#CDEEDD]/50 text-black border border-[#CDEEDD]";
      case "Lips":
        return "bg-[#FFD9D0]/50 text-black border border-[#FFD9D0]";
      case "Eyes":
        return "bg-gray-100 text-black/60 border border-gray-200";
      default:
        return "bg-gray-50 text-black/40";
    }
  };

  return (
    <div className="flex flex-col p-2 min-h-screen font-poppins bg-transparent text-black">
      <PageHeader
        title={props.title || "Product Inventory"}
        breadcrumb={["Dashboard", "Makeup List"]}
      >
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#FFD9D0] hover:bg-[#ffc8bc] text-black px-6 py-3 rounded-2xl flex items-center space-x-2 font-medium shadow-lg shadow-[#FFD9D0]/20 transition-all duration-300"
        >
          <FaPlus size={14} /> <span>Add Product</span>
        </button>
      </PageHeader>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm mt-6 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[100px] font-semibold text-gray-700">Code</TableHead>
              <TableHead className="font-semibold text-gray-700">Product Name</TableHead>
              <TableHead className="font-semibold text-gray-700">Brand</TableHead>
              <TableHead className="font-semibold text-gray-700">Category</TableHead>
              <TableHead className="font-semibold text-gray-700">Stock</TableHead>
              <TableHead className="text-right font-semibold text-gray-700">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((item, idx) => (
              <TableRow key={idx} className="hover:bg-gray-50/50 transition-colors">
                <TableCell className="font-mono text-xs text-gray-500">{item.code}</TableCell>
                <TableCell>
                  <Link
                    to={`/products/${item.id}`}
                    className="text-emerald-400 hover:text-emerald-500"
                  >
                    {item.title}
                  </Link>
                </TableCell>
                <TableCell className="text-gray-600">{item.brand}</TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-medium tracking-wide ${getCategoryStyle(item.category)}`}
                  >
                    {item.category}
                  </span>
                </TableCell>
                <TableCell className="text-gray-600">
                  <div className="flex items-center">
                    <FaLayerGroup className="mr-2 text-[10px] opacity-30" />
                    {item.stock} units
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium text-gray-900">{item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* MODAL SECTION */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[32px] w-full max-w-md p-10 relative shadow-2xl animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-8 right-8 text-black/20 hover:text-black transition-colors"
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-2xl font-medium text-black mb-2 tracking-tight">
              New Product
            </h2>
            <p className="text-sm text-black/40 mb-8">
              Add a new makeup item to your inventory.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-medium text-black/40 uppercase tracking-widest">
                    Product Code
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-1 focus:ring-[#FFD9D0] text-black"
                    placeholder="MKP-001"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-medium text-black/40 uppercase tracking-widest">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-[#FFD9D0] cursor-pointer text-black"
                  >
                    <option value="Face">Face</option>
                    <option value="Lips">Lips</option>
                    <option value="Eyes">Eyes</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-medium text-black/40 uppercase tracking-widest">
                  Product Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-1 focus:ring-[#FFD9D0] text-black"
                  placeholder="e.g. Matte Lipstick Red"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-medium text-black/40 uppercase tracking-widest">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-1 focus:ring-[#FFD9D0] text-black"
                  placeholder="e.g. LuxeBeauty"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-medium text-black/40 uppercase tracking-widest">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-1 focus:ring-[#FFD9D0] text-black"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-medium text-black/40 uppercase tracking-widest">
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-1 focus:ring-[#FFD9D0] text-black"
                    placeholder="Rp 100.000"
                  />
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#FFD9D0] text-black rounded-2xl hover:bg-[#ffc8bc] font-medium shadow-xl shadow-[#FFD9D0]/20 transition-all duration-300"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}