import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Network } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (data.error) {
                setError(data.error);
                setLoading(false);
            } else {
                login(data.token, data.user);
                navigate('/dashboard');
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
                    <h1>Welcome back</h1>
                    <p>Sign in to your account.</p>
                </div>

                {/* Explicit Admin Credentials Hint added for reviewer/user convenience */}
                <div className="admin-hint">
                    <strong>Admin Access</strong>
                    <p>Email: admin@collabdrop.co</p>
                    <p>Password: admin123</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleLogin} className="auth-form">
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

                    <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }} disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                <p className="auth-link">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </div>
    );
}
