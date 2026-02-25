import React, { useState, useEffect } from 'react';
import { Home, CloudRain, Sprout, Settings, LogOut, MapPin, Calendar, Navigation, CreditCard, Users, MessageSquare, TrendingUp, Globe, Server, Cpu } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

// Import split components
import Overview from '../components/dashboard/Overview';
import FarmSetup from '../components/dashboard/FarmSetup';
import ClimateForecast from '../components/dashboard/ClimateForecast';
import ActionPlan from '../components/dashboard/ActionPlan';

import AgentPortfolio from '../components/dashboard/AgentPortfolio';
import AgentSMSHub from '../components/dashboard/AgentSMSHub';
import MarketIntel from '../components/dashboard/MarketIntel';

import EnterpriseRegional from '../components/dashboard/EnterpriseRegional';
import EnterpriseAPI from '../components/dashboard/EnterpriseAPI';
import EnterpriseMLTuning from '../components/dashboard/EnterpriseMLTuning';

import Preferences from '../components/dashboard/Preferences';
import Billing from '../components/dashboard/Billing';

// Mock ML Data constants passed down as props
const rainfallForecast = [
    { date: 'Mar 01', lstmPredict: 12, historical: 10, confidence: 90 },
    { date: 'Mar 08', lstmPredict: 25, historical: 18, confidence: 85 },
    { date: 'Mar 15', lstmPredict: 45, historical: 35, confidence: 88 },
    { date: 'Mar 22', lstmPredict: 50, historical: 40, confidence: 82 },
    { date: 'Mar 29', lstmPredict: 30, historical: 45, confidence: 75 },
    { date: 'Apr 05', lstmPredict: 15, historical: 30, confidence: 70 },
    { date: 'Apr 12', lstmPredict: 8, historical: 20, confidence: 65 },
];

const cropSuitability = [
    { name: 'Maize (Drought-Resistant)', likelihood: 92, risk: 8, fill: '#00E396' },
    { name: 'Sorghum', likelihood: 85, risk: 15, fill: '#008FFB' },
    { name: 'Cassava', likelihood: 78, risk: 22, fill: '#FFB020' },
    { name: 'Beans', likelihood: 65, risk: 35, fill: '#FF5630' },
    { name: 'Millet', likelihood: 50, risk: 50, fill: '#8A2BE2' }
];

const yieldProjections = [
    { stage: 'Germination', projectedRisk: 12, historicalRisk: 25 },
    { stage: 'Vegetative', projectedRisk: 18, historicalRisk: 30 },
    { stage: 'Flowering', projectedRisk: 35, historicalRisk: 50 },
    { stage: 'Yield Formation', projectedRisk: 20, historicalRisk: 40 },
    { stage: 'Ripening', projectedRisk: 10, historicalRisk: 15 },
];

const Dashboard = () => {
    const location = useLocation();

    // Convert role into React state so upgrading in billing tab triggers re-render
    const [activeRole, setActiveRole] = useState(location.state?.role || 'farmer');

    // Persist role changes for the hackathon demo so it doesn't reset when logged out
    useEffect(() => {
        localStorage.setItem('w2p_role', activeRole);
    }, [activeRole]);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    // Farm State Shared Inputs
    const [farmLocation, setFarmLocation] = useState({ lat: -1.2921, lng: 36.8219 });
    const [farmArea, setFarmArea] = useState(5.0);
    const [soilType, setSoilType] = useState('Loam');
    const [waterSource, setWaterSource] = useState('Rainfed');
    const [selectedCrop, setSelectedCrop] = useState('Maize (Drought-Resistant)');

    // UI State
    const [analyzing, setAnalyzing] = useState(false);

    const handleNav = (e, tab) => {
        if (e) e.preventDefault();
        setActiveTab(tab);
        setSidebarOpen(false);
    };

    const triggerAnalysis = () => {
        setAnalyzing(true);
        setTimeout(() => {
            setAnalyzing(false);
            setActiveTab('overview');
        }, 1500);
    };

    const handleRoleChange = (role) => {
        setActiveRole(role);
        setActiveTab(role === 'farmer' ? 'overview' : role === 'agent' ? 'portfolio' : 'regional');
    };

    const renderContent = () => {
        switch (activeTab) {
            // Farmer
            case 'overview':
                return <Overview
                    selectedCrop={selectedCrop}
                    farmArea={farmArea}
                    soilType={soilType}
                    waterSource={waterSource}
                    cropSuitability={cropSuitability}
                    yieldProjections={yieldProjections}
                    handleNav={handleNav}
                />;
            case 'map':
                return <FarmSetup
                    farmLocation={farmLocation}
                    setFarmLocation={setFarmLocation}
                    farmArea={farmArea}
                    setFarmArea={setFarmArea}
                    soilType={soilType}
                    setSoilType={setSoilType}
                    waterSource={waterSource}
                    setWaterSource={setWaterSource}
                    analyzing={analyzing}
                    triggerAnalysis={triggerAnalysis}
                />;
            case 'climate':
                return <ClimateForecast
                    soilType={soilType}
                    rainfallForecast={rainfallForecast}
                />;
            case 'planner':
                return <ActionPlan
                    farmLocation={farmLocation}
                    waterSource={waterSource}
                    selectedCrop={selectedCrop}
                    setSelectedCrop={setSelectedCrop}
                    cropSuitability={cropSuitability}
                    soilType={soilType}
                />;

            // Agent
            case 'portfolio': return <AgentPortfolio />;
            case 'sms_hub': return <AgentSMSHub />;
            case 'market_intel': return <MarketIntel />;

            // Enterprise
            case 'regional': return <EnterpriseRegional />;
            case 'api': return <EnterpriseAPI />;
            case 'ml_tuning': return <EnterpriseMLTuning />;

            // Shared
            case 'settings':
                return <Preferences
                    selectedCrop={selectedCrop}
                    farmLocation={farmLocation}
                    farmArea={farmArea}
                    soilType={soilType}
                    waterSource={waterSource}
                    handleNav={handleNav}
                />;
            case 'billing':
                return <Billing
                    activeRole={activeRole}
                    setActiveRole={handleRoleChange}
                />;
            default: return null;
        }
    };

    return (
        <div className="app-layout">
            <aside className={`sidebar ${sidebarOpen ? 'mobile-open' : ''}`}>
                <div className="sidebar-logo">
                    <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#00E396' }}>W2P Dashboard</span>
                </div>
                <nav className="sidebar-nav">
                    {activeRole === 'farmer' && (
                        <>
                            <a href="#" className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={(e) => handleNav(e, 'overview')}><Home size={20} /> <span>Farm Intelligence</span></a>
                            <a href="#" className={`nav-item ${activeTab === 'map' ? 'active' : ''}`} onClick={(e) => handleNav(e, 'map')}><Navigation size={20} /> <span>Farm Setup</span></a>
                            <a href="#" className={`nav-item ${activeTab === 'climate' ? 'active' : ''}`} onClick={(e) => handleNav(e, 'climate')}><CloudRain size={20} /> <span>Climate Forecast</span></a>
                            <a href="#" className={`nav-item ${activeTab === 'planner' ? 'active' : ''}`} onClick={(e) => handleNav(e, 'planner')}><Calendar size={20} /> <span>Action Plan</span></a>
                        </>
                    )}
                    {activeRole === 'agent' && (
                        <>
                            <a href="#" className={`nav-item ${activeTab === 'portfolio' ? 'active' : ''}`} onClick={(e) => handleNav(e, 'portfolio')}><Users size={20} /> <span>Client Portfolio</span></a>
                            <a href="#" className={`nav-item ${activeTab === 'sms_hub' ? 'active' : ''}`} onClick={(e) => handleNav(e, 'sms_hub')}><MessageSquare size={20} /> <span>SMS Hub</span></a>
                            <a href="#" className={`nav-item ${activeTab === 'market_intel' ? 'active' : ''}`} onClick={(e) => handleNav(e, 'market_intel')}><TrendingUp size={20} /> <span>Market Intel</span></a>
                        </>
                    )}
                    {activeRole === 'enterprise' && (
                        <>
                            <a href="#" className={`nav-item ${activeTab === 'regional' ? 'active' : ''}`} onClick={(e) => handleNav(e, 'regional')}><Globe size={20} /> <span>Regional Macro</span></a>
                            <a href="#" className={`nav-item ${activeTab === 'api' ? 'active' : ''}`} onClick={(e) => handleNav(e, 'api')}><Server size={20} /> <span>API & Webhooks</span></a>
                            <a href="#" className={`nav-item ${activeTab === 'ml_tuning' ? 'active' : ''}`} onClick={(e) => handleNav(e, 'ml_tuning')}><Cpu size={20} /> <span>Custom MLOps</span></a>
                        </>
                    )}

                    <div style={{ height: '1px', background: 'var(--glass-border)', margin: '10px 0' }}></div>
                    <a href="#" className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={(e) => handleNav(e, 'settings')}><Settings size={20} /> <span>Settings</span></a>
                    <a href="#" className={`nav-item ${activeTab === 'billing' ? 'active' : ''}`} onClick={(e) => handleNav(e, 'billing')} style={{ color: activeTab === 'billing' ? '#fff' : '#A0AEC0' }}><CreditCard size={20} /> <span>Billing & Upgrades</span></a>
                </nav>
                <div style={{ marginTop: 'auto' }}>
                    <Link to="/" className="nav-item" style={{ color: '#FF5630', textDecoration: 'none' }}>
                        <LogOut size={20} /> <span>Exit App</span>
                    </Link>
                </div>
            </aside>

            <main className="dashboard-main">
                <div className="dash-header">
                    <div className="flex-header">
                        <button className="mobile-menu-btn" style={{ display: 'none' }} onClick={() => setSidebarOpen(true)}>Menu</button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <h1>
                                {activeTab === 'map' && 'Farm Parameter Setup'}
                                {activeTab === 'climate' && 'Meteorological Deep Dive'}
                                {activeTab === 'planner' && 'AI Actionable Output'}
                                {activeTab === 'settings' && 'User Preferences'}
                                {activeTab === 'overview' && 'Farm ML Intelligence'}
                            </h1>
                            {activeRole === 'agent' && <span style={{ background: 'linear-gradient(135deg, #008FFB, #00C6FF)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600, color: '#fff' }}>Local Merchant Agent Mode</span>}
                            {activeRole === 'enterprise' && <span style={{ background: 'linear-gradient(135deg, #FFB020, #FF5630)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600, color: '#fff' }}>Corporate / Gov View</span>}
                        </div>
                        <p>
                            {/* Farmer Texts */}
                            {activeTab === 'map' && 'Pinpoint coordinates and physical traits for micro-climate sync.'}
                            {activeTab === 'climate' && 'Detailed time-series forecasting and weather anomalies.'}
                            {activeTab === 'planner' && `Generated calendar specifically adapted for ${soilType} conditions.`}
                            {activeTab === 'overview' && 'Your centralized precision agriculture overview.'}

                            {/* Agent Texts */}
                            {activeTab === 'portfolio' && 'Manage offline farmers and print advisory schedules.'}
                            {activeTab === 'sms_hub' && 'Automated local-dialect SMS dispatch monitoring.'}
                            {activeTab === 'market_intel' && 'Local wholesale market pricing to guide harvest timing.'}

                            {/* Enterprise Texts */}
                            {activeTab === 'regional' && 'Macro-vulnerability indices across all deployment regions.'}
                            {activeTab === 'api' && 'Secure access endpoints for programmatic ML yield extraction.'}
                            {activeTab === 'ml_tuning' && 'Retrain specific deep learning models using localized data lakes.'}

                            {/* Shared Texts */}
                            {activeTab === 'settings' && 'Manage localized SMS messaging and profile tracking.'}
                            {activeTab === 'billing' && 'Scale your access to the W2P Agritech ecosystem.'}
                        </p>
                    </div>
                    <div className="user-profile" style={{ cursor: 'pointer' }} onClick={(e) => handleNav(e, 'map')}>
                        <MapPin size={18} color={activeTab === 'map' ? '#FFB020' : '#00E396'} />
                        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{farmLocation.lat.toFixed(3)}, {farmLocation.lng.toFixed(3)}</span>
                        <div className="avatar">P</div>
                    </div>
                </div>

                {renderContent()}

            </main>
        </div>
    );
};

export default Dashboard;
