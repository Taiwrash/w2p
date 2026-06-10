import React, { useState, useEffect } from 'react';
import { TrendingUp, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import API_BASE from '../../api';

const MarketIntel = () => {
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/market-prices`);
                const data = await res.json();
                setPrices(data);
            } catch (err) {
                console.error("Error loading prices:", err);
            }
        };
        fetchPrices();
    }, []);

    // Build chart data from live prices: one entry per crop showing base vs current
    const chartData = prices.map(p => ({
        crop:    p.crop,
        Base:    p.base_price,
        Current: p.current_price,
    }));

    return (
        <div className="dash-grid dash-fade-in">
            <div className="col-span-8 card">
                <div className="card-title"><TrendingUp size={20} color="#008FFB" /> Regional Market Price Trends</div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
                    Wholesale crop prices aggregated from local commodity marketplaces. Use these forecasts to advise your portfolio of farmers on optimal selling windows to maximize revenue.
                </p>

                <div style={{ height: '350px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2A3832" />
                            <XAxis dataKey="crop" stroke="#A0AEC0" tick={{ fontSize: 12 }} />
                            <YAxis stroke="#A0AEC0" tickFormatter={(v) => `₦${v}`} />
                            <Tooltip contentStyle={{ backgroundColor: '#1A2822', borderColor: '#2A3832' }} formatter={(val) => `₦${val}/bag`} />
                            <Legend />
                            <Line type="monotone" dataKey="Base" name="Base Price (₦)" stroke="#A0AEC0" strokeWidth={2} strokeDasharray="5 5" activeDot={{ r: 6 }} />
                            <Line type="monotone" dataKey="Current" name="Live Market Price (₦)" stroke="#00E396" strokeWidth={3} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="col-span-4 card">
                <div className="card-title"><BarChart3 size={20} color="#00E396" /> Live Commodity Rates</div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                    Current wholesale prices in local terminal markets (e.g. Dawanau Market).
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {prices.length > 0 ? (
                        prices.map((p, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: '10px' }}>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '1rem', color: '#fff' }}>{p.crop}</h4>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Baseline: ₦{p.base_price}/bag</span>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>₦{p.current_price}</span>
                                    <span style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'flex-end', color: p.change >= 0 ? '#00E396' : '#FF5630' }}>
                                        {p.change >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                        {p.change}%
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>Loading wholesale rates...</p>
                    )}
                </div>
            </div>
        </div>
    );
};
export default MarketIntel;
