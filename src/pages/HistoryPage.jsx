import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { captionApi } from '../api/captionApi';
import { useToast } from '../context/ToastContext';

import HistoryFilter from '../components/history/HistoryFilter';
import HistoryCard from '../components/history/HistoryCard';
import HistoryModal from '../components/history/HistoryModal';
import { FullPageLoader } from '../components/common/Loader';

import { Sparkles, PlusCircle, Inbox, Layers } from 'lucide-react';

const HistoryPage = () => {
  const [captions, setCaptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const [search, setSearch] = useState('');
  const [contentType, setContentType] = useState('All');
  const [mood, setMood] = useState('All');

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { toast } = useToast();

  const fetchCaptions = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (contentType !== 'All') params.contentType = contentType;
      if (mood !== 'All') params.mood = mood;

      const res = await captionApi.getAll(params);
      if (res?.data) {
        setCaptions(res.data.captions || []);
        setTotalCount(res.data.total || 0);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to load history.');
    } finally {
      setLoading(false);
    }
  }, [search, contentType, mood, toast]);

  // Debounced search / filter trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCaptions();
    }, 250);

    return () => clearTimeout(timer);
  }, [fetchCaptions]);

  const handleResetFilters = () => {
    setSearch('');
    setContentType('All');
    setMood('All');
  };

  const handleView = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await captionApi.update(id, updatedData);
      if (res?.data) {
        // Update local list
        setCaptions((prev) =>
          prev.map((c) => (c._id === id ? { ...c, ...res.data } : c))
        );
        // Update modal state if open
        if (selectedItem && selectedItem._id === id) {
          setSelectedItem((prev) => ({ ...prev, ...res.data }));
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const handleDelete = async (id) => {
    try {
      await captionApi.delete(id);
      setCaptions((prev) => prev.filter((c) => c._id !== id));
      setTotalCount((prev) => Math.max(0, prev - 1));
      handleCloseModal();
      toast.success('Generation removed from history.');
    } catch (err) {
      toast.error(err.message || 'Failed to delete generation.');
    }
  };

  return (
    <div className="history-page container">
      {/* Header */}
      <div className="history-header">
        <div>
          <h1 className="studio-title">Post Archive</h1>
          <p className="studio-subtitle">
            Browse, polish, copy, and organize your saved Instagram creations.
          </p>
        </div>

        <Link to="/dashboard" className="btn btn-primary btn-sm">
          <PlusCircle size={16} />
          <span>New Caption</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <HistoryFilter
        search={search}
        onSearchChange={setSearch}
        contentType={contentType}
        onContentTypeChange={setContentType}
        mood={mood}
        onMoodChange={setMood}
        onReset={handleResetFilters}
      />

      {/* Content Area */}
      {loading ? (
        <FullPageLoader />
      ) : captions.length > 0 ? (
        <>
          <div
            style={{
              marginBottom: '1rem',
              fontSize: '0.875rem',
              color: 'var(--color-text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Layers size={14} />
            <span>Showing {captions.length} of {totalCount} saved posts</span>
          </div>

          <div className="history-grid">
            {captions.map((item) => (
              <HistoryCard
                key={item._id}
                item={item}
                onView={handleView}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </>
      ) : (
        <div
          className="card"
          style={{
            padding: '4rem 2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.25rem',
            margin: '2rem 0'
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#FFF8EA',
              border: '1px solid #FFEBB8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#601D49'
            }}
          >
            <Inbox size={30} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.4rem', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
              {search || contentType !== 'All' || mood !== 'All' ? 'No matching posts found' : 'No captions yet'}
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.925rem', maxWidth: '420px', margin: '0 auto', lineHeight: 1.6 }}>
              {search || contentType !== 'All' || mood !== 'All'
                ? 'Try adjusting your search keywords or filter tags to discover other saved items.'
                : 'Your next post starts here. Head over to the Studio to generate aesthetic hooks, captions, and hashtags with AI.'}
            </p>
          </div>
          {search || contentType !== 'All' || mood !== 'All' ? (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleResetFilters}
            >
              Clear Filters
            </button>
          ) : (
            <Link to="/dashboard" className="btn btn-primary">
              <Sparkles size={16} />
              <span>Create Your First Caption</span>
            </Link>
          )}
        </div>
      )}

      {/* Modal View for Editing / Deleting */}
      <HistoryModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default HistoryPage;
