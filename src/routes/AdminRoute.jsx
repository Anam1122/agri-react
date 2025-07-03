import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    alert("Akses hanya untuk admin!");
    return <Navigate to="/" />;
  }

  return children;
}
