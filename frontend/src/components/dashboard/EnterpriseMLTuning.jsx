import React, { useState, useEffect } from 'react';
import { Cpu, Activity, Play, CheckCircle2 } from 'lucide-react';
import API_BASE from '../../api';

const EnterpriseMLTuning = () => {
    const [mlRuns, setMlRuns] = useState([]);
    const [showLogs, setShowLogs] = useState(false);
    const [datasetSize, setDatasetSize] = useState(150000);
    const [modelType, setModelType] = useState('LSTM Rainfall Forecasting Model');
    const [training, setTraining] = useState(false);

    const fetchMLRuns = async () => {
        try {
            const res = await fetch(`${API_BASE}/api/ml-runs`);
            const data = await res.json();
            setMlRuns(data);
        } catch (err) {
            console.error("Error fetching ML runs:", err);
        }
    };

    useEffect(() => {
        fetchMLRuns();
    }, []);

    const triggerRetraining = async (e) => {
        e.preventDefault();
        setTraining(true);
        // Simulate training taking 1.5s
        setTimeout(async () => {
            try {
                const res = await fetch(`${API_BASE}/api/ml-runs`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        dataset_size: Number(datasetSize),
                        model_type: modelType
                    })
                });
                const data = await res.json();
                if (data.status === 'success') {
                    fetchMLRuns();
                    setShowLogs(true);
                }
            } catch (err) {
                console.error("Error triggering ML training:", err);
            } finally {
                setTraining(false);
            }
        }, 1500);
    };

    return (
        <div className="dash-grid dash-fade-in">
            <div className="col-span-12 card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '380px', padding: '40px 20px', flexDirection: 'column', textAlign: 'center', background: 'linear-gradient(135deg, rgba(15, 28, 21, 0.85), rgba(0, 0, 0, 0.95)), url("https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop") center/cover', position: 'relative', overflow: 'hidden', borderRadius: '12px' }}>
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Cpu size={48} color="#FFB020" style={{ marginBottom: '20px' }} />
                    <h2 style={{ fontSize: '2rem', color: '#fff' }}>Custom ML Model Operations (MLOps)</h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '600px', marginTop: '15px', marginBottom: '30px', fontSize: '1.1rem', lineHeight: '1.6' }}>
                        Bring your own historical yield datasets. Our MLOps pipeline will retrain and fine-tune our base proprietary agriculture models exclusively for your cooperative's localized genome requirements and proprietary soil data.
                    </p>
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <button onClick={() => setShowLogs(!showLogs)} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}>
                            <Activity size={18} /> {showLogs ? "Hide MLOps Logs" : "View Retraining Logs"}
                        </button>
                    </div>
                </div>
            </div>

            {/* MLOps Dashboard & Retrain Section */}
            <div className="col-span-6 card">
                <div className="card-title"><Cpu size={20} color="#FFB020" /> Retrain Base Models</div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                    Specify parameters to spawn a secure containerized training session within your private regional subnet.
                </p>
                <form onSubmit={triggerRetraining} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Model Architecture</label>
                        <select
                            value={modelType}
                            onChange={e => setModelType(e.target.value)}
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: 'white', fontFamily: 'inherit' }}
                        >
                            <option value="LSTM Rainfall Forecasting Model">LSTM Rainfall Forecasting Model (Time-series)</option>
                            <option value="XGBoost Crop Classifier">XGBoost Crop Classifier (Suitability)</option>
                            <option value="Prophet Rainfall Onset Estimator">Prophet Rainfall Onset Estimator (Onset Prediction)</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Training Sample Size (Row count)</label>
                        <input
                            type="number"
                            value={datasetSize}
                            onChange={e => setDatasetSize(e.target.value)}
                            min="10000"
                            step="10000"
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: 'white', fontFamily: 'inherit' }}
                            required
                        />
                    </div>
                    <button type="submit" disabled={training} className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #FFB020, #FF5630)', border: 'none', color: '#000', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', opacity: training ? 0.7 : 1 }}>
                        {training ? <Activity size={16} className="lucide-spin" /> : <Play size={16} />}
                        {training ? "Training Model in Sandbox..." : "Launch MLOps Pipeline"}
                    </button>
                </form>
            </div>

            {/* MLOps Training logs */}
            <div className="col-span-6 card">
                <div className="card-title"><Activity size={20} color="#FFB020" /> Pipeline Run History</div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                    Logs of custom weights fine-tuned for cooperative clusters.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '280px', overflowY: 'auto', paddingRight: '5px' }}>
                    {mlRuns.length > 0 ? (
                        mlRuns.map((run) => (
                            <div key={run.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#fff' }}>{run.model_type}</h4>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Dataset: {run.dataset_size.toLocaleString()} samples | {new Date(run.started_at).toLocaleDateString()}</span>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{ display: 'block', fontSize: '1rem', color: '#00E396', fontWeight: 600 }}>{run.accuracy}% Acc</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'flex-end' }}><CheckCircle2 size={12} color="#00E396" /> {run.status}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '25px' }}>No training runs recorded.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
export default EnterpriseMLTuning;
