import React from 'react';
import { Settings } from 'lucide-react';

const Preferences = ({ selectedCrop, farmLocation, farmArea, soilType, waterSource, handleNav }) => {
    return (
        <div className="dash-grid dash-fade-in">
            <div className="col-span-8 card">
                <div className="card-title">
                    <Settings size={20} color="#00E396" />
                    Platform & Communication Preferences
                </div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
                    Configure how W2P communicates the AI model alerts to you, ensuring low-bandwidth accessibility.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid var(--glass-border)' }}>
                        <div>
                            <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '4px' }}>SMS Advisories Alerts</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '400px' }}>Crucial for rural access. Receive extreme weather, AI plan updates, and market pricing alerts directly via SMS without needing internet.</p>
                        </div>
                        <input type="checkbox" defaultChecked style={{ width: '1.5rem', height: '1.5rem', accentColor: '#00E396', cursor: 'pointer' }} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid var(--glass-border)' }}>
                        <div>
                            <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '4px' }}>Language Interface</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Select the primary language for your SMS notifications and dashboard.</p>
                        </div>
                        <select style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: 'white' }}>
                            <option>English</option>
                            <option>Swahili</option>
                            <option>French</option>
                            <option>Hausa</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px' }}>
                        <div>
                            <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '4px' }}>Market Price Intelligence</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '400px' }}>Continuously track regional market trends for your selected crop ({selectedCrop}) from satellite and local market API endpoints.</p>
                        </div>
                        <input type="checkbox" defaultChecked style={{ width: '1.5rem', height: '1.5rem', accentColor: '#00E396', cursor: 'pointer' }} />
                    </div>
                </div>
            </div>

            <div className="col-span-4 card">
                <div className="card-title">Registered Profile Snapshot</div>
                <div style={{ marginTop: '20px' }}>
                    <div style={{ paddingBottom: '15px' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Coordinates bounds</span>
                        <div style={{ fontSize: '1.1rem', marginTop: '5px', color: '#fff' }}>[{farmLocation.lat.toFixed(4)}, {farmLocation.lng.toFixed(4)}]</div>
                    </div>
                    <div style={{ paddingBottom: '15px' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Registered Scale</span>
                        <div style={{ fontSize: '1.1rem', marginTop: '5px', color: '#fff' }}>{farmArea} Acres Polygon</div>
                    </div>
                    <div style={{ paddingBottom: '15px' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Soil Profile</span>
                        <div style={{ fontSize: '1.1rem', marginTop: '5px', color: '#fff' }}>{soilType}</div>
                    </div>
                    <div style={{ paddingBottom: '15px' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Water Infrastructure</span>
                        <div style={{ fontSize: '1.1rem', marginTop: '5px', color: '#fff' }}>{waterSource}</div>
                    </div>
                    <button className="btn btn-secondary" style={{ width: '100%', marginTop: '15px' }} onClick={(e) => handleNav(e, 'map')}>
                        Reconfigure Farm Polygon
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Preferences;
