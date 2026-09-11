import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { captionApi } from '../api/captionApi';

import ImageUploader from '../components/generator/ImageUploader';
import PreferenceForm from '../components/generator/PreferenceForm';
import ResultView from '../components/generator/ResultView';

import { Sparkles, History, ImageIcon, Wand2, Compass } from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const [preferences, setPreferences] = useState({
    contentType: 'Personal',
    mood: 'Aesthetic',
    length: 'Medium',
    additionalInstructions: ''
  });

  const [result, setResult] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    // Reset previous saved state if user changes image
    setIsSaved(false);
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl('');
    setResult(null);
    setIsSaved(false);
  };

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();

    if (!selectedFile) {
      toast.error('Please upload an image first.');
      return;
    }

    try {
      setIsGenerating(true);
      setIsSaved(false);

      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('contentType', preferences.contentType);
      formData.append('mood', preferences.mood);
      formData.append('length', preferences.length);
      formData.append('additionalInstructions', preferences.additionalInstructions || '');

      const res = await captionApi.generate(formData);

      if (res?.data) {
        setResult(res.data);
        toast.success('Instagram content generated successfully!');
      }
    } catch (err) {
      toast.error(err.message || 'Generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = async () => {
    if (!selectedFile) return;

    try {
      setIsRegenerating(true);
      setIsSaved(false);

      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('contentType', preferences.contentType);
      formData.append('mood', preferences.mood);
      formData.append('length', preferences.length);
      formData.append('additionalInstructions', preferences.additionalInstructions || '');

      const res = await captionApi.generate(formData);

      if (res?.data) {
        setResult(res.data);
        toast.success('Fresh variations generated!');
      }
    } catch (err) {
      toast.error(err.message || 'Regeneration failed.');
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleUpdateCaption = (newCaptionText) => {
    if (!result) return;
    setResult({
      ...result,
      caption: newCaptionText
    });
    // If was saved before, allow re-saving or indicate edit
    setIsSaved(false);
  };

  const handleSave = async () => {
    if (!result) return;

    try {
      setIsSaving(true);
      const payload = {
        image: result.imagePreview || previewUrl,
        contentType: result.preferences?.contentType || preferences.contentType,
        mood: result.preferences?.mood || preferences.mood,
        length: result.preferences?.length || preferences.length,
        additionalInstructions: result.preferences?.additionalInstructions || preferences.additionalInstructions,
        caption: result.caption,
        hook: result.hook,
        cta: result.cta,
        keywords: result.keywords,
        hashtags: result.hashtags
      };

      await captionApi.save(payload);
      setIsSaved(true);
      toast.success('Saved to your History library!');
    } catch (err) {
      toast.error(err.message || 'Failed to save caption.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="dashboard-page container">
      {/* Studio Header */}
      <div className="studio-header">
        <div>
          <h1 className="studio-title">
            Creator Studio <span className="title-accent">✨</span>
          </h1>
          <p className="studio-subtitle">
            Welcome back, {user?.name || 'Creator'}. Select your photo and creative vibe to craft your next post.
          </p>
        </div>

        <div>
          <Link to="/history" className="btn btn-secondary btn-sm">
            <History size={16} />
            <span>Saved History</span>
          </Link>
        </div>
      </div>

      {/* 2-Column Responsive Studio Grid */}
      <div className="studio-grid">
        {/* Left Column: Image Upload + Preferences */}
        <div className="studio-input-column">
          <ImageUploader
            selectedFile={selectedFile}
            previewUrl={previewUrl}
            onFileSelect={handleFileSelect}
            onClear={handleClearFile}
          />

          <PreferenceForm
            preferences={preferences}
            onChange={setPreferences}
            onSubmit={handleGenerate}
            isGenerating={isGenerating}
            hasImage={!!selectedFile}
          />
        </div>

        {/* Right Column: AI Output Studio */}
        <div className="studio-result-column">
          {isGenerating ? (
            <div className="glass-panel result-loading-card">
              <div className="pulse-loader">
                <Sparkles size={26} />
              </div>
              <div style={{ maxWidth: '380px' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.4rem', color: 'var(--color-text)' }}>
                  Creating your caption...
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  Analyzing visual composition, colors, and mood to craft tailored hooks, caption, and hashtags.
                </p>
              </div>
            </div>
          ) : result ? (
            <ResultView
              result={result}
              onUpdateCaption={handleUpdateCaption}
              onSave={handleSave}
              onRegenerate={handleRegenerate}
              isSaving={isSaving}
              isSaved={isSaved}
              isRegenerating={isRegenerating}
            />
          ) : (
            <div className="glass-panel result-empty-card">
              <div className="result-empty-icon animate-pulse-glow">
                <Sparkles size={32} />
              </div>
              <div style={{ maxWidth: '400px' }}>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.45rem', color: 'var(--color-text)' }}>
                  Your Instagram post starts here
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem', lineHeight: '1.6' }}>
                  Upload an artwork, photo or reel still on the left, choose your tone, and let Gemini craft an authentic post.
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  marginTop: '0.5rem'
                }}
              >
                <span className="badge badge-brand">🎨 Painting & Art</span>
                <span className="badge badge-pink">🎬 Reel Hooks</span>
                <span className="badge badge-cyan">🛍️ Editorial CTAs</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
