// ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "./Loading";

export default function ProtectedRoute({ allowedRoles, redirectTo = "/login" }) {
  const { user, loading, isAuthenticated } = useAuth();

  // Show loading spinner while checking auth state
  if (loading) {
    return <Loading />;
  }

  // Not logged in → redirect to login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // If specific roles are required, check the user's role
  if (allowedRoles && allowedRoles.length > 0) {
    const hasAllowedRole = allowedRoles.includes(user?.role);
    if (!hasAllowedRole) {
      // User exists but has the wrong role → redirect based on their role
      if (user?.role === "admin") {
        return <Navigate to="/dashboard" replace />;
      }
      if (user?.role === "customer") {
        return <Navigate to="/member" replace />;
      }
      return <Navigate to="/" replace />;
    }
  }

  // Authorized → render children
  return <Outlet />;
}