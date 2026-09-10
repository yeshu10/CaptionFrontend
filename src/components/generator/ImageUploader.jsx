import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, RefreshCw, Trash2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const ImageUploader = ({ selectedFile, previewUrl, onFileSelect, onClear }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFile = (file) => {
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image (JPEG, PNG, WEBP, GIF, or AVIF).');
      return;
    }

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image size must be less than 10MB.');
      return;
    }

    onFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="glass-panel uploader-card">
      <div className="card-header">
        <div className="card-title">
          <ImageIcon size={18} color="var(--primary-light)" />
          <span>Upload Image</span>
        </div>
        {selectedFile && (
          <span className="badge badge-brand">
            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
          </span>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleInputChange}
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        style={{ display: 'none' }}
      />

      {previewUrl ? (
        <div className="image-preview-wrapper">
          <img src={previewUrl} alt="Upload preview" className="image-preview" />
          <div className="image-preview-actions">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => fileInputRef.current?.click()}
              title="Replace Image"
            >
              <RefreshCw size={14} />
              <span>Replace</span>
            </button>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={onClear}
              title="Remove Image"
            >
              <Trash2 size={14} />
              <span>Remove</span>
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`dropzone ${isDragging ? 'active' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
        >
          <div className="dropzone-icon">
            <UploadCloud size={28} />
          </div>
          <div>
            <div className="dropzone-text">
              Drop your visual artwork or photo here
            </div>
            <div className="dropzone-subtext">
              or click to browse from your device
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '0.4rem',
              marginTop: '0.5rem',
              fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}
          >
            <span>Supports JPG, PNG, WEBP</span>
            <span>•</span>
            <span>Up to 10MB</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
