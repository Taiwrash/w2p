import React from 'react';
import { TrendingUp, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
    { week: 'Week 1', maize: 1200, sorghum: 900 },
    { week: 'Week 2', maize: 1250, sorghum: 880 },
    { week: 'Week 3', maize: 1400, sorghum: 950 },
    { week: 'Week 4', maize: 1350, sorghum: 920 },
    { week: 'Week 5', maize: 1500, sorghum: 1100 },
];

const MarketIntel = () => {
    return (
        <div className="dash-grid dash-fade-in">
            <div className="col-span-12 card">
                <div className="card-title"><TrendingUp size={20} color="#008FFB" /> Regional Market Intel</div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
                    Wholesale crop prices aggregated from local commodity marketplaces. Use these forecasts to advise your portfolio of farmers on optimal selling windows to maximize revenue.
                </p>

                <div style={{ height: '350px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2A3832" />
                            <XAxis dataKey="week" stroke="#A0AEC0" />
                            <YAxis stroke="#A0AEC0" tickFormatter={(v) => `₦${v}`} />
                            <Tooltip contentStyle={{ backgroundColor: '#1A2822', borderColor: '#2A3832' }} formatter={(val) => `₦${val}/bag`} />
                            <Legend />
                            <Line type="monotone" dataKey="maize" name="Maize Price (Naira)" stroke="#00E396" strokeWidth={3} activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="sorghum" name="Sorghum Price (Naira)" stroke="#008FFB" strokeWidth={3} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
export default MarketIntel;
