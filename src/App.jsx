import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EmployeeDashboard from './components/EmployeeDashboard';
import ITStaffDashboard from './components/ITStaffDashboard';
import TicketForm from './pages/TicketForm';
import TicketDetail from './pages/TicketDetail';
import ManageCategories from './components/ManageCategories';
import ProtectedRoute from './components/ProtectedRoute';
import ManageCategories from './components/ManageCategories'
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/employee-dashboard" element={<ProtectedRoute><EmployeeDashboard /></ProtectedRoute>} />

      <Route path="/it-dashboard" element={<ProtectedRoute><ITStaffDashboard /></ProtectedRoute>} />

      <Route path="/tickets/new" element={<ProtectedRoute><TicketForm /></ProtectedRoute>} />

      <Route path="/tickets/:id/edit" element={<ProtectedRoute><TicketForm /></ProtectedRoute>} />

      <Route path="/tickets/:id" element={<ProtectedRoute><TicketDetail /></ProtectedRoute>} />

      <Route path="/categories" element={<ProtectedRoute><ManageCategories /></ProtectedRoute>} />
      
    </Routes>
  );
}

export default App;