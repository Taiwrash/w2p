import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Menu, X, CloudRain, Sprout, BarChart3, Bug } from 'lucide-react';
import USSDPhone from '../components/USSDPhone';

const LandingPage = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Intersection Observer logic for fade-in elements
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    const toggleNav = () => setIsNavOpen(!isNavOpen);

    return (
        <div style={{ overflow: isNavOpen ? 'hidden' : 'auto' }}>
            {/* Navbar */}
            <nav className={`navbar ${isNavOpen ? 'nav-open' : ''}`} style={{
                background: scrolled ? 'rgba(15, 28, 21, 0.95)' : 'rgba(15, 28, 21, 0.85)',
                boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.4)' : 'none'
            }}>
                <div className="container nav-container">
                    <a href="#" className="logo">
                        <img src="/assets/images/w2p-high-resolution-logo-transparent.png" alt="W2P Logo" style={{ height: '40px' }} onError={(e) => { e.target.style.display = 'none'; }} />
                        {/* <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#00E396', marginLeft: '10px' }}>W2P</span> */}
                    </a>

                    <div className="nav-links">
                        <a href="#features" onClick={() => setIsNavOpen(false)}>Features</a>
                        <a href="#how-it-works" onClick={() => setIsNavOpen(false)}>How It Works</a>
                        <a href="#about" onClick={() => setIsNavOpen(false)}>Our Impact</a>
                    </div>

                    <div className="nav-cta">
                        <Link to="/auth" className="btn btn-primary">Launch Web App</Link>
                    </div>

                    <button className={`mobile-menu-btn ${isNavOpen ? 'active' : ''}`} onClick={toggleNav} aria-label="Toggle menu">
                        {isNavOpen ? <X size={28} color="#fff" /> : <Menu size={28} color="#fff" />}
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <section className="hero">
                <div className="hero-bg"></div>
                <div className="container hero-content fade-in">
                    <span className="badge">🌱 Empowering African Agriculture</span>
                    <h1>Predict. <span className="highlight">Plant.</span> Prosper.</h1>
                    <p className="hero-subcheck">
                        Advanced AI insights tailored for smallholder farmers.
                        Maximize your harvest with precise planting schedules and market intelligence.
                    </p>
                    <div className="hero-actions">
                        <Link to="/auth" className="btn btn-primary btn-large">
                            Launch Web App <ArrowRight size={18} />
                        </Link>
                        <a href="#how-it-works" className="btn btn-secondary btn-large">
                            See How It Works
                        </a>
                    </div>

                    <div className="hero-stats">
                        <div className="stat-item fade-in">
                            <span className="stat-number">95%</span>
                            <span className="stat-label">Prediction Accuracy</span>
                        </div>
                        <div className="stat-item fade-in">
                            <span className="stat-number">5K+</span>
                            <span className="stat-label">Farmers Active</span>
                        </div>
                        <div className="stat-item fade-in">
                            <span className="stat-number">24/7</span>
                            <span className="stat-label">AI Crop Advisory</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="features">
                <div className="container">
                    <div className="section-header fade-in">
                        <h2>Precision Agriculture for Everyone</h2>
                        <p>Advanced technology simplified for daily farming decisions.</p>
                    </div>

                    <div className="feature-grid">
                        <div className="feature-card glass fade-in">
                            <div className="icon-box"><CloudRain size={40} color="#00E396" /></div>
                            <h3>Smart Weather Insights</h3>
                            <p>Hyper-local weather forecasts that tell you exactly when to sow and harvest to avoid climate risks.</p>
                        </div>
                        <div className="feature-card glass fade-in">
                            <div className="icon-box"><Sprout size={40} color="#008FFB" /></div>
                            <h3>Crop Suitability</h3>
                            <p>AI analysis of soil data to recommend the most profitable and resilient crops for your specific land.</p>
                        </div>
                        <div className="feature-card glass fade-in">
                            <div className="icon-box"><BarChart3 size={40} color="#FFB020" /></div>
                            <h3>Yield Probability</h3>
                            <p>Real-time risk scoring keeps you informed of expected yield confidence across the growing season.</p>
                        </div>
                        <div className="feature-card glass fade-in">
                            <div className="icon-box"><Bug size={40} color="#FF5630" /></div>
                            <h3>Pest & Disease Risk</h3>
                            <p>Early warning systems combining climate indicators and AI to protect your crops.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="how-it-works">
                <div className="container">
                    <div className="split-layout">
                        <div className="text-content">
                            <h2 className="fade-in">How W2P Works</h2>
                            <p className="fade-in">From soil to sale, our AI guides you through every step of the farming cycle.</p>

                            <ul className="steps-list">
                                <li className="step-item fade-in">
                                    <span className="step-number">01</span>
                                    <div className="step-details">
                                        <h3>Input Your Data</h3>
                                        <p>Enter your location, land size, and available resources via our simple interface.</p>
                                    </div>
                                </li>
                                <li className="step-item fade-in">
                                    <span className="step-number">02</span>
                                    <div className="step-details">
                                        <h3>Get AI Recommendations</h3>
                                        <p>Receive a personalized planting calendar showing exactly what and when to plant.</p>
                                    </div>
                                </li>
                                <li className="step-item fade-in">
                                    <span className="step-number">03</span>
                                    <div className="step-details">
                                        <h3>Offline Accessibility</h3>
                                        <p>No smartphone or data? No problem. Analog farmers access AI yields through translated USSD and automated SMS.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="image-content fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                                <span className="badge" style={{ background: 'rgba(0, 227, 150, 0.2)', color: '#00E396', border: '1px solid #00E396' }}>LIVE DEMO</span>
                                <h3 style={{ marginTop: '10px' }}>Try the USSD Interface</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Dial <strong style={{ color: '#fff' }}>*829#</strong> and press Call (Green Button) to interact with the offline AI.</p>
                            </div>
                            <div className="glow-effect" style={{ borderRadius: '30px', padding: '10px' }}>
                                <USSDPhone />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About / Mission */}
            <section id="about" className="mission">
                <div className="mission-bg"></div>
                <div className="container mission-content fade-in">
                    <div className="mission-text">
                        <span className="badge">Our Story</span>
                        <h2>Built by Farmers, For Farmers</h2>
                        <p>
                            "I grew up on a farm and saw firsthand the challenges of unpredictable weather and market volatility.
                            W2P combines that lived experience with cutting-edge AI to level the playing field for African agriculture."
                        </p>
                        <cite>— Founder, W2P</cite>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section id="access" className="cta-section">
                <div className="container">
                    <div className="cta-box glass fade-in">
                        <h2>Ready to Transform Your Harvest?</h2>
                        <p>Launch the dashboard and get AI-powered planting predictions.</p>
                        <br />
                        <Link to="/auth" className="btn btn-primary btn-large">Launch Application Web App</Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer>
                <div className="container footer-content">
                    <div className="footer-brand">
                        <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#00E396' }}>W2P</span>
                        <p style={{ marginTop: '10px' }}>Empowering African agriculture with intelligence.</p>
                    </div>
                    <div className="footer-links">
                        <div className="link-group">
                            <h4>Platform</h4>
                            <a href="#">Features</a>
                            <a href="#">Pricing</a>
                            <a href="#">Success Stories</a>
                        </div>
                        <div className="link-group">
                            <h4>Company</h4>
                            <a href="#">About Us</a>
                            <a href="#">Careers</a>
                            <a href="#">Contact</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 W2P. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
