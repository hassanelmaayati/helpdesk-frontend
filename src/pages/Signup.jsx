import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import logo from '../assets/logo.png';
import heroImg from '../assets/signup-hero.png';
import './Signup.css';

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signup(name, email, password, role);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="signup-page-wrapper">
      <div className="signup-card">
        {/* Left Form Section */}
        <div className="signup-form-section">
          <div className="signup-header">
            <div className="signup-brand-logo">
              <img src={logo} alt="Helpdesk Logo" className="brand-logo-img" />
            </div>
            <h2>Create an Account</h2>
          </div>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="input-group">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
              />
            </div>

            <div className="input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>

            <div className="input-group select-group">
              <label htmlFor="role-select" className="select-label">Account Role</label>
              <select
                id="role-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="role-dropdown"
              >
                <option value="employee">Employee</option>
                <option value="it-staff">IT Staff</option>
              </select>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="signup-submit-btn">
              Create Account
            </button>
          </form>

          <p className="signin-prompt">
            Already have an account? <Link to="/login" className="signin-link">Sign in</Link>
          </p>
        </div>

        {/* Right Hero Section */}
        <div className="signup-hero-section">
          <div className="hero-content">
            <div className="hero-img-container">
              <img src={heroImg} alt="IT Support Dashboard" className="signup-hero-img" />
            </div>

            <div className="hero-text">
              <h3>Join the IT Support Portal</h3>
              <p>Sign up to track support requests, collaborate with IT staff, and manage helpdesk tickets smoothly.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;