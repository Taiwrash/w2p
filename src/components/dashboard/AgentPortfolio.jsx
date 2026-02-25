import React, { useState } from 'react';
import { Users, UserPlus, Phone, Printer, MapPin, X } from 'lucide-react';

const AgentPortfolio = () => {
    // Convert clients to state to allow adding new ones
    const [clients, setClients] = useState([
        { name: "Ojo Adebayo", phone: "+234 801 234 5678", crop: "Maize", location: "Kano, NG", acres: 5, status: "Active SMS" },
        { name: "Fatima Yusuf", phone: "+234 802 345 6789", crop: "Sorghum", location: "Kaduna, NG", acres: 12, status: "Active SMS" },
        { name: "Chidi Okafor", phone: "Offline / Print-Only", crop: "Cassava", location: "Enugu, NG", acres: 3, status: "Print Delivery" },
        { name: "Amaka Nnwoke", phone: "+234 804 567 8901", crop: "Maize", location: "Oyo, NG", acres: 8, status: "Active SMS" },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newFarmerName, setNewFarmerName] = useState('');
    const [newFarmerPhone, setNewFarmerPhone] = useState('');
    const [newFarmerCrop, setNewFarmerCrop] = useState('');
    const [newFarmerLocation, setNewFarmerLocation] = useState('');
    const [newFarmerAcres, setNewFarmerAcres] = useState('');

    const handleEnrollSubmit = (e) => {
        e.preventDefault();
        if (!newFarmerName || !newFarmerPhone) return;

        const newFarmer = {
            name: newFarmerName,
            phone: newFarmerPhone.toLowerCase() === 'offline' ? "Offline / Print-Only" : newFarmerPhone,
            crop: newFarmerCrop || "Unassigned",
            location: newFarmerLocation || "Pending Setup",
            acres: newFarmerAcres || 0,
            status: newFarmerPhone.toLowerCase() === 'offline' ? "Print Delivery" : "Pending Setup"
        };

        setClients([newFarmer, ...clients]);
        setIsModalOpen(false);
        setNewFarmerName('');
        setNewFarmerPhone('');
        setNewFarmerCrop('');
        setNewFarmerLocation('');
        setNewFarmerAcres('');
    };

    return (
        <div className="dash-grid dash-fade-in">
            <div className="col-span-12 card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <div className="card-title" style={{ margin: 0 }}><Users size={20} color="#008FFB" /> Client Farmer Portfolio</div>
                    <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>Managing {clients.length} / 50 Subscribed Farmers</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn btn-primary"
                    style={{ background: 'linear-gradient(135deg, #008FFB, #00C6FF)', border: 'none', color: '#fff', cursor: 'pointer' }}
                >
                    <UserPlus size={16} style={{ display: 'inline', marginRight: '6px' }} /> Enroll New Farmer
                </button>
            </div>

            <div className="col-span-12 card" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                            <th style={{ padding: '12px 10px' }}>Farmer Name</th>
                            <th style={{ padding: '12px 10px' }}>Contact</th>
                            <th style={{ padding: '12px 10px' }}>Crop / Scale</th>
                            <th style={{ padding: '12px 10px' }}>Advisory Mode</th>
                            <th style={{ padding: '12px 10px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((c, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <td style={{ padding: '16px 10px', color: '#fff', fontWeight: 600 }}>{c.name}<br /><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 400 }}>{c.location}</span></td>
                                <td style={{ padding: '16px 10px', color: 'var(--text-muted)' }}><Phone size={14} style={{ display: 'inline', marginRight: '5px' }} />{c.phone}</td>
                                <td style={{ padding: '16px 10px', color: 'var(--text-muted)' }}>{c.crop} <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem', marginLeft: '8px' }}>{c.acres} Acres</span></td>
                                <td style={{ padding: '16px 10px' }}>
                                    <span style={{ color: c.status.includes('SMS') ? '#00E396' : '#FFB020', background: c.status.includes('SMS') ? 'rgba(0,227,150,0.1)' : 'rgba(255,176,32,0.1)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600 }}>
                                        {c.status}
                                    </span>
                                </td>
                                <td style={{ padding: '16px 10px', display: 'flex', gap: '10px' }}>
                                    <button style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: '#fff', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={14} /> Profile</button>
                                    <button style={{ background: 'rgba(0,143,251,0.1)', border: '1px solid #008FFB', color: '#008FFB', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><Printer size={14} /> Print Calendar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div className="card dash-fade-in" style={{ width: '100%', maxWidth: '500px', padding: '30px', position: 'relative' }}>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                        >
                            <X size={20} />
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                            <div style={{ background: 'rgba(0, 143, 251, 0.1)', padding: '10px', borderRadius: '10px' }}>
                                <UserPlus size={24} color="#008FFB" />
                            </div>
                            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Enroll New Farmer</h3>
                        </div>

                        <form onSubmit={handleEnrollSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter farmer's name"
                                    value={newFarmerName}
                                    onChange={(e) => setNewFarmerName(e.target.value)}
                                    required
                                    style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: '#fff', outline: 'none' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Phone Number</label>
                                <input
                                    type="text"
                                    placeholder="+234... or type 'offline'"
                                    value={newFarmerPhone}
                                    onChange={(e) => setNewFarmerPhone(e.target.value)}
                                    required
                                    style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: '#fff', outline: 'none' }}
                                />
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>If the farmer has no phone, type 'offline' to activate Print Delivery mode.</p>
                            </div>

                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Location</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Kano, NG"
                                        value={newFarmerLocation}
                                        onChange={(e) => setNewFarmerLocation(e.target.value)}
                                        style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: '#fff', outline: 'none' }}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Crop</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Maize"
                                        value={newFarmerCrop}
                                        onChange={(e) => setNewFarmerCrop(e.target.value)}
                                        style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: '#fff', outline: 'none' }}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Acres</label>
                                    <input
                                        type="number"
                                        placeholder="e.g. 5"
                                        value={newFarmerAcres}
                                        onChange={(e) => setNewFarmerAcres(e.target.value)}
                                        style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: '#fff', outline: 'none' }}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ background: '#008FFB', border: 'none', width: '100%', marginTop: '10px' }}>
                                Complete Enrollment
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
export default AgentPortfolio;
