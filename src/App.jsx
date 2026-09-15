import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import EmployeeDashboard from './components/EmployeeDashboard/EmployeeDashboard';
import ITStaffDashboard from './components/ITStaffDashboard/ITStaffDashboard';
import TicketForm from './pages/TicketForm';
import TicketDetail from './pages/TicketDetail';
import ManageCategories from './components/ManageCategories/ManageCategories';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/employee-dashboard"
        element={
          <ProtectedRoute>
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/it-dashboard"
        element={
          <ProtectedRoute>
            <ITStaffDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tickets"
        element={<Navigate to="/employee-dashboard" replace />}
      />

      <Route
        path="/tickets/"
        element={<Navigate to="/employee-dashboard" replace />}
      />

      <Route
        path="/tickets/new"
        element={
          <ProtectedRoute>
            <TicketForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tickets/:id/edit"
        element={
          <ProtectedRoute>
            <TicketForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tickets/:id"
        element={
          <ProtectedRoute>
            <TicketDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/categories"
        element={
          <ProtectedRoute>
            <ManageCategories />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;