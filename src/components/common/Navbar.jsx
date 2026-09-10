import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, LayoutDashboard, History, LogOut, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="nav-brand">
          <div className="nav-logo-icon">
            <Sparkles size={20} />
          </div>
          <span>
            Caption<span className="gradient-text">GenAI</span>
          </span>
        </Link>

        <nav className="nav-links">
          {isAuthenticated ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                <LayoutDashboard size={18} />
                <span>Studio</span>
              </NavLink>

              <NavLink
                to="/history"
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                <History size={18} />
                <span>History</span>
              </NavLink>
            </>
          ) : (
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <span>Home</span>
            </NavLink>
          )}
        </nav>

        <div className="nav-user">
          {isAuthenticated ? (
            <>
              <div className="user-badge">
                <img
                  src={
                    user?.profileImage ||
                    `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
                      user?.name || 'Creator'
                    )}`
                  }
                  alt={user?.name}
                  className="user-avatar"
                />
                <span className="user-name">{user?.name}</span>
              </div>
              <button
                className="btn-icon"
                onClick={handleLogout}
                title="Logout"
                aria-label="Logout"
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link to="/login" className="btn btn-secondary btn-sm">
                <LogIn size={16} />
                <span>Login</span>
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                <UserPlus size={16} />
                <span>Get Started</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
