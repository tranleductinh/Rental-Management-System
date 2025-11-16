import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RoomsPage from "./pages/RoomsPage";
import TenantsPage from "./pages/TenantsPage";
import BillsPage from "./pages/BillsPage";
import SettingsPage from "./pages/SettingsPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    <Toaster position="top-right"/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/tenants" element={<TenantsPage />} />
            <Route path="/bills" element={<BillsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
