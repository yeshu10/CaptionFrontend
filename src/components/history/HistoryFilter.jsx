import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';

const CONTENT_TYPES = ['All', 'Painting', 'Reel', 'Product', 'Personal'];
const MOODS = ['All', 'Cute', 'Aesthetic', 'Funny', 'Emotional', 'Professional', 'Minimal', 'Romantic'];

const HistoryFilter = ({
  search,
  onSearchChange,
  contentType,
  onContentTypeChange,
  mood,
  onMoodChange,
  onReset
}) => {
  return (
    <div className="card history-filters-bar">
      {/* Search Input */}
      <div className="search-input-wrapper">
        <Search size={18} className="search-input-icon" />
        <input
          type="text"
          className="form-input search-input"
          placeholder="Search captions, hooks, hashtags, or keywords..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Content Type Filter */}
      <div className="filter-selects">
        <select
          className="form-select"
          style={{ width: 'auto', minWidth: '150px' }}
          value={contentType}
          onChange={(e) => onContentTypeChange(e.target.value)}
        >
          {CONTENT_TYPES.map((type) => (
            <option key={type} value={type}>
              Type: {type}
            </option>
          ))}
        </select>

        {/* Mood Filter */}
        <select
          className="form-select"
          style={{ width: 'auto', minWidth: '150px' }}
          value={mood}
          onChange={(e) => onMoodChange(e.target.value)}
        >
          {MOODS.map((m) => (
            <option key={m} value={m}>
              Mood: {m}
            </option>
          ))}
        </select>

        {/* Reset Filters */}
        {(search || contentType !== 'All' || mood !== 'All') && (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onReset}
            title="Reset Filters"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default HistoryFilter;
