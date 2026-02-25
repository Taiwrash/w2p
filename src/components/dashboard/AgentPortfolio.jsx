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

    const [farmerToPrint, setFarmerToPrint] = useState(null);

    const handlePrintClick = (farmer) => {
        setFarmerToPrint(farmer);
        setTimeout(() => {
            window.print();
        }, 100);
    };

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
            <div className="col-span-12 card no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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

            <div className="col-span-12 card no-print" style={{ overflowX: 'auto' }}>
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
                                    <button onClick={() => handlePrintClick(c)} style={{ background: 'rgba(0,143,251,0.1)', border: '1px solid #008FFB', color: '#008FFB', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><Printer size={14} /> Print Calendar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="no-print" style={{
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

            {/* Printable Custom Calendar View */}
            {farmerToPrint && (
                <div className="col-span-12 card print-card print-only">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="print-header">
                        <div className="card-title" style={{ margin: 0 }}>
                            <Printer size={20} color="#008FFB" className="print-icon-color" />
                            AI-Optimized Planting Strategy for {farmerToPrint.name}
                        </div>
                    </div>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '30px', marginTop: '15px' }}>
                        Dynamically generated timetable optimized for <strong>{farmerToPrint.location}</strong> footprint.<br />
                        <strong>Crop:</strong> {farmerToPrint.crop} | <strong>Scale:</strong> {farmerToPrint.acres} Acres | <strong>Contact:</strong> {farmerToPrint.phone}
                    </p>

                    <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', borderLeft: '4px solid #A0AEC0' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                    <span style={{ background: '#A0AEC0', color: '#000', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' }}>PHASE 1</span>
                                    <h4 style={{ fontSize: '1.2rem', color: '#fff', margin: 0 }}>Land Clearing & Prep</h4>
                                </div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '600px' }}>Prior to the forecasted onset of rains on Mar 15, clear acreage and prepare all {farmerToPrint.acres} acres. Deep plowing is recommended to aid moisture penetration in {farmerToPrint.location}.</p>
                            </div>
                            <div style={{ textAlign: 'right', minWidth: '150px' }}>
                                <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: 600, color: '#A0AEC0' }}>In Progress</span>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Mar 01 - Mar 10</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px', background: 'rgba(0,227,150,0.05)', borderRadius: '12px', borderLeft: '4px solid #00E396' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                    <span style={{ background: '#00E396', color: '#000', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' }}>PHASE 2</span>
                                    <h4 style={{ fontSize: '1.2rem', color: '#fff', margin: 0 }}>Sow {farmerToPrint.crop} Seeds</h4>
                                </div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '600px' }}>The AI identifies this as the optimal window for {farmerToPrint.crop}. The combined probability of sustained moisture exceeding evaporation rates hits the 95% threshold.</p>
                            </div>
                            <div style={{ textAlign: 'right', minWidth: '150px' }}>
                                <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: 600, color: '#00E396' }}>High Priority</span>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Mar 15 - Mar 20</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px', background: 'rgba(0,143,251,0.05)', borderRadius: '12px', borderLeft: '4px solid #008FFB' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                    <span style={{ background: '#008FFB', color: '#000', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' }}>PHASE 3</span>
                                    <h4 style={{ fontSize: '1.2rem', color: '#fff', margin: 0 }}>First Top-Dressing Fertilizer</h4>
                                </div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '600px' }}>Timed perfectly prior to the Week 3 predicted rain surge in {farmerToPrint.location}. This ensures maximum nutrient dissolution and root absorption.</p>
                            </div>
                            <div style={{ textAlign: 'right', minWidth: '150px' }}>
                                <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: 600, color: '#008FFB' }}>Scheduled</span>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Apr 05 - Apr 12</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default AgentPortfolio;
