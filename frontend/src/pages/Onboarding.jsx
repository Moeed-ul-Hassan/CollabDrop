import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Network, CheckCircle2 } from 'lucide-react';

const INTERESTS = [
    "Tech & Gadgets", "Sustainable Fashion", "B2B SaaS",
    "Fintech", "Health & Wellness", "Beauty & Skincare",
    "Travel & Leisure", "Gaming", "Home & Decor",
    "Food & Beverage", "Fitness", "Education"
];

export default function Onboarding() {
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    const toggleInterest = (interest) => {
        if (selected.includes(interest)) {
            setSelected(selected.filter(i => i !== interest));
        } else {
            setSelected([...selected, interest]);
        }
    };

    const handleComplete = async () => {
        setLoading(true);
        // In a real app, send `selected` tags to the backend via PUT /api/users/me
        setTimeout(() => {
            navigate('/dashboard');
        }, 800);
    };

    return (
        <div className="auth-container">
            <div className="logo" style={{ position: 'absolute', top: '2rem', left: '2rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                <Network size={20} /> CollabDrop
            </div>

            <div className="auth-card" style={{ maxWidth: '600px' }}>
                <div className="auth-header" style={{ textAlign: 'center' }}>
                    <h1>Select your niches</h1>
                    <p>Help us curate your matches. What categories are you interested in?</p>
                </div>

                <div className="interests-grid">
                    {INTERESTS.map(interest => (
                        <div
                            key={interest}
                            className={`interest-tag ${selected.includes(interest) ? 'selected' : ''}`}
                            onClick={() => toggleInterest(interest)}
                        >
                            {interest}
                            {selected.includes(interest) && <CheckCircle2 size={16} style={{ display: 'inline', marginLeft: '8px', verticalAlign: 'text-bottom' }} />}
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                    <button className="btn-secondary" onClick={() => navigate('/dashboard')}>
                        Skip for now
                    </button>
                    <button
                        className="btn-primary"
                        onClick={handleComplete}
                        disabled={selected.length === 0 || loading}
                    >
                        {loading ? 'Routing...' : 'Complete Setup'}
                    </button>
                </div>
            </div>
        </div>
    );
}
