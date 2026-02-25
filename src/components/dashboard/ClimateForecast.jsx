import React, { useState } from 'react';
import { CloudRain, Sun, Wind, ShieldAlert } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ClimateForecast = ({ soilType, rainfallForecast }) => {
    const [climateMetric, setClimateMetric] = useState('precipitation'); // precipitation, temperature, moisture

    return (
        <div className="dash-grid dash-fade-in">
            <div className="col-span-12 card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div className="card-title" style={{ margin: 0 }}>
                        <CloudRain size={20} color="#00E396" />
                        Micro-Climate Deep Dive
                    </div>
                    <div style={{ display: 'flex', gap: '10px', background: 'rgba(0,0,0,0.2)', padding: '4px', borderRadius: '8px' }}>
                        <button onClick={() => setClimateMetric('precipitation')} style={{ padding: '6px 12px', borderRadius: '6px', background: climateMetric === 'precipitation' ? '#2A3832' : 'transparent', color: climateMetric === 'precipitation' ? '#00E396' : 'var(--text-muted)', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Precipitation</button>
                        <button onClick={() => setClimateMetric('temperature')} style={{ padding: '6px 12px', borderRadius: '6px', background: climateMetric === 'temperature' ? '#2A3832' : 'transparent', color: climateMetric === 'temperature' ? '#FFB020' : 'var(--text-muted)', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Temperature</button>
                        <button onClick={() => setClimateMetric('moisture')} style={{ padding: '6px 12px', borderRadius: '6px', background: climateMetric === 'moisture' ? '#2A3832' : 'transparent', color: climateMetric === 'moisture' ? '#008FFB' : 'var(--text-muted)', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Soil Moisture</button>
                    </div>
                </div>

                <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                    {climateMetric === 'precipitation' && "LSTM Time-Series Forecasting: Projecting rainfall volumes against historical averages over the next 6 weeks. The shaded area represents model confidence intervals."}
                    {climateMetric === 'temperature' && "Temperature Extremes Forecast: Identifying heat spikes that can cause catastrophic failure during the crucial flowering stage."}
                    {climateMetric === 'moisture' && "Soil Moisture Retention: Modeled based on your '" + soilType + "' soil characteristics and expected precipitation minus evaporative loss."}
                </p>

                <div className="chart-container" style={{ height: '400px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={rainfallForecast} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2A3832" />
                            <XAxis dataKey="date" stroke="#A0AEC0" />
                            <YAxis stroke="#A0AEC0" />
                            <Tooltip contentStyle={{ backgroundColor: '#1A2822', borderColor: '#2A3832' }} />
                            <Legend />
                            {climateMetric === 'precipitation' && (
                                <>
                                    <Line type="monotone" dataKey="lstmPredict" name="LSTM Forecasted Rainfall (mm)" stroke="#00E396" strokeWidth={3} activeDot={{ r: 8 }} />
                                    <Line type="monotone" dataKey="historical" name="Historical Average (mm)" stroke="#A0AEC0" strokeWidth={2} strokeDasharray="5 5" />
                                </>
                            )}
                            {climateMetric === 'temperature' && (
                                <>
                                    <Line type="monotone" dataKey="lstmPredict" name="Forecasted Max Temp (°C)" stroke="#FFB020" strokeWidth={3} activeDot={{ r: 8 }} />
                                    <Line type="monotone" dataKey="historical" name="Historical Max Temp (°C)" stroke="#FF5630" strokeWidth={2} strokeDasharray="5 5" />
                                </>
                            )}
                            {climateMetric === 'moisture' && (
                                <>
                                    <Line type="monotone" dataKey="lstmPredict" name="Moisture Saturation (%)" stroke="#008FFB" strokeWidth={3} activeDot={{ r: 8 }} />
                                    <Line type="monotone" dataKey="historical" name="Ideal Baseline (%)" stroke="#A0AEC0" strokeWidth={2} strokeDasharray="5 5" />
                                </>
                            )}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="col-span-4 card">
                <div className="card-title">Temperature Spikes</div>
                <div className="metric">
                    <span className="metric-value" style={{ color: '#FFB020' }}>31°C</span>
                    <span className="metric-label">Predicted High: Mar 22</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '15px', lineHeight: '1.4' }}>
                    <Sun size={14} color="#FFB020" style={{ display: 'inline', marginRight: '5px' }} />
                    Heat stress likely during the vegetative phase. Ensure ground cover or mulching to preserve moisture, especially with your <strong>{soilType}</strong> soil.
                </p>
            </div>
            <div className="col-span-4 card">
                <div className="card-title">Wind Vectors</div>
                <div className="metric">
                    <span className="metric-value">12 km/h</span>
                    <span className="metric-label">NW Predominant</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '15px', lineHeight: '1.4' }}>
                    <Wind size={14} color="#00E396" style={{ display: 'inline', marginRight: '5px' }} />
                    Current vectors are optimal for natural pollination. Low risk of physical crop damage over the next 14 days.
                </p>
            </div>
            <div className="col-span-4 card">
                <div className="card-title">Pest & Disease Modeling</div>
                <div className="metric">
                    <span className="metric-value" style={{ color: '#FF5630' }}>High Risk</span>
                    <span className="metric-label">Fall Armyworm Alert</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '15px', lineHeight: '1.4' }}>
                    <ShieldAlert size={14} color="#FF5630" style={{ display: 'inline', marginRight: '5px' }} />
                    High humidity and temperature algorithms flag a 72% probability of pest emergence by late April. Prepare preventative measures.
                </p>
            </div>
        </div>
    );
};

export default ClimateForecast;
