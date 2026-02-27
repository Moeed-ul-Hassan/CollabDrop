import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Network } from 'lucide-react';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('brand');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
            const res = await fetch(`${apiUrl}/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name, role })
            });
            const data = await res.json();

            if (data.error) {
                setError(data.error);
                setLoading(false);
            } else {
                login(data.token, data.user);
                // REDIRECT TO ONBOARDING INSTEAD OF DASHBOARD
                navigate('/onboarding');
            }
        } catch (err) {
            setError("Failed to connect to server");
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <Link to="/" style={{ position: 'absolute', top: '2rem', left: '2rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontWeight: 600 }}>
                <Network size={20} /> CollabDrop
            </Link>

            <div className="auth-card">
                <div className="auth-header">
                    <h1>Create an account</h1>
                    <p>Enter your details to access the platform.</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSignup} className="auth-form">
                    <div className="input-group">
                        <label>Workspace / Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Acme Corp"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            className="auth-input"
                        />
                    </div>

                    <div className="input-group">
                        <label>Work Email</label>
                        <input
                            type="email"
                            placeholder="name@company.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="auth-input"
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="auth-input"
                        />
                    </div>

                    <div className="input-group">
                        <label>I am joining as a:</label>
                        <select value={role} onChange={e => setRole(e.target.value)} className="auth-input">
                            <option value="brand">Brand</option>
                            <option value="influencer">Influencer</option>
                        </select>
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }} disabled={loading}>
                        {loading ? 'Creating account...' : 'Create account'}
                    </button>
                </form>

                <p className="auth-link">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </div>
    );
}
