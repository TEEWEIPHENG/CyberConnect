import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../auth/ProtectedRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import { Nav } from "../components/Nav/Nav";
import { ProfilePage } from "../pages/Profile/ProfilePage";
import { AssetManagementPage } from "../pages/AssetManagement/AssetManagementPage";
import { VulnerabilityManagementPage } from "../pages/VulnerabilityManagement/VulnerabilityManagementPage";
import { ReportsPage } from "../pages/Reports/ReportsPage";
import { OSINTPage } from "../pages/OSINT/OSINTPage";
import { IntegrationPage } from "../pages/Integration/IntegrationPage";

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
        path="/profile"
        element={
          <ProtectedRoute>
            <Nav />
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/assets"
        element={
          <ProtectedRoute>
            <Nav />
            <AssetManagementPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/vulnerabilities"
        element={
          <ProtectedRoute>
            <Nav />
            <VulnerabilityManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Nav />
            <ReportsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/osint"
        element={
          <ProtectedRoute>
            <Nav />
            <OSINTPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/integrations"
        element={
          <ProtectedRoute>
            <Nav />
            <IntegrationPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}