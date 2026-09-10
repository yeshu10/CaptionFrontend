import React, { useState } from 'react';
import {
  Sparkles,
  Bookmark,
  RefreshCw,
  Copy,
  Check,
  Zap,
  FileText,
  Send,
  HelpCircle
} from 'lucide-react';
import ResultCard from './ResultCard';
import HashtagBadges from './HashtagBadges';
import KeywordTags from './KeywordTags';
import { useToast } from '../../context/ToastContext';
import { Spinner } from '../common/Loader';

const ResultView = ({
  result,
  onUpdateCaption,
  onSave,
  onRegenerate,
  isSaving,
  isSaved,
  isRegenerating
}) => {
  const [copiedFull, setCopiedFull] = useState(false);
  const { toast } = useToast();

  if (!result) return null;

  const { hook, caption, cta, keywords, hashtags, preferences } = result;

  const handleCopyFullPost = async () => {
    try {
      const fullPost = [
        hook ? `${hook}\n\n` : '',
        caption ? `${caption}\n\n` : '',
        cta ? `${cta}\n\n` : '',
        hashtags && hashtags.length ? `${hashtags.join(' ')}` : ''
      ]
        .filter(Boolean)
        .join('');

      await navigator.clipboard.writeText(fullPost.trim());
      setCopiedFull(true);
      toast.success('Complete Instagram post copied to clipboard!');
      setTimeout(() => setCopiedFull(false), 2500);
    } catch (err) {
      toast.error('Failed to copy full post.');
    }
  };

  return (
    <div className="result-container animate-fade-in">
      {/* Top Action Toolbar */}
      <div className="glass-panel result-toolbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span className="badge badge-brand">
            {preferences?.contentType || 'Visual'}
          </span>
          <span className="badge badge-pink">
            {preferences?.mood || 'Aesthetic'}
          </span>
          <span className="badge badge-cyan">
            {preferences?.length || 'Medium'}
          </span>
        </div>

        <div className="result-toolbar-actions">
          {/* Copy Entire Post */}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleCopyFullPost}
            title="Copy Hook + Caption + CTA + Hashtags ready for Instagram"
          >
            {copiedFull ? (
              <>
                <Check size={14} color="var(--accent-emerald)" />
                <span style={{ color: 'var(--accent-emerald)' }}>Copied Post!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy Full Post</span>
              </>
            )}
          </button>

          {/* Regenerate */}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onRegenerate}
            disabled={isRegenerating}
            title="Regenerate with current preferences"
          >
            {isRegenerating ? (
              <Spinner size={14} />
            ) : (
              <RefreshCw size={14} />
            )}
            <span>Regenerate</span>
          </button>

          {/* Save to History */}
          <button
            type="button"
            className={`btn btn-sm ${isSaved ? 'btn-secondary' : 'btn-primary'}`}
            onClick={onSave}
            disabled={isSaving || isSaved}
          >
            {isSaving ? (
              <Spinner size={14} />
            ) : isSaved ? (
              <Check size={14} color="var(--accent-emerald)" />
            ) : (
              <Bookmark size={14} />
            )}
            <span>{isSaved ? 'Saved in History' : 'Save Content'}</span>
          </button>
        </div>
      </div>

      {/* 1. Magnetic Hook Card */}
      {hook && (
        <ResultCard
          title="Scroll-Stopping Hook"
          icon={Zap}
          badge="First 3 Seconds"
          badgeType="pink"
          content={hook}
          helperText="Place at the very beginning of your caption or use as the on-screen video hook."
        />
      )}

      {/* 2. Main Instagram Caption (Editable) */}
      <ResultCard
        title="Instagram Caption"
        icon={FileText}
        badge="Editable"
        badgeType="brand"
        content={caption}
        isEditable={true}
        onSaveEdit={onUpdateCaption}
      />

      {/* 3. Call to Action (CTA) */}
      {cta && (
        <ResultCard
          title="Call to Action (CTA)"
          icon={Send}
          badge="Boosts Engagement"
          badgeType="cyan"
          content={cta}
          helperText="Encourages saves, comments, or shares to trigger Instagram algorithm boosts."
        />
      )}

      {/* 4. Hashtags Grid */}
      <HashtagBadges hashtags={hashtags} />

      {/* 5. SEO Discovery Keywords */}
      <KeywordTags keywords={keywords} />
    </div>
  );
};

export default ResultView;
