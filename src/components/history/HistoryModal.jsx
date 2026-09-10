import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { Copy, Check, Trash2, Save, Sparkles, Hash, Target, Zap, Send, FileText } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { Spinner } from '../common/Loader';

const HistoryModal = ({ item, isOpen, onClose, onUpdate, onDelete }) => {
  const [editedCaption, setEditedCaption] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (item) {
      setEditedCaption(item.caption || '');
      setIsConfirmingDelete(false);
    }
  }, [item]);

  if (!item) return null;

  const handleCopyField = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied!`);
    } catch (err) {
      toast.error('Failed to copy text.');
    }
  };

  const handleCopyFull = async () => {
    try {
      const full = [
        item.hook ? `${item.hook}\n\n` : '',
        editedCaption ? `${editedCaption}\n\n` : '',
        item.cta ? `${item.cta}\n\n` : '',
        item.hashtags && item.hashtags.length ? `${item.hashtags.join(' ')}` : ''
      ]
        .filter(Boolean)
        .join('');

      await navigator.clipboard.writeText(full);
      toast.success('Full post copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy full post.');
    }
  };

  const handleSaveUpdate = async () => {
    try {
      setIsUpdating(true);
      await onUpdate(item._id, { caption: editedCaption });
      toast.success('Changes saved!');
    } catch (err) {
      toast.error('Failed to update caption.');
    } finally {
      setIsUpdating(false);
    }
  };

  const footer = (
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
      <div>
        {isConfirmingDelete ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8125rem', color: '#F87171' }}>Are you sure?</span>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(item._id)}
            >
              Confirm Delete
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setIsConfirmingDelete(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => setIsConfirmingDelete(true)}
          >
            <Trash2 size={14} />
            <span>Delete</span>
          </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: '0.6rem' }}>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={handleCopyFull}
        >
          <Copy size={14} />
          <span>Copy Full Post</span>
        </button>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={handleSaveUpdate}
          disabled={isUpdating || editedCaption === item.caption}
        >
          {isUpdating ? <Spinner size={14} /> : <Save size={14} />}
          <span>Save Edits</span>
        </button>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Saved Generation Details"
      footer={footer}
      maxWidth="720px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Visual Preview & Meta */}
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {item.image && (
            <div
              style={{
                width: '120px',
                height: '120px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                background: '#000000',
                border: '1px solid var(--border-subtle)',
                flexShrink: 0
              }}
            >
              <img
                src={item.image}
                alt="Original visual"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="badge badge-brand">{item.contentType}</span>
              <span className="badge badge-pink">{item.mood}</span>
              <span className="badge badge-cyan">{item.length || 'Medium'}</span>
            </div>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Created on {new Date(item.createdAt).toLocaleString()}
            </span>
            {item.additionalInstructions && (
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                Instructions: "{item.additionalInstructions}"
              </span>
            )}
          </div>
        </div>

        {/* Hook */}
        {item.hook && (
          <div className="glass-panel" style={{ padding: '1rem' }}>
            <div className="card-header" style={{ marginBottom: '0.5rem' }}>
              <div className="card-title" style={{ fontSize: '0.875rem' }}>
                <Zap size={14} color="var(--secondary)" />
                <span>Hook</span>
              </div>
              <button
                type="button"
                className="btn-icon"
                onClick={() => handleCopyField(item.hook, 'Hook')}
                title="Copy Hook"
              >
                <Copy size={14} />
              </button>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>{item.hook}</p>
          </div>
        )}

        {/* Editable Caption */}
        <div className="glass-panel" style={{ padding: '1rem' }}>
          <div className="card-header" style={{ marginBottom: '0.5rem' }}>
            <div className="card-title" style={{ fontSize: '0.875rem' }}>
              <FileText size={14} color="var(--primary-light)" />
              <span>Caption (Editable)</span>
            </div>
            <button
              type="button"
              className="btn-icon"
              onClick={() => handleCopyField(editedCaption, 'Caption')}
              title="Copy Caption"
            >
              <Copy size={14} />
            </button>
          </div>
          <textarea
            className="result-editable-textarea"
            rows={5}
            value={editedCaption}
            onChange={(e) => setEditedCaption(e.target.value)}
          />
        </div>

        {/* CTA */}
        {item.cta && (
          <div className="glass-panel" style={{ padding: '1rem' }}>
            <div className="card-header" style={{ marginBottom: '0.5rem' }}>
              <div className="card-title" style={{ fontSize: '0.875rem' }}>
                <Send size={14} color="var(--accent-cyan)" />
                <span>Call to Action</span>
              </div>
              <button
                type="button"
                className="btn-icon"
                onClick={() => handleCopyField(item.cta, 'CTA')}
                title="Copy CTA"
              >
                <Copy size={14} />
              </button>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>{item.cta}</p>
          </div>
        )}

        {/* Hashtags */}
        {item.hashtags && item.hashtags.length > 0 && (
          <div className="glass-panel" style={{ padding: '1rem' }}>
            <div className="card-header" style={{ marginBottom: '0.5rem' }}>
              <div className="card-title" style={{ fontSize: '0.875rem' }}>
                <Hash size={14} color="var(--primary-light)" />
                <span>Hashtags ({item.hashtags.length})</span>
              </div>
              <button
                type="button"
                className="btn-icon"
                onClick={() => handleCopyField(item.hashtags.join(' '), 'Hashtags')}
                title="Copy all hashtags"
              >
                <Copy size={14} />
              </button>
            </div>
            <div className="tag-list">
              {item.hashtags.map((t, idx) => (
                <span
                  key={idx}
                  className="hashtag-tag"
                  onClick={() => handleCopyField(t, t)}
                  title="Click to copy single hashtag"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Keywords */}
        {item.keywords && item.keywords.length > 0 && (
          <div className="glass-panel" style={{ padding: '1rem' }}>
            <div className="card-header" style={{ marginBottom: '0.5rem' }}>
              <div className="card-title" style={{ fontSize: '0.875rem' }}>
                <Target size={14} color="var(--accent-emerald)" />
                <span>SEO Keywords</span>
              </div>
            </div>
            <div className="tag-list">
              {item.keywords.map((kw, idx) => (
                <span key={idx} className="keyword-tag">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default HistoryModal;
