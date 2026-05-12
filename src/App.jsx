import React, { Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";

// Asset imports
import reactLogo from "./assets/react.svg";
// HAPUS BARIS INI: import viteLogo from "/vite.svg"; 
import "./assets/tailwind.css";

// Component & Page imports
import Loading from "./components/Loading";
import Products from "./pages/ProductS";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Header = React.lazy(() => import("./components/Header"));
const Patients = React.lazy(() => import("./pages/Patients"));
const Appointments = React.lazy(() => import("./pages/Appointments"));
const Services = React.lazy(() => import("./pages/Services"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const Sidebar = React.lazy(() => import("./components/Sidebar"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const NotFound = React.lazy(() => import("./pages/ErrorPage"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"))


function App() {
  // useState count ini bisa dihapus jika tidak digunakan di bawah
  const [count, setCount] = useState(0);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Main Routes with Sidebar/Header */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/services" element={<Services />} />
          <Route path="/product" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          
          
          {/* Error Routes */}
          <Route path="/error-400" element={<NotFound errorCode="400" errorDescription="Bad Request." />} />
          <Route path="/error-401" element={<NotFound errorCode="401" errorDescription="Unauthorized." />} />
          <Route path="/error-403" element={<NotFound errorCode="403" errorDescription="Forbidden." />} />
          <Route path="*" element={<NotFound errorCode="404" errorDescription="Page not found" errorImage="/image_9dca28.jpg" />} />
        </Route>

        {/* Auth Routes without Sidebar */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;