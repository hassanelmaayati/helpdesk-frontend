import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import dashboardImg from '../assets/helpdesk-dashboard.png';
import './Home.css';

function Home() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqData = [
    {
      question: "What is IT Helpdesk Portal?",
      answer: "IT Helpdesk Portal is a centralized support management system designed to streamline internal IT requests, incident management, hardware/software troubleshooting, and service tracking."
    },
    {
      question: "What key features does the IT Helpdesk offer?",
      answer: "Users can access support resources, track issue resolutions in real time, view system uptime status, and route requests directly to specialized IT staff upon logging in."
    },
    {
      question: "How are urgent IT requests prioritized?",
      answer: "Requests are categorized by severity levels (Low, Medium, High, Critical) so emergency network outages and hardware failures receive immediate attention."
    },
    {
      question: "Can employees access self-service solutions?",
      answer: "Yes! The portal features a searchable knowledge base for common troubleshooting steps, software request guidelines, and password reset procedures."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="home">

      {/* NAVBAR */}
      <header className="home-navbar">
        <div className="home-container home-navbar__inner">

          <Link to="/" className="home-logo">
            <img src={logo} alt="IT Helpdesk Logo" className="logo-img" />
          </Link>

          <nav className="home-nav">
            <a href="#features">Features</a>
            <a href="#services">Services</a>
            <a href="#who-we-help">Who It's For</a>
            <a href="#faq">FAQs</a>
          </nav>

          <div className="home-nav__actions">
            <Link to="/login" className="home-login">
              Sign in
            </Link>

            <Link to="/signup" className="home-nav-button">
              SIGN UP
            </Link>
          </div>

        </div>
      </header>

      <main>

        {/* HERO SECTION */}
        <section className="home-hero">
          <div className="home-container home-hero__grid">

            <div className="home-hero__copy">
              <h1>
                Fast & Efficient Corporate IT Support
              </h1>
              
              <p className="hero-subtitle">
                System Management | Uptime Monitoring | Technical Services
              </p>

              <p className="hero-description">
                Simplify employee support request resolution. Our IT Support System enables fast 
                request routing, automated issue tracking, and rapid response for corporate systems.
              </p>

              <div className="home-hero__buttons">
                <Link to="/signup" className="home-main-button">
                  GET STARTED
                </Link>
                <Link to="/login" className="home-secondary-button">
                  SIGN IN
                </Link>
              </div>

              {/* TRUST BADGES */}
              <div className="home-trust-badges">
                <div className="badge">24/7 SUPPORT</div>
                <div className="badge">FAST RESOLUTION</div>
                <div className="badge">SLA TRACKING</div>
                <div className="badge">SECURE ACCESS</div>
              </div>
            </div>

            {/* HERO VISUAL MOCKUP */}
            <div className="home-hero__visual">
              <div className="home-image-frame home-image-frame--hero">
                <img
                  src={dashboardImg}
                  alt="IT Helpdesk Dashboard Preview"
                />
              </div>
            </div>

          </div>
        </section>

        {/* CORE PILLARS SECTION */}
        <section className="home-pillars" id="services">
          <div className="home-container">
            <h2>Designed for Enterprise IT Management</h2>
            <p className="section-subtitle">
              Empower your workforce with automated IT workflows and dependable technical support.
            </p>

            <div className="pillars-grid">
              <div className="pillar-card">
                <div className="pillar-icon">🛠️</div>
                <h3>Incident Management</h3>
                <p>Manage and track technical issues from initiation to final resolution.</p>
              </div>

              <div className="pillar-card">
                <div className="pillar-icon">💻</div>
                <h3>Hardware & Software</h3>
                <p>Request new devices, software licenses, or report equipment failures easily.</p>
              </div>

              <div className="pillar-card">
                <div className="pillar-icon">🔒</div>
                <h3>Access & Security</h3>
                <p>Request account permissions, network access, VPN resets, and credentials.</p>
              </div>

              <div className="pillar-card">
                <div className="pillar-icon">⚡</div>
                <h3>Automated Routing</h3>
                <p>Requests automatically direct to the specialized technician team for fast SLA compliance.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FLIP CARDS FEATURE SECTION */}
        <section className="home-feature-cards" id="features">
          <div className="home-container">
            <h2>Streamlined IT Workflows. Minimum Downtime.</h2>
            <p className="section-subtitle">Hover over any card below to explore support capabilities.</p>

            <div className="home-flip-grid">
              
              {/* FLIP CARD 1 */}
              <div className="home-flip-card">
                <div className="home-flip-card__inner">
                  <div className="home-flip-card__front">
                    <div className="feature-card__icon">🖥️</div>
                    <h3>Workstation & Hardware</h3>
                    <p>Issues with laptops, desktop displays, peripherals, or office printers.</p>
                  </div>
                  <div className="home-flip-card__back">
                    <h3>Hardware Support</h3>
                    <p>Log hardware failures, request replacement parts, schedule routine maintenance, or arrange new device setups.</p>
                    <div className="home-card-pills">
                      <span>Laptops</span>
                      <span>Printers</span>
                      <span>Peripherals</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* FLIP CARD 2 */}
              <div className="home-flip-card">
                <div className="home-flip-card__inner">
                  <div className="home-flip-card__front">
                    <div className="feature-card__icon">🌐</div>
                    <h3>Network & Infrastructure</h3>
                    <p>Report Wi-Fi drops, VPN disconnection, server issues, or slow internet speeds.</p>
                  </div>
                  <div className="home-flip-card__back">
                    <h3>Network Operations</h3>
                    <p>Instant escalation for critical server outages, router configuration requests, and remote connectivity troubleshooting.</p>
                    <div className="home-card-pills">
                      <span>VPN</span>
                      <span>Wi-Fi</span>
                      <span>Servers</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* FLIP CARD 3 */}
              <div className="home-flip-card">
                <div className="home-flip-card__inner">
                  <div className="home-flip-card__front">
                    <div className="feature-card__icon">🔐</div>
                    <h3>Software & Permissions</h3>
                    <p>Request software installations, license renewals, or password unlocks.</p>
                  </div>
                  <div className="home-flip-card__back">
                    <h3>Software Licensing</h3>
                    <p>Get approved software provisioning, email account configuration, multi-factor authentication resets, and access rights.</p>
                    <div className="home-card-pills">
                      <span>Licenses</span>
                      <span>MFA Reset</span>
                      <span>Access Control</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* WHO WE HELP / TARGET USERS */}
        <section className="home-industries" id="who-we-help">
          <div className="home-container">
            <h2 className="industries-title">Who Is IT Helpdesk For?</h2>

            <div className="industries-exact-grid">
              
              <div className="industry-exact-item">
                <div className="industry-exact-icon">
                  <svg viewBox="0 0 64 64" fill="none" stroke="#0088cc" strokeWidth="2.5">
                    <rect x="12" y="16" width="40" height="28" rx="3" />
                    <path d="M20 52h24M32 44v8" />
                  </svg>
                </div>
                <h3>Remote Workers</h3>
                <p>Get immediate VPN, access, and software support anywhere off-site.</p>
              </div>

              <div className="industry-exact-item">
                <div className="industry-exact-icon">
                  <svg viewBox="0 0 64 64" fill="none" stroke="#0088cc" strokeWidth="2.5">
                    <path d="M16 52V16h32v36M24 24h4M36 24h4M24 32h4M36 32h4M24 40h4M36 40h4" />
                  </svg>
                </div>
                <h3>On-Site Teams</h3>
                <p>Resolve workstation, printing, and meeting room AV issues quickly.</p>
              </div>

              <div className="industry-exact-item">
                <div className="industry-exact-icon">
                  <svg viewBox="0 0 64 64" fill="none" stroke="#0088cc" strokeWidth="2.5">
                    <path d="M12 20h40v24H12z" />
                    <path d="M22 20v24M42 20v24" strokeDasharray="2 2" />
                  </svg>
                </div>
                <h3>IT Support Staff</h3>
                <p>Manage incoming support queues and fulfill resolution SLAs.</p>
              </div>

              <div className="industry-exact-item">
                <div className="industry-exact-icon">
                  <svg viewBox="0 0 64 64" fill="none" stroke="#0088cc" strokeWidth="2.5">
                    <circle cx="32" cy="24" r="8" />
                    <path d="M16 48c0-8 8-12 16-12s16 4 16 12" />
                  </svg>
                </div>
                <h3>Department Leads</h3>
                <p>Approve software requests and monitor department resolution times.</p>
              </div>

              <div className="industry-exact-item">
                <div className="industry-exact-icon">
                  <svg viewBox="0 0 64 64" fill="none" stroke="#0088cc" strokeWidth="2.5">
                    <rect x="14" y="12" width="36" height="40" rx="3" />
                    <path d="M22 22h20M22 32h20M22 42h12" />
                  </svg>
                </div>
                <h3>HR & Onboarding</h3>
                <p>Submit automated hardware and account provision requests for new hires.</p>
              </div>

              <div className="industry-exact-item">
                <div className="industry-exact-icon">
                  <svg viewBox="0 0 64 64" fill="none" stroke="#0088cc" strokeWidth="2.5">
                    <path d="M10 20h44v8H10zM10 36h44v8H10z" />
                    <circle cx="18" cy="24" r="2" fill="#0088cc" />
                    <circle cx="18" cy="40" r="2" fill="#0088cc" />
                  </svg>
                </div>
                <h3>System Engineers</h3>
                <p>Monitor high-priority server downtime alerts and emergency technical tasks.</p>
              </div>

              <div className="industry-exact-item">
                <div className="industry-exact-icon">
                  <svg viewBox="0 0 64 64" fill="none" stroke="#0088cc" strokeWidth="2.5">
                    <path d="M32 12l18 6v14c0 12-18 20-18 20S14 44 14 32V18l18-6z" />
                  </svg>
                </div>
                <h3>Security Operations</h3>
                <p>Investigate suspicious activity, access requests, and compliance alerts.</p>
              </div>

              <div className="industry-exact-item">
                <div className="industry-exact-icon">
                  <svg viewBox="0 0 64 64" fill="none" stroke="#0088cc" strokeWidth="2.5">
                    <path d="M12 48l12-16 12 8 16-20" />
                    <path d="M40 20h12v12" />
                  </svg>
                </div>
                <h3>IT Leadership</h3>
                <p>Track team performance metrics and resolution SLAs.</p>
              </div>

            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="home-faq" id="faq">
          <div className="home-container">
            <h2 className="faq-title">FAQs</h2>
            <div className="faq-custom-wrapper">
              {faqData.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={index} className={`faq-custom-item ${isOpen ? 'is-open' : ''}`}>
                    <button 
                      className="faq-custom-header" 
                      onClick={() => toggleFaq(index)}
                      type="button"
                    >
                      <span className={`faq-toggle-box ${isOpen ? 'active' : ''}`}>
                        {isOpen ? '−' : '+'}
                      </span>
                      <span className={`faq-question-text ${isOpen ? 'active' : ''}`}>
                        {faq.question}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="faq-custom-body">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="home-footer">
        <div className="home-container home-footer__grid">

          <div>
            <p className="home-footer__tagline">Enterprise IT Support & Service Desk Portal.</p>
            <h3 className="home-footer__brand">HelpDesk</h3>
          </div>

          <div>
            <h4>Platform</h4>
            <a href="#features">Features</a>
            <a href="#services">Services</a>
            <a href="#who-we-help">Who It's For</a>
          </div>

          <div>
            <h4>Account</h4>
            <Link to="/login">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </div>

          <div>
            <h4>Support</h4>
            <a href="#faq">FAQs</a>
            <a href="#privacy">Privacy Policy</a>
          </div>

        </div>

        <div className="home-container home-footer__bottom">
          <span>© 2026 Corporate IT Support System. All Rights Reserved.</span>
        </div>
      </footer>

    </div>
  );
}

export default Home;