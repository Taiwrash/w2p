import React from 'react';
import { Cpu, Calendar, CloudRain, CheckCircle2, Activity, AlertTriangle } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ComposedChart, Line, Legend } from 'recharts';

const Overview = ({
    selectedCrop,
    farmArea,
    soilType,
    waterSource,
    cropSuitability,
    yieldProjections,
    handleNav
}) => {
    return (
        <div className="dash-grid dash-fade-in">
            {/* Top ML Actionable Banner */}
            <div className="col-span-12 card recommendation-banner">
                <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.3)', padding: '6px 12px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#00E396' }}>
                    <Cpu size={14} /> AI Model Status: Active
                </div>
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '8px', color: '#fff' }}>Optimal {selectedCrop} Planting Window Detected</h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '800px', marginBottom: '20px', lineHeight: '1.6' }}>
                        Based on Prophet & LSTM time-series forecasts for your <strong>{farmArea.toFixed(1)}-acre</strong> calculated farm boundary, sustained rainfall onset is predicted optimally in 14 days.
                        Given your <strong>{soilType}</strong> soil and <strong>{waterSource}</strong> setup, land preparation must be completed by next week to achieve a 92% germination probability.
                    </p>
                    <button className="btn btn-primary" style={{ padding: '8px 20px' }} onClick={(e) => handleNav(e, 'planner')}>
                        <Calendar size={16} /> View AI Planting Schedule
                    </button>
                    <button className="btn btn-secondary" style={{ padding: '8px 20px', marginLeft: '12px' }} onClick={(e) => handleNav(e, 'climate')}>
                        <CloudRain size={16} /> View Climate Data
                    </button>
                </div>
            </div>

            {/* AI Core Risk Metrics */}
            <div className="col-span-3 card">
                <div className="card-title">Rainfall Onset</div>
                <div className="metric">
                    <span className="metric-value">Mar 15</span>
                    <span className="metric-label">LSTM Predicted Start</span>
                    <div className="trend-up" style={{ marginTop: '8px' }}>
                        <CheckCircle2 size={16} /> High Confidence (88%)
                    </div>
                </div>
            </div>

            <div className="col-span-3 card">
                <div className="card-title">Germination Risk</div>
                <div className="metric">
                    <span className="metric-value" style={{ color: '#00E396' }}>8%</span>
                    <span className="metric-label">Probability of Failure</span>
                    <div className="trend-up" style={{ marginTop: '8px' }}>
                        Improved by 15% vs historic avg
                    </div>
                </div>
            </div>

            <div className="col-span-3 card">
                <div className="card-title">Soil Moisture Est.</div>
                <div className="metric">
                    <span className="metric-value">42%</span>
                    <span className="metric-label">Current Sub-surface saturation</span>
                    <div className="trend-up" style={{ marginTop: '8px', color: '#FFB020' }}>
                        <Activity size={16} /> Tracking towards 50%+ ideal
                    </div>
                </div>
            </div>

            <div className="col-span-3 card">
                <div className="card-title">Yield Risk Alert</div>
                <div className="metric">
                    <span className="metric-value" style={{ color: '#FFB020' }}>22%</span>
                    <span className="metric-label">Mid-season drought probability</span>
                    <div className="trend-down" style={{ marginTop: '8px' }}>
                        <AlertTriangle size={16} /> Moderate alert in Flowering stage
                    </div>
                </div>
            </div>

            {/* Suitability Classification */}
            <div className="col-span-5 card">
                <div className="card-title">Crop Suitability (Random Forest)</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>Classification based on input: {soilType} Soil, {waterSource}</p>

                <div className="chart-container" style={{ height: '240px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={cropSuitability} margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#2A3832" />
                            <XAxis type="number" domain={[0, 100]} stroke="#A0AEC0" hide />
                            <YAxis dataKey="name" type="category" stroke="#A0AEC0" width={120} tick={{ fontSize: 11 }} />
                            <Tooltip cursor={{ fill: '#2A3832' }} contentStyle={{ backgroundColor: '#1A2822', borderColor: '#2A3832' }} />
                            <Bar dataKey="likelihood" name="Suitability Score %" radius={[0, 4, 4, 0]}>
                                {cropSuitability.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Yield Risk Progression */}
            <div className="col-span-7 card">
                <div className="card-title">Cumulative Seasonal Risk Profile</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>Projected environmental stress levels across the crop lifecycle.</p>
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={yieldProjections} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2A3832" />
                            <XAxis dataKey="stage" stroke="#A0AEC0" tick={{ fontSize: 12 }} />
                            <YAxis stroke="#A0AEC0" />
                            <Tooltip contentStyle={{ backgroundColor: '#1A2822', borderColor: '#2A3832' }} />
                            <Legend />
                            <Bar dataKey="historicalRisk" name="Historical Risk %" fill="#2A3832" radius={[4, 4, 0, 0]} />
                            <Line type="monotone" dataKey="projectedRisk" name="AI Projected Risk %" stroke="#FF5630" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Overview;
