import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Ticket,
  Plus,
  MessageCircle,
  User,
  Settings,
  LogOut,
  Folder
} from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import './Sidebar.css';

function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>HELP DESK</h2>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/employee-dashboard"
          className={({ isActive }) =>
            isActive ? 'nav-item active' : 'nav-item'
          }
        >
          <LayoutDashboard className="nav-icon" size={19} />
          <span>Dashboard</span>
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

        <NavLink
          to="/tickets/new"
          className={({ isActive }) =>
            isActive ? 'nav-item active' : 'nav-item'
          }
        >
          <Plus className="nav-icon" size={19} />
          <span>Create Ticket</span>
        </NavLink>

        <div className="sidebar-divider"></div>

        <NavLink
          to="/support"
          className={({ isActive }) =>
            isActive ? 'nav-item active' : 'nav-item'
          }
        >
          <MessageCircle className="nav-icon" size={19} />
          <span>Support</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? 'nav-item active' : 'nav-item'
          }
        >
          <User className="nav-icon" size={19} />
          <span>My Profile</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? 'nav-item active' : 'nav-item'
          }
        >
          <Settings className="nav-icon" size={19} />
          <span>Settings</span>
        </NavLink>

        {user?.role === 'it-staff' && (
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive ? 'nav-item active' : 'nav-item'
            }
          >
            <Folder className="nav-icon" size={19} />
            <span>Categories</span>
          </NavLink>
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