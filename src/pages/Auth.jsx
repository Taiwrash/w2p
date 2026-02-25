import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Leaf, Mail, Lock } from 'lucide-react';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleAuth = (e) => {
        e.preventDefault();
        // Standardize entry: Check if they previously upgraded on this device (for hackathon demo)
        const savedRole = localStorage.getItem('w2p_role') || 'farmer';
        navigate('/dashboard', { state: { role: savedRole } });
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg-dark)' }}>

            {/* Left Branding Panel */}
            <div style={{ flex: 1, background: 'linear-gradient(135deg, rgba(15, 28, 21, 0.9), rgba(0, 227, 150, 0.2)), url("https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2000&auto=format&fit=crop") center/cover', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '60px', position: 'relative' }}>
                <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src="/assets/images/w2p-high-resolution-logo-transparent.png" alt="W2P" style={{ height: '40px' }} />
                    <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#00E396' }}>W2P</span>
                </a>

                <div>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 700, marginBottom: '20px', lineHeight: '1.2' }}>Access <br />Precision <span style={{ color: '#00E396' }}>Agriculture</span></h1>
                    <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', maxWidth: '400px' }}>A unified platform connecting individual farmers, merchant agents, and large-scale cooperatives to AI-driven insights.</p>
                </div>

                <p style={{ color: 'var(--text-muted)' }}>&copy; 2026 W2P Platform</p>
            </div>

            {/* Right Auth Panel */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
                <div style={{ width: '100%', maxWidth: '400px' }} className="dash-fade-in">
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <div style={{ background: 'rgba(0, 227, 150, 0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                            <Leaf size={30} color="#00E396" />
                        </div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
                        <p style={{ color: 'var(--text-muted)' }}>{isLogin ? 'Enter your credentials to access your workspace.' : 'Join the fastest growing African agritech network.'}</p>
                    </div>

                    <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {!isLogin && (
                            <div>
                                <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    required={!isLogin}
                                    style={{ width: '100%', padding: '14px 20px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: 'white', fontSize: '1rem', outline: 'none' }}
                                    onFocus={(e) => e.target.style.borderColor = '#00E396'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                                />
                            </div>
                        )}

                        <div>
                            <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Phone Number or Email</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} color="#A0AEC0" style={{ position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)' }} />
                                <input
                                    type="text"
                                    placeholder="your@email.com"
                                    required
                                    style={{ width: '100%', padding: '14px 20px 14px 45px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: 'white', fontSize: '1rem', outline: 'none' }}
                                    onFocus={(e) => e.target.style.borderColor = '#00E396'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                                />
                            </div>
                        </div>

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Password / PIN</label>
                                {isLogin && <a href="#" style={{ fontSize: '0.85rem', color: '#00E396' }}>Forgot password?</a>}
                            </div>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} color="#A0AEC0" style={{ position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)' }} />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    style={{ width: '100%', padding: '14px 20px 14px 45px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: 'white', fontSize: '1rem', outline: 'none' }}
                                    onFocus={(e) => e.target.style.borderColor = '#00E396'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '16px', marginTop: '10px' }}
                        >
                            {isLogin ? 'Sign In' : 'Create Free Account'} <ArrowRight size={18} />
                        </button>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: '30px' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                style={{ background: 'none', border: 'none', color: '#00E396', fontWeight: 600, cursor: 'pointer', padding: 0 }}
                            >
                                {isLogin ? 'Sign up for free' : 'Log in here'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Auth;
