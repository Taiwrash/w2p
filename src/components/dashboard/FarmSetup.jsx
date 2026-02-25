import React, { useMemo } from 'react';
import { Crosshair, Cpu, Activity } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customMarker = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

// Helper component to handle map clicks
const LocationMapHandler = ({ position, setPosition }) => {
    useMapEvents({
        click(e) {
            setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
        },
    });

    return position ? (
        <Marker position={position} icon={customMarker}>
            <Popup style={{ color: '#000' }}>
                <b style={{ color: '#000' }}>Center of Farm</b><br style={{ color: '#000' }} />
                {position.lat.toFixed(5)}, {position.lng.toFixed(5)}
            </Popup>
        </Marker>
    ) : null;
};

// Compute Polygon based on Acres roughly around the center point
const getFarmPolygon = (lat, lng, acres) => {
    const areaSqMeters = acres * 4046.86;
    const sideMeters = Math.sqrt(areaSqMeters);

    // Degrees per meter conversions
    const latFactor = 1 / 111111;
    const lngFactor = 1 / (111111 * Math.cos(lat * (Math.PI / 180)));

    const halfSideLat = (sideMeters / 2) * latFactor;
    const halfSideLng = (sideMeters / 2) * lngFactor;

    return [
        [lat - halfSideLat, lng - halfSideLng],
        [lat - halfSideLat, lng + halfSideLng],
        [lat + halfSideLat, lng + halfSideLng],
        [lat + halfSideLat, lng - halfSideLng],
    ];
};

const FarmSetup = ({
    farmLocation,
    setFarmLocation,
    farmArea,
    setFarmArea,
    soilType,
    setSoilType,
    waterSource,
    setWaterSource,
    analyzing,
    triggerAnalysis
}) => {

    const farmBoundary = useMemo(() => {
        return getFarmPolygon(farmLocation.lat, farmLocation.lng, farmArea);
    }, [farmLocation, farmArea]);

    return (
        <div className="dash-grid dash-fade-in">
            <div className="col-span-12 card">
                <div className="card-title">
                    <Crosshair size={20} color="#00E396" />
                    Interactive Farm Area & Landmark Mapping
                </div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                    Click on the map to place your farm's central marker. W2P generates an accurate boundary footprint (in acres) automatically around your center point to retrieve exact <b>micro-climate polygon data</b> rather than generalized regional weather.
                </p>

                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 200px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Farm Size (Acres)</label>
                        <input
                            type="number"
                            min="0.5"
                            step="0.5"
                            value={farmArea}
                            onChange={e => setFarmArea(Number(e.target.value) || 0.5)}
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: 'white', fontFamily: 'inherit' }}
                        />
                    </div>
                    <div style={{ flex: '1 1 200px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Dominant Soil Type</label>
                        <select
                            value={soilType}
                            onChange={e => setSoilType(e.target.value)}
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: 'white', fontFamily: 'inherit', appearance: 'none' }}
                        >
                            <option value="Loam">Loam (Balanced)</option>
                            <option value="Clay">Clay (High Retention)</option>
                            <option value="Sandy">Sandy (High Drainage)</option>
                            <option value="Silt">Silt</option>
                        </select>
                    </div>
                    <div style={{ flex: '1 1 200px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Water Infrastructure</label>
                        <select
                            value={waterSource}
                            onChange={e => setWaterSource(e.target.value)}
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-dark)', color: 'white', fontFamily: 'inherit', appearance: 'none' }}
                        >
                            <option value="Rainfed">Rainfed (Dependent on Season)</option>
                            <option value="Drip Irrigation">Drip Irrigation</option>
                            <option value="Sprinkler">Sprinkler System</option>
                            <option value="Borehole Access">Borehole Access</option>
                        </select>
                    </div>
                </div>

                <div style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-main)', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Selected Center Coordinates: <strong style={{ color: '#00E396' }}>{farmLocation.lat.toFixed(5)}, {farmLocation.lng.toFixed(5)}</strong></span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Calculated Footprint: {(farmArea * 4046.86).toFixed(0)} sq meters</span>
                </div>

                <div style={{ height: '450px', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)', position: 'relative', zIndex: 1 }}>
                    {/* Make sure we pass the key as location so it re-centers immediately if desired, but here we let the user pan freely. Using zoom=16 to see the boundary clearly */}
                    <MapContainer center={[farmLocation.lat, farmLocation.lng]} zoom={15} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            attribution='&copy; OpenStreetMap contributors'
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        />
                        <TileLayer
                            attribution='Stamen Terrain'
                            url="https://stamen-tiles.a.ssl.fastly.net/terrain-lines/{z}/{x}/{y}.png"
                            opacity={0.4}
                        />
                        <LocationMapHandler position={farmLocation} setPosition={setFarmLocation} />

                        {/* Display the calculated farm polygon shape */}
                        <Polygon positions={farmBoundary} pathOptions={{ color: '#00E396', fillColor: '#00E396', fillOpacity: 0.2, weight: 2 }} />
                    </MapContainer>
                </div>

                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
                    {analyzing ? (
                        <button className="btn btn-primary" disabled style={{ opacity: 0.7 }}>
                            <Activity size={16} className="lucide-spin" /> Fetching Poly-Data & Running ML...
                        </button>
                    ) : (
                        <button className="btn btn-primary" onClick={triggerAnalysis}>
                            <Cpu size={16} /> Save Polygon & Recalibrate AI
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FarmSetup;
