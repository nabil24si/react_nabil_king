import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// Asset imports
import "./assets/tailwind.css";

// Component & Page imports
import Loading from "./components/Loading";
import { AuthProvider } from "./contexts/AuthContext";
import Products from "./pages/Products";

const GuestDashboard = React.lazy(() => import("./pages/GuestDashboard"));
const MemberDashboard = React.lazy(() => import("./pages/MemberDashboard"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Header = React.lazy(() => import("./components/Header"));
const Patients = React.lazy(() => import("./pages/Patients"));
const Appointments = React.lazy(() => import("./pages/Appointments"));
const Services = React.lazy(() => import("./pages/Services"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Users = React.lazy(() => import("./pages/Users"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const Sidebar = React.lazy(() => import("./components/Sidebar"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const NotFound = React.lazy(() => import("./pages/ErrorPage"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const ProtectedRoute = React.lazy(() => import("./components/ProtectedRoute"));

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public Route - Guest Landing Page */}
          <Route path="/" element={<GuestDashboard/>} />

          {/* Protected Route - Member Dashboard (hanya customer & admin) */}
          <Route element={<ProtectedRoute allowedRoles={["customer", "admin"]} />}>
            <Route path="/member" element={<MemberDashboard />} />
          </Route>

          {/* Protected Routes - Admin Dashboard (hanya admin) */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/services" element={<Services />} />
              <Route path="/product" element={<Products />} />
              <Route path="/users" element={<Users />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              
              {/* Error Routes */}
              <Route path="/error-400" element={<NotFound errorCode="400" errorDescription="Bad Request." />} />
              <Route path="/error-401" element={<NotFound errorCode="401" errorDescription="Unauthorized." />} />
              <Route path="/error-403" element={<NotFound errorCode="403" errorDescription="Forbidden." />} />
              <Route path="*" element={<NotFound errorCode="404" errorDescription="Page not found" errorImage="/image_9dca28.jpg" />} />
            </Route>
          </Route>

          {/* Auth Routes without Sidebar (Login tidak butuh proteksi) */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
