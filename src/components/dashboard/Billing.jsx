import React from 'react';
import { CreditCard, CheckCircle2, User, Users, Building, ArrowRight } from 'lucide-react';

const Billing = ({ activeRole, setActiveRole }) => {
    return (
        <div className="dash-grid dash-fade-in">
            <div className="col-span-12 card" style={{ textAlign: 'center', borderBottom: 'none' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Platform Billing & Upgrades</h2>
                <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 30px' }}>
                    W2P operates on a freemium architecture. Individual farmers receive unlimited core AI advisory.
                    Upgrade your workspace license to deploy portfolio management and API resources.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', textAlign: 'left', marginTop: '20px' }}>

                    {/* Free Farmer Tier */}
                    <div style={{
                        padding: '30px',
                        borderRadius: '16px',
                        border: `2px solid ${activeRole === 'farmer' ? '#00E396' : 'var(--glass-border)'}`,
                        background: activeRole === 'farmer' ? 'rgba(0, 227, 150, 0.05)' : 'var(--bg-dark)',
                        position: 'relative'
                    }}>
                        {activeRole === 'farmer' && (
                            <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#00E396', color: '#000', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                CURRENT PLAN
                            </div>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                            <div style={{ background: 'rgba(0, 227, 150, 0.1)', padding: '10px', borderRadius: '10px' }}>
                                <User size={24} color="#00E396" />
                            </div>
                            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Individual Farmer</h3>
                        </div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '5px' }}>Free<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}> / forever</span></div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px', minHeight: '40px' }}>Unlimited access to AI models for a single farming footprint.</p>

                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><CheckCircle2 size={16} color="#00E396" /> 1 Map Polygon Marker</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><CheckCircle2 size={16} color="#00E396" /> Live Climate Data</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><CheckCircle2 size={16} color="#00E396" /> AI Action Plan</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}><CheckCircle2 size={16} color="transparent" /> SMS Alerts (Self)</li>
                        </ul>

                        {activeRole === 'farmer' && (
                            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '12px', border: '1px solid var(--glass-border)', marginBottom: '20px' }}>
                                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '5px' }}>Add-On: SMS Alerts</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Receive direct weather and planting SMS alerts on your feature phone.</div>
                                <button className="btn btn-secondary" style={{ width: '100%', padding: '6px', fontSize: '0.85rem', color: '#00E396', borderColor: '#00E396' }}>Buy For $2 / month</button>
                            </div>
                        )}

                        <button
                            className="btn btn-secondary"
                            style={{ width: '100%', borderColor: activeRole === 'farmer' ? '#00E396' : '', color: activeRole === 'farmer' ? '#00E396' : '' }}
                            disabled={activeRole === 'farmer'}
                            onClick={() => setActiveRole('farmer')}
                        >
                            {activeRole === 'farmer' ? 'Active User' : 'Downgrade to Free'}
                        </button>
                    </div>

                    {/* Local Agent Tier */}
                    <div style={{
                        padding: '30px',
                        borderRadius: '16px',
                        border: `2px solid ${activeRole === 'agent' ? '#008FFB' : 'var(--glass-border)'}`,
                        background: activeRole === 'agent' ? 'rgba(0, 143, 251, 0.05)' : 'var(--bg-dark)',
                        position: 'relative'
                    }}>
                        {activeRole === 'agent' && (
                            <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#008FFB', color: '#000', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                CURRENT PLAN
                            </div>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                            <div style={{ background: 'rgba(0, 143, 251, 0.1)', padding: '10px', borderRadius: '10px' }}>
                                <Users size={24} color="#008FFB" />
                            </div>
                            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Merchant Agent</h3>
                        </div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '5px' }}>$15<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}> / month</span></div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px', minHeight: '40px' }}>Perfect for agropreneurs managing portfolios of offline farmers.</p>

                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><CheckCircle2 size={16} color="#008FFB" /> Manage up to 50 Farmer profiles</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><CheckCircle2 size={16} color="#008FFB" /> Automate SMS generation</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><CheckCircle2 size={16} color="#008FFB" /> Print out paper calendars</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><CheckCircle2 size={16} color="#008FFB" /> Local Market Intel Reports</li>
                        </ul>

                        {activeRole === 'agent' && (
                            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '12px', border: '1px solid var(--glass-border)', marginBottom: '20px' }}>
                                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '5px' }}>Add-On: Expansion Pack</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Increase your portfolio capacity if you manage more than 50 farmers.</div>
                                <button className="btn btn-secondary" style={{ width: '100%', padding: '6px', fontSize: '0.85rem', color: '#008FFB', borderColor: '#008FFB' }}>+$5 per 50 Extra Farmers</button>
                            </div>
                        )}

                        <button
                            className="btn btn-primary"
                            style={{
                                width: '100%',
                                background: activeRole === 'agent' ? 'transparent' : 'linear-gradient(135deg, #008FFB, #00C6FF)',
                                border: activeRole === 'agent' ? '1px solid #008FFB' : 'none',
                                color: activeRole === 'agent' ? '#008FFB' : '#fff'
                            }}
                            disabled={activeRole === 'agent'}
                            onClick={() => setActiveRole('agent')}
                        >
                            {activeRole === 'agent' ? 'Subscribed' : 'Upgrade to Agent'}
                        </button>
                    </div>

                    {/* Enterprise Tier */}
                    <div style={{
                        padding: '30px',
                        borderRadius: '16px',
                        border: `2px solid ${activeRole === 'enterprise' ? '#FFB020' : 'var(--glass-border)'}`,
                        background: activeRole === 'enterprise' ? 'rgba(255, 176, 32, 0.05)' : 'var(--bg-dark)',
                        position: 'relative'
                    }}>
                        {activeRole === 'enterprise' && (
                            <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#FFB020', color: '#000', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                CURRENT PLAN
                            </div>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                            <div style={{ background: 'rgba(255, 176, 32, 0.1)', padding: '10px', borderRadius: '10px' }}>
                                <Building size={24} color="#FFB020" />
                            </div>
                            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Corporate / Gov</h3>
                        </div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '5px' }}>Custom</div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px', minHeight: '40px' }}>Large-scale deployment for governments and cooperative networks.</p>

                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><CheckCircle2 size={16} color="#FFB020" /> Unlimited API Rate Limits</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><CheckCircle2 size={16} color="#FFB020" /> Regional Yield Aggregation</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><CheckCircle2 size={16} color="#FFB020" /> Custom ML Tuning Support</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><CheckCircle2 size={16} color="#FFB020" /> Direct Account Manager</li>
                        </ul>

                        <button
                            className="btn btn-primary"
                            style={{
                                width: '100%',
                                background: activeRole === 'enterprise' ? 'transparent' : 'linear-gradient(135deg, #FFB020, #FF5630)',
                                border: activeRole === 'enterprise' ? '1px solid #FFB020' : 'none',
                                color: activeRole === 'enterprise' ? '#FFB020' : '#000'
                            }}
                            disabled={activeRole === 'enterprise'}
                            onClick={() => setActiveRole('enterprise')}
                        >
                            {activeRole === 'enterprise' ? 'Subscribed' : 'Contact Sales'}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Billing;
