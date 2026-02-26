import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { MapPin, Users, Activity, BarChart2 } from 'lucide-react';
import './SwipeCard.css';

const SwipeCard = ({ profile, onSwipe, active }) => {
  const [exitX, setExitX] = useState(0);
  const x = useMotionValue(0);

  // Professional physics (slightly less exaggerated than dating apps)
  const rotate = useTransform(x, [-300, 300], [-10, 10]);
  const opacityLike = useTransform(x, [10, 100], [0, 1]);
  const opacityNope = useTransform(x, [-10, -100], [0, 1]);

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 100) {
      setExitX(400);
      onSwipe('right', profile.id);
    } else if (info.offset.x < -100) {
      setExitX(-400);
      onSwipe('left', profile.id);
    }
  };

  return (
    <motion.div
      className="swipe-card"
      style={{
        x,
        rotate,
        zIndex: active ? 10 : 1,
        opacity: active ? 1 : 0.8
      }}
      drag={active ? 'x' : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.6}
      onDragEnd={handleDragEnd}
      animate={{ x: exitX, opacity: exitX !== 0 ? 0 : 1 }}
      exit={{ x: exitX || (Math.random() > 0.5 ? 400 : -400), opacity: 0, transition: { duration: 0.3 } }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25
      }}
    >
      <div
        className="card-image"
        style={{ backgroundImage: `url(${profile.image})` }}
      >
        <motion.div className="stamp nope" style={{ opacity: opacityNope }}>
          PASS
        </motion.div>
        <motion.div className="stamp like" style={{ opacity: opacityLike }}>
          INTERESTED
        </motion.div>
      </div>

      <div className="card-info">
        <div className="card-header">
          <div className="card-title-group">
            <h2>{profile.name}</h2>
            <span className="niche-subtitle">{profile.tags && profile.tags[0]} Creator • {profile.location}</span>
          </div>
          {profile.isNew && <span className="badge">New</span>}
        </div>

        <p className="bio">
          Professional micro-influencer specializing in authentic product integrations and deeply engaging narrative content for modern brands.
        </p>

        <div className="metrics-grid">
          <div className="metric-item">
            <span className="metric-label">Audience Size</span>
            <span className="metric-value">
              <Users size={16} />
              {profile.followers}
            </span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Engagement</span>
            <span className="metric-value">
              <Activity size={16} color="var(--success)" />
              5.4%
            </span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Avg Return</span>
            <span className="metric-value">
              <BarChart2 size={16} />
              3.2x ROI
            </span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Match Score</span>
            <span className="metric-value" style={{ color: 'var(--text-primary)' }}>
              {profile.matchRate}%
            </span>
          </div>
        </div>

        <div className="tags">
          {profile.tags && profile.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SwipeCard;
