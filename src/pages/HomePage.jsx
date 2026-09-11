import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  Eye,
  Zap,
  Hash,
  Layers,
  ArrowRight,
  ShieldCheck,
  Flame
} from 'lucide-react';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-page container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-pill">
          <Sparkles size={16} />
          <span>Supercharged by Google Gemini Vision</span>
        </div>

        <h1 className="hero-title">
          Turn Any Visual into <br />
          <span className="editorial-serif">Inspiring Instagram Stories</span>
        </h1>

        <p className="hero-subtitle">
          CaptionGenAI understands your artwork, photography, reels, and products.
          Craft scroll-stopping hooks, authentic creator captions, and targeted hashtags with Google Gemini.
        </p>

        <div className="hero-actions">
          <Link
            to={isAuthenticated ? '/dashboard' : '/register'}
            className="btn btn-primary btn-lg"
          >
            <span>{isAuthenticated ? 'Open Creator Studio' : 'Start Creating for Free'}</span>
            <ArrowRight size={18} />
          </Link>
          {!isAuthenticated && (
            <Link to="/login" className="btn btn-secondary btn-lg">
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="feature-section">
        <div className="section-header">
          <h2 className="section-title">Engineered for Creators & Artists</h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '520px', margin: '0 auto' }}>
            Built to understand visual aesthetics, mood, and storytelling to elevate your Instagram presence.
          </p>
        </div>

        <div className="feature-grid">
          <div className="glass-panel feature-card">
            <div className="feature-icon-wrapper">
              <Eye size={24} />
            </div>
            <h3 className="feature-title">Visual Image Intelligence</h3>
            <p className="feature-desc">
              Powered by Google Gemini multimodal models to inspect artistic medium, color harmony, subjects, and atmosphere.
            </p>
          </div>

          <div className="glass-panel feature-card">
            <div className="feature-icon-wrapper">
              <Zap size={24} />
            </div>
            <h3 className="feature-title">Scroll-Stopping Hooks</h3>
            <p className="feature-desc">
              Engineered for the first 3 seconds of user attention, driving curiosity and stopping endless scrolling.
            </p>
          </div>

          <div className="glass-panel feature-card">
            <div className="feature-icon-wrapper">
              <Hash size={24} />
            </div>
            <h3 className="feature-title">Targeted Viral Hashtags</h3>
            <p className="feature-desc">
              Calculated hashtag mixes balancing high-volume discovery with high-relevance niche and artist communities.
            </p>
          </div>

          <div className="glass-panel feature-card">
            <div className="feature-icon-wrapper">
              <Layers size={24} />
            </div>
            <h3 className="feature-title">Structured Post Output</h3>
            <p className="feature-desc">
              Receive structured outputs: Hook, Caption, Call to Action, Hashtags, and SEO Keywords ready to copy or edit.
            </p>
          </div>

          <div className="glass-panel feature-card">
            <div className="feature-icon-wrapper">
              <Flame size={24} />
            </div>
            <h3 className="feature-title">Mood & Format Tailoring</h3>
            <p className="feature-desc">
              Toggle effortlessly between Cute, Aesthetic, Funny, Emotional, Professional, Minimal, or Romantic tones.
            </p>
          </div>

          <div className="glass-panel feature-card">
            <div className="feature-icon-wrapper">
              <ShieldCheck size={24} />
            </div>
            <h3 className="feature-title">History & Studio Library</h3>
            <p className="feature-desc">
              Save your winning generations, search your past visual inspirations, and organize your social campaigns.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
