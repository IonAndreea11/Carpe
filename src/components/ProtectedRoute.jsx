import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { API_URL } from "../api.js";

function ProtectedRoute({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuthorized(false);
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/api/check-admin`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setAuthorized(data.isAdmin);
        setLoading(false);
      })
      .catch(() => {
        setAuthorized(false);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Se verifică autentificarea...</p>;
  if (!authorized) return <Navigate to="/admin" />;

  return children;
}

export default ProtectedRoute;
