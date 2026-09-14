import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ITStaffDashboard from './pages/ITStaffDashboard';
import TicketForm from './pages/TicketForm';
import TicketDetail from './pages/TicketDetail';
import ManageCategories from './pages/ManageCategories';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      <Route path="/it-dashboard" element={<ITStaffDashboard />} />
      <Route path="/tickets/new" element={<TicketForm />} />
      <Route path="/tickets/:id/edit" element={<TicketForm />} />
      <Route path="/tickets/:id" element={<TicketDetail />} />
      <Route path="/categories" element={<ManageCategories />} />
    </Routes>
  );
}

export default App;