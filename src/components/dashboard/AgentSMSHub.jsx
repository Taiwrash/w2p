import React from 'react';
import { MessageSquare, Settings2, CheckCircle2 } from 'lucide-react';

const AgentSMSHub = () => {
    return (
        <div className="dash-grid dash-fade-in">
            <div className="col-span-8 card">
                <div className="card-title"><MessageSquare size={20} color="#008FFB" /> Auto-SMS Dispatch Hub</div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                    W2P AI automatically drafts vernacular SMS alerts based on weather anomalies affecting your clients' registered polygons.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span style={{ fontSize: '0.8rem', color: '#FF5630', background: 'rgba(255,86,48,0.1)', padding: '4px 8px', borderRadius: '4px', fontWeight: 600 }}>URGENT ALERT (Hausa)</span>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Sent: 2 hours ago</span>
                        </div>
                        <p style={{ color: '#fff', lineHeight: '1.4', marginBottom: '10px', fontStyle: 'italic' }}>
                            "W2P: An yi hasashen ruwan sama da iska mai karfi a Kano gobe. Da fatan za a tabbatar an kare amfanin gona da ke da rauni."
                        </p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Translation: W2P: Heavy rainfall and wind predicted in Kano tomorrow. Please ensure vulnerable crops are protected.</p>
                        <div style={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '8px', color: '#00E396', fontSize: '0.85rem', fontWeight: 600 }}>
                            <CheckCircle2 size={14} /> Delivered to 14 farmers in Kano Cluster
                        </div>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span style={{ fontSize: '0.8rem', color: '#008FFB', background: 'rgba(0,143,251,0.1)', padding: '4px 8px', borderRadius: '4px', fontWeight: 600 }}>PLANTING ADVISORY (English)</span>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Scheduled: Tomorrow 06:00 AM</span>
                        </div>
                        <p style={{ color: '#fff', lineHeight: '1.4', marginBottom: '10px', fontStyle: 'italic' }}>
                            "W2P: Soil moisture in Enugu has reached optimal 45%. Recommended to begin top-dressing fertilizer application today."
                        </p>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            Pending dispatch to 8 farmers in Enugu Cluster
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-span-4 card">
                <div className="card-title">Dispatch Quota</div>
                <div style={{ fontSize: '3rem', fontWeight: 700, color: '#008FFB', margin: '15px 0' }}>482<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}> / 1000</span></div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>SMS messages sent this month.</p>
                <div style={{ height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', marginBottom: '20px' }}>
                    <div style={{ width: '48.2%', height: '100%', background: '#008FFB', borderRadius: '5px' }}></div>
                </div>
                <button className="btn btn-secondary" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center' }}>
                    <Settings2 size={16} /> Configure Auto-Rules
                </button>
            </div>
        </div>
    );
};
export default AgentSMSHub;
