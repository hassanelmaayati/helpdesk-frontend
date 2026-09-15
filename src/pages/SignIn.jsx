import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import logo from '../assets/logo.png';
import heroImg from '../assets/signin-hero.png';
import './SignIn.css';

function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const loggedInUser = await login(email, password);
      if (loggedInUser.role === 'it-staff') {
        navigate('/it-dashboard');
      } else {
        navigate('/employee-dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Sign in failed');
    }
  };

  return (
    <div className="signin-page-wrapper">
      <div className="signin-card">
        {/* Left Form Section */}
        <div className="signin-form-section">
          <div className="signin-header">
            <div className="signin-brand-logo">
              <img src={logo} alt="Helpdesk Logo" className="brand-logo-img" />
            </div>
            <h2>Sign in to your Account</h2>
          </div>

          <form onSubmit={handleSubmit} className="signin-form">
            <div className="input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
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

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="signin-submit-btn">
              Sign in
            </button>
          </form>

          <p className="signup-prompt">
            Don't have an account? <Link to="/signup" className="signup-link">Create an account</Link>
          </p>
        </div>

        {/* Right Hero Section */}
        <div className="signin-hero-section">
          <div className="hero-content">
            <div className="hero-img-container">
              <img src={heroImg} alt="IT Support Dashboard" className="signin-hero-img" />
            </div>

            <div className="hero-text">
              <h3>Manage & Resolve IT Tickets</h3>
              <p>Access your support portal to submit tickets, track requests, and streamline helpdesk assistance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;