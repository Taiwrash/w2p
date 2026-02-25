import React, { useState } from 'react';
import { Phone, Delete } from 'lucide-react';

const USSDPhone = () => {
    const [screenState, setScreenState] = useState('idle'); // idle, typing, menu, weather, calendar, market
    const [inputText, setInputText] = useState('');

    const handleKeyPress = (key) => {
        if (screenState === 'idle') {
            setScreenState('typing');
            setInputText(key);
        } else if (screenState === 'typing') {
            setInputText(prev => prev + key);
        } else if (screenState === 'menu') {
            if (key === '1') setScreenState('weather');
            if (key === '2') setScreenState('calendar');
            if (key === '3') setScreenState('market');
            if (key === '0') setScreenState('idle'); // Close
        } else if (['weather', 'calendar', 'market'].includes(screenState)) {
            if (key === '0') setScreenState('menu');
        }
    };

    const handleCall = () => {
        if (screenState === 'typing' && inputText === '*829#') {
            setScreenState('menu');
            setInputText('');
        }
    };

    const handleDelete = () => {
        if (screenState === 'typing') {
            setInputText(prev => prev.slice(0, -1));
            if (inputText.length <= 1) {
                setScreenState('idle');
            }
        } else if (screenState === 'menu') {
            setScreenState('idle');
        } else if (['weather', 'calendar', 'market'].includes(screenState)) {
            setScreenState('menu');
        }
    };

    const renderScreen = () => {
        switch (screenState) {
            case 'idle':
                return (
                    <div style={{ textAlign: 'center', paddingTop: '20px' }}>
                        <div style={{ fontSize: '0.8rem', marginBottom: '30px' }}>12:45 PM</div>
                        <div>W2P Network</div>
                        <div style={{ fontSize: '0.7rem', marginTop: '10px', color: '#333' }}>Dial *829#</div>
                    </div>
                );
            case 'typing':
                return (
                    <div style={{ textAlign: 'center', paddingTop: '40px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                        {inputText}
                    </div>
                );
            case 'menu':
                return (
                    <div style={{ padding: '10px', fontSize: '0.85rem', lineHeight: '1.6' }}>
                        <b>W2P Agric AI</b><br />
                        1. Weather Alert<br />
                        2. Planting Calendar<br />
                        3. Market Prices<br />
                        0. Exit
                    </div>
                );
            case 'weather':
                return (
                    <div style={{ padding: '10px', fontSize: '0.85rem', lineHeight: '1.4' }}>
                        <b>Location: Kano</b><br />
                        Heavy rain expected tomorrow. 90% probability.<br />
                        Action: Ensure drainage is clear.<br />
                        0. Back
                    </div>
                );
            case 'calendar':
                return (
                    <div style={{ padding: '10px', fontSize: '0.85rem', lineHeight: '1.4' }}>
                        <b>Crop: Maize</b><br />
                        Soil moisture optimal.<br />
                        Plant within next 48hrs to maximize 92% yield window.<br />
                        0. Back
                    </div>
                );
            case 'market':
                return (
                    <div style={{ padding: '10px', fontSize: '0.85rem', lineHeight: '1.4' }}>
                        <b>Intel: Maize Wholesale</b><br />
                        Current: ₦1,200/bag<br />
                        1Wk Forecast: ₦1,350/bag<br />
                        Rec: Hold crop.<br />
                        0. Back
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{
            width: '240px',
            height: '460px',
            background: '#1a1a1a',
            borderRadius: '30px',
            border: '2px solid #333',
            padding: '15px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 2px 5px rgba(255,255,255,0.1)',
            display: 'flex',
            flexDirection: 'column',
            margin: '0 auto'
        }}>
            {/* Top Speaker */}
            <div style={{ width: '40px', height: '4px', background: '#333', borderRadius: '4px', margin: '0 auto 15px' }}></div>

            {/* Screen */}
            <div style={{
                height: '160px',
                background: '#879e86', // Classic Nokia green
                borderRadius: '8px',
                border: '2px solid #111',
                boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.2)',
                marginBottom: '20px',
                color: '#111',
                fontFamily: '"Courier New", Courier, monospace',
                overflow: 'hidden',
                position: 'relative'
            }}>
                {/* Status Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 6px', fontSize: '0.6rem', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                    <span>|||| W2P</span>
                    <span>[|||]</span>
                </div>
                {renderScreen()}
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', padding: '0 10px' }}>
                <button
                    onClick={handleCall}
                    style={{ background: '#00E396', width: '45px', height: '25px', borderRadius: '4px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Phone size={14} color="#000" />
                </button>
                <button
                    onClick={handleDelete}
                    style={{ background: '#FF5630', width: '45px', height: '25px', borderRadius: '4px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.7rem', fontWeight: 'bold' }}
                >
                    C
                </button>
            </div>

            {/* Keypad */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', padding: '0 10px' }}>
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((key) => (
                    <button
                        key={key}
                        onClick={() => handleKeyPress(key)}
                        style={{
                            background: '#222',
                            border: '1px solid #333',
                            color: '#fff',
                            padding: '10px 0',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            boxShadow: '0 2px 0 #111'
                        }}
                        onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(2px)'; e.currentTarget.style.boxShadow = 'none'; }}
                        onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 0 #111'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 0 #111'; }}
                    >
                        {key}
                    </button>
                ))}
            </div>

            <div style={{ textAlign: 'center', color: '#333', fontSize: '0.6rem', marginTop: 'auto', fontWeight: 'bold', letterSpacing: '2px' }}>
                W2P NETWORK
            </div>
        </div>
    );
};

export default USSDPhone;
