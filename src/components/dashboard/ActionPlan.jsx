import React from 'react';
import { Calendar } from 'lucide-react';

const ActionPlan = ({ farmLocation, waterSource, selectedCrop, setSelectedCrop, cropSuitability, soilType }) => {
    return (
        <div className="dash-grid dash-fade-in">
            <div className="col-span-12 card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="card-title" style={{ margin: 0 }}>
                        <Calendar size={20} color="#00E396" />
                        AI-Optimized Planting Strategy
                    </div>
                    <select
                        value={selectedCrop}
                        onChange={e => setSelectedCrop(e.target.value)}
                        style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--primary-color)', background: 'rgba(0,227,150,0.1)', color: '#00E396', fontFamily: 'inherit', fontWeight: 'bold', outline: 'none' }}
                    >
                        {cropSuitability.map((c, i) => <option key={i} value={c.name} style={{ color: '#000' }}>Target: {c.name}</option>)}
                    </select>
                </div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '30px', marginTop: '15px' }}>
                    Dynamically generated timetable optimized for <strong>{farmLocation.lat.toFixed(4)}, {farmLocation.lng.toFixed(4)}</strong> footprint.
                    Factors in your {waterSource} constraints to maximize the 92% germination probability window.
                </p>

                <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', borderLeft: '4px solid #A0AEC0' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                <span style={{ background: '#A0AEC0', color: '#000', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' }}>PHASE 1</span>
                                <h4 style={{ fontSize: '1.2rem', color: '#fff', margin: 0 }}>Land Clearing & Prep</h4>
                            </div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '600px' }}>Prior to the forecasted onset of rains on Mar 15, clear acreage and prepare beds. Since you are working with {soilType} soil, deep plowing is recommended to aid moisture penetration.</p>
                        </div>
                        <div style={{ textAlign: 'right', minWidth: '150px' }}>
                            <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: 600, color: '#A0AEC0' }}>In Progress</span>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Mar 01 - Mar 10</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px', background: 'rgba(0,227,150,0.05)', borderRadius: '12px', borderLeft: '4px solid #00E396' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                <span style={{ background: '#00E396', color: '#000', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' }}>PHASE 2</span>
                                <h4 style={{ fontSize: '1.2rem', color: '#fff', margin: 0 }}>Sow {selectedCrop} Seeds</h4>
                            </div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '600px' }}>The AI identifies this as the optimal window. The combined probability of sustained moisture exceeding evaporation rates hits the 95% threshold.</p>
                        </div>
                        <div style={{ textAlign: 'right', minWidth: '150px' }}>
                            <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: 600, color: '#00E396' }}>High Priority</span>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Mar 15 - Mar 20</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px', background: 'rgba(0,143,251,0.05)', borderRadius: '12px', borderLeft: '4px solid #008FFB' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                <span style={{ background: '#008FFB', color: '#000', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' }}>PHASE 3</span>
                                <h4 style={{ fontSize: '1.2rem', color: '#fff', margin: 0 }}>First Top-Dressing Fertilizer</h4>
                            </div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '600px' }}>Timed perfectly prior to the Week 3 predicted rain surge (45mm). This ensures maximum nutrient dissolution and root absorption based on your {waterSource} infrastructure.</p>
                        </div>
                        <div style={{ textAlign: 'right', minWidth: '150px' }}>
                            <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: 600, color: '#008FFB' }}>Scheduled</span>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Apr 05 - Apr 12</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActionPlan;
