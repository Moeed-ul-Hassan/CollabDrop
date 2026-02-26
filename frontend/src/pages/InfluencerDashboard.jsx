import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Network, LayoutDashboard, Briefcase, MessageSquare, Settings, LogOut, TrendingUp, Users } from 'lucide-react';

export default function InfluencerDashboard() {
    const { user, logout } = useAuth();

    return (
        <div className="dashboard-layout">
            {/* Sidebar Navigation */}
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <Network size={24} />
                    CollabDrop
                </div>

                <nav className="sidebar-nav">
                    <div className="nav-item active">
                        <LayoutDashboard size={20} />
                        Overview
                    </div>
                    <div className="nav-item">
                        <Briefcase size={20} />
                        Active Briefs
                    </div>
                    <div className="nav-item">
                        <MessageSquare size={20} />
                        Messages
                        <span className="badge" style={{ marginLeft: 'auto' }}>1</span>
                    </div>
                    <div className="nav-item" style={{ marginTop: 'auto' }}>
                        <Settings size={20} />
                        Profile Setup
                    </div>
                </nav>

                <div className="sidebar-footer">
                    <div className="user-avatar">{user?.name ? user.name[0].toUpperCase() : 'U'}</div>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{user?.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Creator Account</div>
                    </div>
                    <LogOut size={18} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} onClick={logout} />
                </div>
            </aside>

            {/* Main Workspace */}
            <main className="main-content">
                <header className="top-bar">
                    <div className="workspace-title">Platform Overview</div>
                </header>

                <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Welcome back, {user?.name}</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Here is how your profile is performing this week.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-light)', borderRadius: 'var(--br-md)', boxShadow: 'var(--shadow-sm)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                <Users size={18} /> Profile Views
                            </div>
                            <div style={{ fontSize: '2rem', fontWeight: 700 }}>1,248</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--success)', marginTop: '0.5rem' }}>+12% from last week</div>
                        </div>

                        <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-light)', borderRadius: 'var(--br-md)', boxShadow: 'var(--shadow-sm)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                <TrendingUp size={18} /> Match Rate
                            </div>
                            <div style={{ fontSize: '2rem', fontWeight: 700 }}>42%</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '0.5rem' }}>Top 10% in Tech niche</div>
                        </div>

                        <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-light)', borderRadius: 'var(--br-md)', boxShadow: 'var(--shadow-sm)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                <Briefcase size={18} /> Pending Invites
                            </div>
                            <div style={{ fontSize: '2rem', fontWeight: 700 }}>3</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Response required</div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
