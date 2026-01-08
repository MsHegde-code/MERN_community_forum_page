import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function PrivateRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;

// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/authContext";

// const PrivateRoute = ({ children }) => {
//   const { isAuthenticated, loading } = useAuth();

//   if (loading) return null;
//   if (!isAuthenticated) return <Navigate to="/login" />;

//   return children;
// };

// export default PrivateRoute;
