import React from 'react';
import { Server, Key } from 'lucide-react';

const EnterpriseAPI = () => {
    return (
        <div className="dash-grid dash-fade-in">
            <div className="col-span-8 card">
                <div className="card-title"><Server size={20} color="#FFB020" /> API Gateway & Webhooks</div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                    Connect your massive internal datasets, proprietary CRM, or agricultural databases directly to the W2P Machine Learning models via high-throughput endpoints.
                </p>

                <div style={{ background: 'var(--bg-dark)', padding: '20px', borderRadius: '8px', border: '1px solid var(--glass-border)', fontFamily: 'monospace', color: '#A0AEC0', marginBottom: '20px', overflowX: 'auto' }}>
                    <div style={{ color: '#00E396', marginBottom: '10px' }}>POST /api/v2/predict/batch-yield</div>
                    {`{
  "api_key": "enterprise_prod_...",
  "polygons": [
    { "id": "poly_123", "coords": [...] },
    { "id": "poly_124", "coords": [...] }
  ],
  "models": ["lstm_precip", "random_forest_suitability"]
}`}
                </div>

                <div style={{ background: 'var(--bg-dark)', padding: '20px', borderRadius: '8px', border: '1px solid var(--glass-border)', fontFamily: 'monospace', color: '#A0AEC0', marginBottom: '20px', overflowX: 'auto' }}>
                    <div style={{ color: '#00E396', marginBottom: '10px' }}>WEBHOOK: POST /api/v2/webhooks/sms-delivery</div>
                    {`{
  "event": "sms.delivered",
  "data": {
    "farmer_id": "usr_94821",
    "timestamp": "2026-03-12T10:45:00Z",
    "status": "success"
  }
}`}
                </div>

                <button className="btn btn-primary" style={{ background: 'transparent', border: '1px solid #FFB020', color: '#FFB020' }}>
                    View API Documentation
                </button>
            </div>
            <div className="col-span-4 card">
                <div className="card-title"><Key size={20} color="#FFB020" /> Authentication</div>
                <div style={{ marginTop: '20px' }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Production Primary Key</label>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                        <input type="password" value="sk_pro_1234567890abcdef" readOnly style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: '#fff' }} />
                        <button className="btn btn-secondary" style={{ padding: '8px 12px' }}>Copy</button>
                    </div>
                </div>
                <div style={{ marginTop: '30px', padding: '15px', background: 'rgba(255, 176, 32, 0.05)', borderRadius: '8px', border: '1px solid rgba(255, 176, 32, 0.2)' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        Dedicated Account Manager: <br /><br />
                        <b>Aisha Temitope</b><br />
                        VP Enterprise Success<br />
                        aisha@w2p.africa<br />
                        +234 810 123 4567
                    </p>
                </div>
            </div>
        </div>
    );
};
export default EnterpriseAPI;
