import React, { useState, useEffect } from 'react';
import { Globe, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import API_BASE from '../../api';

const EnterpriseRegional = () => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/regional-summary`);
                const data = await res.json();
                setSummary(data);
            } catch (err) {
                console.error('Error fetching regional summary:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSummary();
    }, []);

    const chartData = summary?.zones?.map(z => ({
        region:        z.region,
        Acreage:       z.total_acreage,
        'Risk Score':  z.risk_score,
        Clients:       z.client_count,
    })) ?? [];

    return (
        <div className="dash-grid dash-fade-in">
            <div className="col-span-12 card" style={{ background: 'linear-gradient(135deg, rgba(255, 176, 32, 0.1), rgba(0,0,0,0))' }}>
                <div className="card-title"><Globe size={20} color="#FFB020" /> Macro-Level Yield Aggregation</div>
                <p style={{ color: 'var(--text-muted)' }}>
                    {loading
                        ? 'Loading live regional data...'
                        : `Aggregating data from ${summary?.total_agents ?? 0} connected agents across ${summary?.zones?.length ?? 0} deployment zones.`}
                </p>
            </div>

            <div className="col-span-4 card">
                <div className="card-title">Total Monitored Acreage</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#fff', margin: '15px 0' }}>
                    {loading ? <Activity size={28} className="lucide-spin" /> : (summary?.total_acreage ?? 0).toLocaleString()}
                    <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}> acres</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    Aggregated from all enrolled client farms.
                </p>
            </div>

            <div className="col-span-4 card">
                <div className="card-title">Critical Risk Zone</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#FF5630', margin: '15px 0' }}>
                    {loading ? <Activity size={28} className="lucide-spin" /> : (summary?.critical_region ?? 'N/A')}
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    Highest AI-computed yield risk score across monitored zones.
                </p>
            </div>

            <div className="col-span-4 card">
                <div className="card-title">Active Agents</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#00E396', margin: '15px 0' }}>
                    {loading ? <Activity size={28} className="lucide-spin" /> : (summary?.total_agents ?? 0)}
                    <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}> Agents</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    Agents with enrolled client farmers.
                </p>
            </div>

            <div className="col-span-12 card">
                <h3 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Regional Vulnerability Index</h3>
                {chartData.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>
                        {loading ? 'Loading...' : 'No regional data yet. Enroll clients with locations to generate zone metrics.'}
                    </p>
                ) : (
                    <div style={{ height: '350px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2A3832" />
                                <XAxis dataKey="region" stroke="#A0AEC0" tick={{ fontSize: 12 }} />
                                <YAxis yAxisId="left" orientation="left" stroke="#A0AEC0" />
                                <YAxis yAxisId="right" orientation="right" stroke="#FF5630" />
                                <Tooltip contentStyle={{ backgroundColor: '#1A2822', borderColor: '#2A3832' }} />
                                <Legend />
                                <Bar yAxisId="left" dataKey="Clients" name="Client Farmers" fill="#FFB020" radius={[4, 4, 0, 0]} />
                                <Bar yAxisId="right" dataKey="Risk Score" name="AI Risk Severity (%)" fill="#FF5630" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
};
export default EnterpriseRegional;
