import React, { useState } from 'react';
import { Copy, Check, Edit3, CheckSquare } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const ResultCard = ({
  title,
  icon: Icon,
  badge,
  badgeType = 'brand',
  content,
  isEditable = false,
  onSaveEdit,
  helperText
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(content);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast.success(`${title} copied to clipboard!`);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy text.');
    }
  };

  const handleApplyEdit = () => {
    if (onSaveEdit) {
      onSaveEdit(editText);
    }
    setIsEditing(false);
    toast.success('Caption updated!');
  };

  // Sync state if external content changes (e.g. on regenerate)
  React.useEffect(() => {
    setEditText(content);
  }, [content]);

  return (
    <div className="glass-panel result-box animate-fade-in">
      <div className="card-header" style={{ marginBottom: '0.65rem' }}>
        <div className="card-title">
          {Icon && <Icon size={16} color="var(--color-primary)" />}
          <span>{title}</span>
          {badge && <span className={`badge badge-${badgeType}`}>{badge}</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {isEditable && (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                if (isEditing) {
                  handleApplyEdit();
                } else {
                  setIsEditing(true);
                }
              }}
              title={isEditing ? 'Save edits' : 'Edit text'}
            >
              {isEditing ? (
                <>
                  <CheckSquare size={14} color="var(--color-success)" />
                  <span>Done</span>
                </>
              ) : (
                <>
                  <Edit3 size={14} />
                  <span>Edit</span>
                </>
              )}
            </button>
          )}

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleCopy}
            title="Copy to clipboard"
          >
            {copied ? (
              <>
                <Check size={14} color="var(--color-success)" />
                <span style={{ color: 'var(--color-success)' }}>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {isEditing ? (
        <div>
          <textarea
            className="result-editable-textarea"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            rows={5}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '0.4rem',
              fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}
          >
            <span>{editText.length} characters • {editText.trim().split(/\s+/).filter(Boolean).length} words</span>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleApplyEdit}
            >
              Apply Changes
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="result-content-text">{content}</div>
          {helperText && (
            <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {helperText}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultCard;
