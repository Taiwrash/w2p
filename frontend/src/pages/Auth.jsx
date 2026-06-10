import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Leaf, Mail, Lock } from 'lucide-react';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleAuth = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
            const payload = isLogin ? { email, password } : { email, password, name };

            const response = await fetch(`${import.meta.env.VITE_API_URL ?? ''}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Authentication failed');
            }

            // Save session state
            localStorage.setItem('w2p_role', data.user.role);
            localStorage.setItem('w2p_user', JSON.stringify(data.user));

            navigate('/dashboard', { state: { role: data.user.role } });
        } catch (err) {
            clearTimeout(timeoutId);
            if (err.name === 'AbortError') {
                setError('Server did not respond. Please ensure the backend is running and try again.');
            } else {
                setError(err.message);
            }
        } finally {
            setIsLoading(false);
        }
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
                        <p style={{ color: 'var(--text-muted)' }}>{isLogin ? 'Enter your credentials to access your workspace. Use admin@w2p.com / password123 for demo.' : 'Join the fastest growing African agritech network.'}</p>
                    </div>

                    {error && (
                        <div style={{ background: 'rgba(255, 86, 48, 0.1)', color: '#FF5630', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem', border: '1px solid rgba(255, 86, 48, 0.2)' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {!isLogin && (
                            <div>
                                <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    required={!isLogin}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
                                    type="email"
                                    placeholder="your@email.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{ width: '100%', padding: '14px 20px 14px 45px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: 'white', fontSize: '1rem', outline: 'none' }}
                                    onFocus={(e) => e.target.style.borderColor = '#00E396'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isLoading}
                            style={{ width: '100%', padding: '16px', marginTop: '10px', opacity: isLoading ? 0.7 : 1 }}
                        >
                            {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Free Account')} {!isLoading && <ArrowRight size={18} />}
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
