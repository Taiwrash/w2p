import React, { useState, useEffect } from 'react';
import { MessageSquare, Settings2, CheckCircle2, Send, Activity } from 'lucide-react';
import API_BASE from '../../api';

const AgentSMSHub = () => {
    const [smsLogs, setSmsLogs] = useState([]);
    const [clientName, setClientName] = useState('');
    const [phone, setPhone] = useState('');
    const [messageText, setMessageText] = useState('');
    const [sending, setSending] = useState(false);

    const fetchSMSLogs = async () => {
        try {
            const res = await fetch(`${API_BASE}/api/sms-logs`);
            const data = await res.json();
            setSmsLogs(data);
        } catch (err) {
            console.error("Error loading SMS logs:", err);
        }
    };

    useEffect(() => {
        fetchSMSLogs();
    }, []);

    const handleSendSMS = async (e) => {
        e.preventDefault();
        if (!clientName || !messageText) return;

        setSending(true);
        try {
            const res = await fetch(`${API_BASE}/api/sms`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    client_name: clientName,
                    phone: phone,
                    message: messageText
                })
            });
            const data = await res.json();
            if (data.status === 'success') {
                setMessageText('');
                fetchSMSLogs();
            }
        } catch (err) {
            console.error("Error sending SMS:", err);
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="dash-grid dash-fade-in">
            <div className="col-span-8 card">
                <div className="card-title"><MessageSquare size={20} color="#008FFB" /> Vernacular SMS Dispatch Hub</div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                    W2P AI automatically drafts vernacular SMS alerts based on weather anomalies affecting your clients' registered polygons. Use the console below to send custom translated updates.
                </p>

                {/* Send SMS Form */}
                <form onSubmit={handleSendSMS} style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid var(--glass-border)', marginBottom: '25px' }}>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Target Group / Cluster</label>
                            <input
                                type="text"
                                value={clientName}
                                onChange={e => setClientName(e.target.value)}
                                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: 'white', fontSize: '0.9rem', outline: 'none' }}
                                placeholder="e.g. Kano Cluster"
                                required
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Contact Phone</label>
                            <input
                                type="text"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: 'white', fontSize: '0.9rem', outline: 'none' }}
                                placeholder="e.g. +234 801 234 5678"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>English Message (Will be auto-translated to Hausa dialect via Gemini)</label>
                        <textarea
                            value={messageText}
                            onChange={e => setMessageText(e.target.value)}
                            rows={3}
                            style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: 'white', fontSize: '0.9rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                            placeholder="Type advisory details..."
                            required
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button type="submit" disabled={sending} className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #008FFB, #00C6FF)', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', opacity: sending ? 0.7 : 1 }}>
                            {sending ? <Activity size={16} className="lucide-spin" /> : <Send size={16} />}
                            {sending ? "Translating & Dispatching..." : "Send AI Vernacular SMS"}
                        </button>
                    </div>
                </form>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {smsLogs.length > 0 ? (
                        smsLogs.map((log) => (
                            <div key={log.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <span style={{ fontSize: '0.8rem', color: '#008FFB', background: 'rgba(0,143,251,0.1)', padding: '4px 8px', borderRadius: '4px', fontWeight: 600 }}>{log.client_name}</span>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Sent: {new Date(log.sent_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                </div>
                                <p style={{ color: '#fff', lineHeight: '1.4', marginBottom: '10px', fontStyle: 'italic', fontSize: '0.95rem' }}>
                                    "{log.message}"
                                </p>
                                <div style={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '8px', color: '#00E396', fontSize: '0.85rem', fontWeight: 600 }}>
                                    <CheckCircle2 size={14} /> Delivered successfully to {log.phone}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>No sent SMS logs found.</p>
                    )}
                </div>
            </div>

            <div className="col-span-4 card">
                <div className="card-title">Dispatch Quota</div>
                <div style={{ fontSize: '3rem', fontWeight: 700, color: '#008FFB', margin: '15px 0' }}>
                    {smsLogs.length}
                    <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}> / ∞</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>SMS messages dispatched via this account.</p>
                <div style={{ height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', marginBottom: '20px' }}>
                    <div style={{ width: `${Math.min(100, (smsLogs.length / 100) * 100)}%`, height: '100%', background: '#008FFB', borderRadius: '5px' }}></div>
                </div>
                <button className="btn btn-secondary" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center' }}>
                    <Settings2 size={16} /> Configure Auto-Rules
                </button>
            </div>
        </div>
    );
};
export default AgentSMSHub;
