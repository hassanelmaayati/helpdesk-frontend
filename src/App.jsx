import { Routes, Route, Navigate } from 'react-router-dom';

import SignIn from './pages/SignIn';
import Signup from './pages/Signup';
import Home from './pages/Home';

import EmployeeDashboard from './components/EmployeeDashboard/EmployeeDashboard';
import ITStaffDashboard from './components/ITStaffDashboard/ITStaffDashboard';

import TicketForm from './pages/TicketForm';
import TicketDetail from './pages/TicketDetail';
import MyTickets from './pages/MyTickets';

import ManageCategories from './components/ManageCategories/ManageCategories';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/employee-dashboard"
          element={<EmployeeDashboard />}
        />

        <Route
          path="/it-dashboard"
          element={<ITStaffDashboard />}
        />

        <Route
          path="/all-tickets"
          element={<ITStaffDashboard />}
        />

        <Route
          path="/my-tickets"
          element={<MyTickets />}
        />

        <Route
          path="/tickets/new"
          element={<TicketForm />}
        />

        <Route
          path="/tickets/:id/edit"
          element={<TicketForm />}
        />

        <Route
          path="/tickets/:id"
          element={<TicketDetail />}
        />

        <Route
          path="/categories"
          element={<ManageCategories />}
        />
      </Route>

      {/* Unknown Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
