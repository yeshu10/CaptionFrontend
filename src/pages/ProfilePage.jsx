import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  User,
  Mail,
  Image as ImageIcon,
  Calendar,
  Lock,
  Save,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Dices
} from 'lucide-react';
import { Spinner } from '../components/common/Loader';

const AVATAR_PRESETS = [
  { label: '🤖 Cyber Bot', style: 'bottts' },
  { label: '🧑 Minimalist', style: 'avataaars' },
  { label: '🎨 Artistic', style: 'lorelei' },
  { label: '💎 Shapes', style: 'shapes' }
];

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [imageError, setImageError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inlineSuccess, setInlineSuccess] = useState('');
  const [inlineError, setInlineError] = useState('');

  // Populate form with current user data
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setProfileImage(user.profileImage || '');
      setImageError(false);
    }
  }, [user]);

  const defaultAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
    user?.name || 'Creator'
  )}`;

  const currentAvatarUrl = profileImage.trim() || defaultAvatar;

  // Format account creation date
  const formattedCreationDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Recently Joined';

  // Check if anything has been edited
  const hasChanges =
    name.trim() !== (user?.name || '').trim() ||
    profileImage.trim() !== (user?.profileImage || '').trim();

  // Reset form to active user data
  const handleReset = () => {
    setName(user?.name || '');
    setProfileImage(user?.profileImage || '');
    setImageError(false);
    setInlineError('');
    setInlineSuccess('');
  };

  // Generate random avatar preset
  const handleRandomAvatar = (style = 'bottts') => {
    const randomSeed = Math.random().toString(36).substring(2, 10);
    const newAvatarUrl = `https://api.dicebear.com/7.x/${style}/svg?seed=${randomSeed}`;
    setProfileImage(newAvatarUrl);
    setImageError(false);
    setInlineError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInlineError('');
    setInlineSuccess('');

    const trimmedName = name.trim();
    if (!trimmedName) {
      setInlineError('Name cannot be empty.');
      return;
    }

    if (trimmedName.length > 60) {
      setInlineError('Name cannot exceed 60 characters.');
      return;
    }

    try {
      setIsSubmitting(true);
      await updateProfile({
        name: trimmedName,
        profileImage: profileImage.trim()
      });

      setInlineSuccess('Profile updated successfully!');
      toast.success('Profile updated successfully!');
    } catch (err) {
      const msg = err.message || 'Failed to update profile. Please try again.';
      setInlineError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="profile-page container">
      {/* Profile Header */}
      <div className="profile-header animate-fade-in">
        <div>
          <h1 className="studio-title">
            Creator Profile <span className="title-accent">⚙️</span>
          </h1>
          <p className="studio-subtitle">
            Manage your creator identity, avatar, and account details.
          </p>
        </div>
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="profile-grid">
        {/* Left Column: Creator Identity Card */}
        <div className="glass-panel profile-identity-card animate-fade-in">
          <div className="profile-avatar-wrapper">
            <img
              src={imageError ? defaultAvatar : currentAvatarUrl}
              alt={user?.name || 'Creator'}
              className="profile-avatar-large"
              onError={() => setImageError(true)}
            />
            <div className="avatar-badge-icon" title="Active Creator">
              <Sparkles size={16} />
            </div>
          </div>

          <h2 className="profile-user-name">{user?.name || 'Creator'}</h2>
          <p className="profile-user-email">{user?.email}</p>

          <div className="profile-identity-tags">
            <span className="badge badge-brand">
              <ShieldCheck size={13} style={{ marginRight: '4px' }} />
              Verified Account
            </span>
            <span className="badge badge-cyan">Studio Creator</span>
          </div>

          <div className="profile-meta-box">
            <div className="profile-meta-item">
              <Calendar size={18} className="profile-meta-icon" />
              <div>
                <span className="profile-meta-label">Account Created</span>
                <span className="profile-meta-value">{formattedCreationDate}</span>
              </div>
            </div>
            <div className="profile-meta-item">
              <Lock size={18} className="profile-meta-icon" />
              <div>
                <span className="profile-meta-label">Email Status</span>
                <span className="profile-meta-value">Protected & Secured</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Profile Form */}
        <div className="glass-panel profile-form-card animate-fade-in">
          <div className="profile-form-header">
            <h3>Account Settings</h3>
            <p>Update your display name and visual avatar representation.</p>
          </div>

          {inlineSuccess && (
            <div className="profile-alert profile-alert-success" role="alert">
              <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
              <span>{inlineSuccess}</span>
            </div>
          )}

          {inlineError && (
            <div className="profile-alert profile-alert-error" role="alert">
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{inlineError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Display Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="profile-name">
                Creator Display Name
                <span className="char-count">{name.length}/60</span>
              </label>
              <div className="input-wrapper">
                <span className="input-icon-left">
                  <User size={18} />
                </span>
                <input
                  id="profile-name"
                  type="text"
                  className="form-input has-icon-left"
                  placeholder="Your Name or Studio Handle"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (inlineError) setInlineError('');
                    if (inlineSuccess) setInlineSuccess('');
                  }}
                  maxLength={60}
                  required
                />
              </div>
            </div>

            {/* Email Address (Read-Only) */}
            <div className="form-group">
              <label className="form-label" htmlFor="profile-email">
                Email Address
                <span className="email-protected-tag">
                  <Lock size={12} /> Read-Only
                </span>
              </label>
              <div className="input-wrapper">
                <span className="input-icon-left">
                  <Mail size={18} />
                </span>
                <input
                  id="profile-email"
                  type="email"
                  className="form-input has-icon-left form-input-readonly"
                  value={user?.email || ''}
                  disabled
                  readOnly
                  aria-describedby="email-security-help"
                />
              </div>
              <p id="email-security-help" className="form-helper-text">
                <Lock size={12} style={{ display: 'inline', marginRight: '4px' }} />
                Email address cannot be changed directly for account security.
              </p>
            </div>

            {/* Profile Image URL */}
            <div className="form-group">
              <label className="form-label" htmlFor="profile-image">
                Profile Image URL
              </label>
              <div className="input-wrapper">
                <span className="input-icon-left">
                  <ImageIcon size={18} />
                </span>
                <input
                  id="profile-image"
                  type="url"
                  className="form-input has-icon-left"
                  placeholder="https://example.com/avatar.jpg or DiceBear URL"
                  value={profileImage}
                  onChange={(e) => {
                    setProfileImage(e.target.value);
                    setImageError(false);
                    if (inlineError) setInlineError('');
                    if (inlineSuccess) setInlineSuccess('');
                  }}
                />
              </div>

              {/* Avatar Preset Generator Chips */}
              <div className="avatar-preset-container">
                <span className="avatar-preset-title">Or pick an avatar style:</span>
                <div className="avatar-preset-chips">
                  {AVATAR_PRESETS.map((preset) => (
                    <button
                      key={preset.style}
                      type="button"
                      className="preset-chip-btn"
                      onClick={() => handleRandomAvatar(preset.style)}
                      title={`Generate ${preset.label} avatar`}
                    >
                      <span>{preset.label}</span>
                    </button>
                  ))}
                  <button
                    type="button"
                    className="preset-chip-btn preset-chip-random"
                    onClick={() => handleRandomAvatar('bottts')}
                    title="Generate completely random avatar"
                  >
                    <Dices size={14} />
                    <span>Randomize</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Account Creation Display */}
            <div className="profile-creation-card">
              <Calendar size={20} className="creation-card-icon" />
              <div>
                <span className="creation-card-title">Member Since</span>
                <span className="creation-card-date">{formattedCreationDate}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="profile-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting || !hasChanges}
              >
                {isSubmitting ? (
                  <>
                    <Spinner size={18} />
                    <span>Saving changes...</span>
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleReset}
                disabled={isSubmitting || !hasChanges}
              >
                <RotateCcw size={16} />
                <span>Reset</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
