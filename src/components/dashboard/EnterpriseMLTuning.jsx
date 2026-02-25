import React from 'react';
import { Cpu, Activity } from 'lucide-react';

const EnterpriseMLTuning = () => {
    return (
        <div className="dash-grid dash-fade-in">
            <div className="col-span-12 card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px', flexDirection: 'column', textAlign: 'center', background: 'url("https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop") center/cover', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 28, 21, 0.85)' }}></div>
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Cpu size={48} color="#FFB020" style={{ marginBottom: '20px' }} />
                    <h2 style={{ fontSize: '2rem' }}>Custom ML Model Operations (MLOps)</h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '600px', marginTop: '15px', marginBottom: '30px', fontSize: '1.1rem', lineHeight: '1.6' }}>
                        Bring your own historical yield datasets. Our MLOps pipeline will retrain and fine-tune our base proprietary agriculture models exclusively for your cooperative's localized genome requirements and proprietary soil data.
                    </p>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <button className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #FFB020, #FF5630)', color: '#000', border: 'none', padding: '12px 24px', fontWeight: 'bold' }}>
                            Connect AWS S3 Bucket
                        </button>
                        <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}>
                            <Activity size={18} /> View Retraining Logs
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default EnterpriseMLTuning;
