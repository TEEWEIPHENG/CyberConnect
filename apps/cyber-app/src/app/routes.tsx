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
            <Nav>
              <Dashboard />
            </Nav>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Nav>
              <ProfilePage />
            </Nav>
          </ProtectedRoute>
        }
      />
      <Route
        path="/asset"
        element={
          <ProtectedRoute>
            <Nav>
              <AssetManagementPage />
            </Nav>
          </ProtectedRoute>
        }
      />

      <Route
        path="/vulnerabilities"
        element={
          <ProtectedRoute>
            <Nav>
              <VulnerabilityManagementPage />
            </Nav>
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Nav>
              <ReportsPage />
            </Nav>
          </ProtectedRoute>
        }
      />
      <Route
        path="/osint"
        element={
          <ProtectedRoute>
            <Nav>
              <OSINTPage />
            </Nav>
          </ProtectedRoute>
        }
      />
      <Route
        path="/integrations"
        element={
          <ProtectedRoute>
            <Nav>
              <IntegrationPage />
            </Nav>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}