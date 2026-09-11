import React, { useState } from 'react';
import { Copy, Check, Eye, Trash2, Calendar } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const HistoryCard = ({ item, onView, onDelete }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopyCaption = async (e) => {
    e.stopPropagation();
    try {
      const fullText = [
        item.hook ? `${item.hook}\n\n` : '',
        item.caption ? `${item.caption}\n\n` : '',
        item.cta ? `${item.cta}\n\n` : '',
        item.hashtags && item.hashtags.length ? `${item.hashtags.join(' ')}` : ''
      ]
        .filter(Boolean)
        .join('');

      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      toast.success('Full caption copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy text.');
    }
  };

  const formattedDate = new Date(item.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="glass-panel history-card" onClick={() => onView(item)}>
      <div className="history-card-media">
        {item.image ? (
          <img src={item.image} alt={item.hook || 'Caption visual'} className="history-card-img" />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--color-surface-tint)',
              color: 'var(--color-text-muted)'
            }}
          >
            No Preview
          </div>
        )}
        <div className="history-card-overlay">
          <span className="badge badge-brand">{item.contentType}</span>
          <span className="badge badge-pink">{item.mood}</span>
        </div>
      </div>

      <div className="history-card-body">
        {item.hook && (
          <div className="history-card-hook">
            {item.hook}
          </div>
        )}
        <div className="history-card-caption">
          {item.caption}
        </div>
      </div>

      <div className="history-card-footer">
        <div className="history-card-date" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Calendar size={13} />
          <span>{formattedDate}</span>
        </div>

        <div className="history-card-actions">
          <button
            type="button"
            className="btn-icon"
            onClick={handleCopyCaption}
            title="Copy entire post"
          >
            {copied ? (
              <Check size={16} color="var(--color-success)" />
            ) : (
              <Copy size={16} />
            )}
          </button>
          <button
            type="button"
            className="btn-icon"
            onClick={(e) => {
              e.stopPropagation();
              onView(item);
            }}
            title="View full post"
          >
            <Eye size={16} />
          </button>
          <button
            type="button"
            className="btn-icon btn-danger"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item._id);
            }}
            title="Delete generation"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
