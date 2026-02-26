import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Network, LayoutDashboard, Search, MessageSquare, Settings, LogOut } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import SwipeCard from '../components/SwipeCard';

export default function BrandDashboard() {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('discovery');
    const { token, logout, user } = useAuth();

    useEffect(() => {
        fetch('http://localhost:8080/api/profiles', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setProfiles(data || []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching profiles", err);
                setLoading(false);
            });
    }, [token]);

    const handleSwipe = async (direction, id) => {
        // Optimistically remove from UI
        setProfiles((prev) => prev.filter((p) => p.id !== id));

        try {
            await fetch('http://localhost:8080/api/swipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ profileId: id, direction })
            });
        } catch (error) {
            console.error("Error sending swipe data", error);
        }
    };

    const handleAction = (direction) => {
        if (profiles.length === 0) return;
        const currentProfileId = profiles[0].id;
        handleSwipe(direction, currentProfileId);
    };

    return (
        <div className="dashboard-layout">
            {/* Sidebar Navigation */}
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <Network size={24} />
                    CollabDrop
                </div>

                <nav className="sidebar-nav">
                    <div className={`nav-item ${activeTab === 'campaigns' ? 'active' : ''}`} onClick={() => setActiveTab('campaigns')}>
                        <LayoutDashboard size={20} />
                        Campaigns
                    </div>
                    <div className={`nav-item ${activeTab === 'discovery' ? 'active' : ''}`} onClick={() => setActiveTab('discovery')}>
                        <Search size={20} />
                        Discovery
                    </div>
                    <div className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}>
                        <MessageSquare size={20} />
                        Messages
                        <span className="badge" style={{ marginLeft: 'auto' }}>3</span>
                    </div>
                    <div className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
                        <Settings size={20} />
                        Settings
                    </div>
                </nav>

                <div className="sidebar-footer">
                    <div className="user-avatar">{user?.name ? user.name[0].toUpperCase() : 'U'}</div>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{user?.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Brand Account</div>
                    </div>
                    <LogOut size={18} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} onClick={logout} />
                </div>
            </aside>

            {/* Main Workspace */}
            <main className="main-content">
                <header className="top-bar">
                    <div className="workspace-title">Influencer Discovery</div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <span className="badge">Audience: 10k-50k</span>
                        <span className="badge">Niche: Tech</span>
                    </div>
                </header>

                {activeTab === 'discovery' && (
                    <div className="card-container">
                        {loading ? (
                            <div style={{ color: 'var(--text-secondary)' }}>Loading profiles...</div>
                        ) : profiles.length > 0 ? (
                            <div className="swipe-area-wrapper">
                                <AnimatePresence>
                                    {profiles.map((profile, i) => (
                                        <SwipeCard
                                            key={profile.id}
                                            profile={profile}
                                            active={i === 0}
                                            onSwipe={handleSwipe}
                                        />
                                    )).reverse()}
                                </AnimatePresence>

                                {/* Action Buttons specific to the desktop layout */}
                                <div className="action-buttons">
                                    <button className="action-btn btn-large btn-reject" onClick={() => handleAction('left')}>
                                        Pass
                                    </button>
                                    <button className="action-btn btn-large btn-like" onClick={() => handleAction('right')}>
                                        Interested
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                                <h3>No more profiles matching your criteria.</h3>
                                <p>Try adjusting your search filters.</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'messages' && (
                    <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <MessageSquare size={48} style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }} />
                        <h3>Your Messages</h3>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', textAlign: 'center' }}>
                            When an influencer accepts your swipe, a dedicated chat workspace will open here for negotiation and briefing.
                        </p>
                    </div>
                )}

                {activeTab === 'campaigns' && (
                    <div style={{ padding: '2rem' }}>
                        <h3>Active Campaigns</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>No active campaigns yet.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
