import React from 'react';
import { Sliders, Sparkles, MessageSquare } from 'lucide-react';
import { Spinner } from '../common/Loader';

const CONTENT_TYPES = [
  { label: 'Painting', icon: '🎨' },
  { label: 'Reel', icon: '🎬' },
  { label: 'Product', icon: '🛍️' },
  { label: 'Personal', icon: '📸' }
];

const MOODS = [
  { label: 'Cute', icon: '🌸' },
  { label: 'Aesthetic', icon: '🕊️' },
  { label: 'Funny', icon: '😂' },
  { label: 'Emotional', icon: '💭' },
  { label: 'Professional', icon: '💼' },
  { label: 'Minimal', icon: '⚡' },
  { label: 'Romantic', icon: '💕' }
];

const LENGTHS = [
  { label: 'Short', desc: 'Punchy 1-2 lines' },
  { label: 'Medium', desc: 'Standard 3-5 lines' },
  { label: 'Long', desc: 'Detailed mini-blog' }
];

const PreferenceForm = ({
  preferences,
  onChange,
  onSubmit,
  isGenerating,
  hasImage
}) => {
  const { contentType, mood, length, additionalInstructions } = preferences;

  const handlePillClick = (key, value) => {
    onChange({ ...preferences, [key]: value });
  };

  return (
    <div className="glass-panel uploader-card">
      <div className="card-header">
        <div className="card-title">
          <Sliders size={18} color="var(--color-primary)" />
          <span>Style & Preferences</span>
        </div>
      </div>

      <form onSubmit={onSubmit}>
        {/* 1. Content Type */}
        <div className="form-group">
          <label className="form-label">
            <span>Content Type</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              Tailors visual context
            </span>
          </label>
          <div className="pill-group">
            {CONTENT_TYPES.map((type) => (
              <button
                key={type.label}
                type="button"
                className={`pill-option ${contentType === type.label ? 'active' : ''}`}
                onClick={() => handlePillClick('contentType', type.label)}
              >
                <span>{type.icon}</span>
                <span>{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Mood */}
        <div className="form-group">
          <label className="form-label">
            <span>Vibe / Mood</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              Controls tone & emojis
            </span>
          </label>
          <div className="pill-group">
            {MOODS.map((m) => (
              <button
                key={m.label}
                type="button"
                className={`pill-option ${mood === m.label ? 'active' : ''}`}
                onClick={() => handlePillClick('mood', m.label)}
              >
                <span>{m.icon}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Caption Length */}
        <div className="form-group">
          <label className="form-label">
            <span>Caption Length</span>
          </label>
          <div className="pill-group">
            {LENGTHS.map((len) => (
              <button
                key={len.label}
                type="button"
                className={`pill-option ${length === len.label ? 'active' : ''}`}
                onClick={() => handlePillClick('length', len.label)}
                style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '0.5rem 0.95rem' }}
              >
                <span style={{ fontWeight: 700 }}>{len.label}</span>
                <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>{len.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Optional Custom Instructions */}
        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label className="form-label" htmlFor="customInstructions">
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <MessageSquare size={14} color="var(--color-primary)" />
              <span>Custom Creator Instructions</span>
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              Optional
            </span>
          </label>
          <textarea
            id="customInstructions"
            className="form-textarea"
            placeholder="e.g. 'Mention our spring discount code SPRING20', 'Include location in Tokyo', or 'Ask followers for their favorite art technique'..."
            value={additionalInstructions}
            onChange={(e) =>
              onChange({ ...preferences, additionalInstructions: e.target.value })
            }
            maxLength={350}
          />
        </div>

        {/* Submit Generate Button */}
        <button
          type="submit"
          className="btn btn-primary btn-lg"
          style={{ width: '100%' }}
          disabled={!hasImage || isGenerating}
        >
          {isGenerating ? (
            <>
              <Spinner size={18} />
              <span>Creating your caption...</span>
            </>
          ) : (
            <>
              <Sparkles size={18} />
              <span>Generate Caption</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default PreferenceForm;
