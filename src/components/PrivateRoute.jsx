import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  // Show nothing while checking authentication status
  if (loading) {
    return null; // Or return a loading spinner component
  }

  // Redirect to auth page if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // User is authenticated, render the protected component
  return children;
}