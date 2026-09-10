import React, { useState } from 'react';
import { Hash, Copy, Check } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const HashtagBadges = ({ hashtags = [] }) => {
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const { toast } = useToast();

  const handleCopyAll = async () => {
    try {
      const text = hashtags.join(' ');
      await navigator.clipboard.writeText(text);
      setCopiedAll(true);
      toast.success('All hashtags copied to clipboard!');
      setTimeout(() => setCopiedAll(false), 2000);
    } catch (err) {
      toast.error('Failed to copy hashtags.');
    }
  };

  const handleCopyOne = async (tag, index) => {
    try {
      await navigator.clipboard.writeText(tag);
      setCopiedIndex(index);
      toast.success(`Copied ${tag}`);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch (err) {
      toast.error('Failed to copy tag.');
    }
  };

  if (!hashtags || hashtags.length === 0) return null;

  return (
    <div className="glass-panel result-box animate-fade-in">
      <div className="card-header" style={{ marginBottom: '0.65rem' }}>
        <div className="card-title">
          <Hash size={16} color="var(--primary-light)" />
          <span>Hashtags</span>
          <span className="badge badge-brand">{hashtags.length} Tags</span>
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={handleCopyAll}
          title="Copy all hashtags"
        >
          {copiedAll ? (
            <>
              <Check size={14} color="var(--accent-emerald)" />
              <span style={{ color: 'var(--accent-emerald)' }}>Copied All!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy All</span>
            </>
          )}
        </button>
      </div>

      <div className="tag-list">
        {hashtags.map((tag, idx) => (
          <span
            key={idx}
            className="hashtag-tag"
            onClick={() => handleCopyOne(tag, idx)}
            title="Click to copy single hashtag"
          >
            {tag}
            {copiedIndex === idx && (
              <Check size={12} color="var(--accent-emerald)" />
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HashtagBadges;
