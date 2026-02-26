import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Network, ArrowRight, Zap, Shield, BarChart3, Users, Star, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const floatingAnimation = {
    y: ["-10px", "10px", "-10px"],
    transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
    }
};

export default function LandingPage() {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/dashboard" replace />; // Directly redirect to the dashboard router
    }

    return (
        <div className="page-container" style={{ background: 'var(--bg-primary)' }}>
            {/* Navbar Minimalist */}
            <nav className="landing-nav" style={{ position: 'relative', zIndex: 10 }}>
                <div className="logo">
                    <Network size={28} style={{ color: 'var(--text-primary)' }} />
                    CollabDrop
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <Link to="/login" className="nav-link">
                        Log in
                    </Link>
                    <Link to="/signup" className="btn-primary shadow-hover">
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-creative">

                {/* Micro Interaction: Yellow Paint Banner */}
                <motion.a 
                    href="https://github.com/Moeed-ul-Hassan/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="yellow-paint-banner"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
                >
                    <Github size={18} />
                    <span className="banner-text">Made by <strong>Moeed ul Hassan</strong></span>
                </motion.a>

                <div className="hero-bg-accent"></div>
                <div className="hero-bg-accent-2"></div>

                <motion.div
                    className="hero-creative-content"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <motion.div variants={fadeInUp} className="badge" style={{ marginBottom: '1.5rem', border: '1px solid var(--border-dark)', background: 'var(--bg-primary)', padding: '0.4rem 1rem' }}>
                        <Zap size={14} style={{ marginRight: '6px' }} /> Discover. Connect. Drop.
                    </motion.div>

                    <motion.div variants={fadeInUp} style={{ position: 'relative' }}>
                        <h1 className="hero-title-large">
                            Precision Matching for <br />
                            <span className="text-highlight">Modern Brands.</span>
                        </h1>
                    </motion.div>

                    <motion.p variants={fadeInUp} className="hero-subtitle-large">
                        Stop guessing with spreadsheets. CollabDrop brings the intuitive swipe discovery paradigm to professional SaaS, instantly matching brands with highly-vetted micro-influencers based on verified engagement metrics.
                    </motion.p>

                    <motion.div variants={fadeInUp} className="hero-cta-group">
                        <Link to="/signup" className="btn-primary btn-large shadow-hover-deep">
                            Start Sourcing Creators <ArrowRight size={20} style={{ marginLeft: '10px' }} />
                        </Link>
                        <a href="#demo" className="btn-secondary btn-large">
                            See How It Works
                        </a>
                    </motion.div>

                    {/* Social Proof */}
                    <motion.div variants={fadeInUp} className="social-proof">
                        <div className="avatars">
                            <div className="avatar">K</div>
                            <div className="avatar">A</div>
                            <div className="avatar">S</div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', color: 'var(--text-primary)', gap: '2px', marginBottom: '2px' }}>
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Trusted by 2,000+ top-tier D2C brands.</p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Floating Creative Mockups */}
                <motion.div
                    className="hero-mockup-wrapper"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* Main Dashboard Mockup */}
                    <div className="mockup-main glass-panel">
                        <div className="mockup-header">
                            <div className="mockup-dots"><span></span><span></span><span></span></div>
                            <div className="mockup-url">app.collabdrop.co/discovery</div>
                        </div>
                        <div className="mockup-body">
                            <div className="mockup-sidebar"></div>
                            <div className="mockup-content">
                                <div className="mockup-card">
                                    <div className="mockup-card-img">
                                        <div className="mockup-stamp">MATCH</div>
                                    </div>
                                    <div className="mockup-card-text"></div>
                                    <div className="mockup-card-text short"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Widget 1 */}
                    <motion.div className="mockup-widget top-right glass-panel" animate={floatingAnimation}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ padding: '10px', background: 'var(--text-primary)', borderRadius: '8px', color: 'var(--bg-primary)' }}>
                                <BarChart3 size={20} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Avg. Engagement</div>
                                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>6.8% <span style={{ color: 'var(--success)', fontSize: '0.75rem', fontWeight: 600 }}>+2.4%</span></div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Floating Widget 2 */}
                    <motion.div className="mockup-widget bottom-left glass-panel" animate={floatingAnimation} style={{ animationDelay: '1s' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '40px', height: '40px', background: 'var(--bg-tertiary)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>
                                <Users size={20} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Influencers Vetted</div>
                                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>15,000+</div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Trust & Features Section */}
            <section id="demo" className="features-section">
                <h2 className="section-title">A frictionless path from discovery to campaign</h2>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon"><Filter size={24} /></div>
                        <h3>Curated Discovery</h3>
                        <p>Stop scrolling through noisy databases. Our engine serves up highly-relevant, pre-vetted creator profiles tailored strictly to your niche and audience demographics.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon"><Shield size={24} /></div>
                        <h3>Verified Analytics</h3>
                        <p>Every profile is enriched with live API data guaranteeing authentic follower counts, real engagement rates, and historical campaign ROI.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon"><CheckCircle size={24} /></div>
                        <h3>Instant Negotiation</h3>
                        <p>Swipe right to express interest. Once matched, jump instantly into a dedicated workspace to finalize briefs, negotiate terms, and manage escrow.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="logo"><Network size={20} /> CollabDrop</div>
                <p>© 2026 CollabDrop Inc. The modern standard for creator collaborations.</p>
            </footer>
        </div>
    );
}

// Dummy imports for Icons we just used
import { Filter, CheckCircle } from 'lucide-react';
