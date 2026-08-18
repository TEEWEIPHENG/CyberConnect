import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import ProtectedRoute from "../auth/ProtectedRoute";
import Dashboard from "../pages/Dashboard/Dashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}