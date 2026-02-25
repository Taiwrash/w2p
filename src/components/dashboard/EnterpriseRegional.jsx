import React from 'react';
import { Globe } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
    { region: 'Northern Zone', totalAcreage: 15000, riskScore: 35 },
    { region: 'Central Belt', totalAcreage: 22000, riskScore: 12 },
    { region: 'Southern Rivers', totalAcreage: 8500, riskScore: 65 },
    { region: 'Eastern Highlands', totalAcreage: 12400, riskScore: 22 },
];

const EnterpriseRegional = () => {
    return (
        <div className="dash-grid dash-fade-in">
            <div className="col-span-12 card" style={{ background: 'linear-gradient(135deg, rgba(255, 176, 32, 0.1), rgba(0,0,0,0))' }}>
                <div className="card-title"><Globe size={20} color="#FFB020" /> Macro-Level Yield Aggregation</div>
                <p style={{ color: 'var(--text-muted)' }}>
                    Aggregating data from 12,400+ connected farmers. Monitor systemic climate risks across deployment zones.
                </p>
            </div>

            <div className="col-span-4 card">
                <div className="card-title">Total Monitored Acreage</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#fff', margin: '15px 0' }}>57,900<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}> acres</span></div>
            </div>

            <div className="col-span-4 card">
                <div className="card-title">Critical Drought Alert</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#FF5630', margin: '15px 0' }}>Southern</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>High risk of monsoon failure detected.</p>
            </div>

            <div className="col-span-4 card">
                <div className="card-title">Deployments</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#00E396', margin: '15px 0' }}>142<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}> Agents</span></div>
            </div>

            <div className="col-span-12 card">
                <h3 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Regional Vulnerability Index</h3>
                <div style={{ height: '350px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2A3832" />
                            <XAxis dataKey="region" stroke="#A0AEC0" />
                            <YAxis yAxisId="left" orientation="left" stroke="#A0AEC0" />
                            <YAxis yAxisId="right" orientation="right" stroke="#FF5630" />
                            <Tooltip contentStyle={{ backgroundColor: '#1A2822', borderColor: '#2A3832' }} />
                            <Legend />
                            <Bar yAxisId="left" dataKey="totalAcreage" name="Monitored Acreage" fill="#FFB020" radius={[4, 4, 0, 0]} />
                            <Bar yAxisId="right" dataKey="riskScore" name="AI Risk Severity (%)" fill="#FF5630" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
export default EnterpriseRegional;
