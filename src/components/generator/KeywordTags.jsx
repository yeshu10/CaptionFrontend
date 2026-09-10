import React, { useState } from 'react';
import { Target, Copy, Check } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const KeywordTags = ({ keywords = [] }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(keywords.join(', '));
      setCopied(true);
      toast.success('Keywords copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy keywords.');
    }
  };

  if (!keywords || keywords.length === 0) return null;

  return (
    <div className="glass-panel result-box animate-fade-in">
      <div className="card-header" style={{ marginBottom: '0.65rem' }}>
        <div className="card-title">
          <Target size={16} color="var(--accent-emerald)" />
          <span>SEO & Discovery Keywords</span>
          <span className="badge badge-cyan">{keywords.length} terms</span>
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={handleCopy}
          title="Copy keywords"
        >
          {copied ? (
            <>
              <Check size={14} color="var(--accent-emerald)" />
              <span style={{ color: 'var(--accent-emerald)' }}>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="tag-list">
        {keywords.map((kw, idx) => (
          <span key={idx} className="keyword-tag">
            {kw}
          </span>
        ))}
      </div>
    </div>
  );
};

export default KeywordTags;
