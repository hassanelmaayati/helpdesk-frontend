import { NavLink } from 'react-router-dom';
import logoWhite from '../../assets/logo-white.png';
import {
  LayoutDashboard,
  Ticket,
  Plus,
  Folder,
  LogOut,
  List
} from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import './Sidebar.css';

function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
  <img
    src={logoWhite}
    alt="Help Desk"
    className="sidebar-logo"
  />
</div>

      <nav className="sidebar-nav">
        <NavLink
          to={
            user?.role === 'it-staff'
              ? '/it-dashboard'
              : '/employee-dashboard'
          }
          className={({ isActive }) =>
            isActive ? 'nav-item active' : 'nav-item'
          }
        >
          <LayoutDashboard className="nav-icon" size={19} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/tickets/new"
          className={({ isActive }) =>
            isActive ? 'nav-item active' : 'nav-item'
          }
        >
          <Plus className="nav-icon" size={19} />
          <span>Create Ticket</span>
        </NavLink>

        <NavLink
          to="/my-tickets"
          className={({ isActive }) =>
            isActive ? 'nav-item active' : 'nav-item'
          }
        >
          <Ticket className="nav-icon" size={19} />
          <span>My Tickets</span>
        </NavLink>

        {user?.role === 'it-staff' && (
          <>
            <NavLink
              to="/all-tickets"
              className={({ isActive }) =>
                isActive ? 'nav-item active' : 'nav-item'
              }
            >
              <List className="nav-icon" size={19} />
              <span>All Tickets</span>
            </NavLink>

            <div className="sidebar-divider"></div>

            <NavLink
              to="/categories"
              className={({ isActive }) =>
                isActive ? 'nav-item active' : 'nav-item'
              }
            >
              <Folder className="nav-icon" size={19} />
              <span>Categories</span>
            </NavLink>
          </>
        )}
      </nav>

      <div className="sidebar-footer">
        <button onClick={logout} className="logout-btn">
          <LogOut className="nav-icon" size={19} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;