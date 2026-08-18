import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../auth/ProtectedRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import { AssetPage } from "../pages/Asset/Asset";
import { Nav } from "../components/Nav/Nav";
import { ProfilePage } from "../pages/Profile/ProfilePage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Nav />
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/assets"
        element={
          <ProtectedRoute>
            <Nav />
            <AssetPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Nav />
            <ProfilePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}