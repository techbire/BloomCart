import React, { useState } from 'react';
import { FaSearch, FaFilter, FaChevronDown, FaTimes } from 'react-icons/fa';
import './SearchAndFilter.css';

const SearchAndFilter = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory,
  availabilityFilter,
  setAvailabilityFilter,
  categories,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder
}) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleAvailabilityChange = (e) => {
    setAvailabilityFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setAvailabilityFilter('all');
    setSortBy('createdAt');
    setSortOrder('desc');
  };

  return (
    <div className="search-filter-container">
      <div className="filter-section">
        <div className="filter-header">
          <button
            type="button"
            className="filter-toggle"
            onClick={() => setFiltersOpen(v => !v)}
            aria-expanded={filtersOpen}
          >
            <FaFilter className="filter-icon" />
            <span className="filter-title">Filters</span>
            <FaChevronDown className={`chev ${filtersOpen ? 'up' : ''}`} />
          </button>
        </div>

        <div className={`filters-grid ${filtersOpen ? 'show' : 'hide'}`}>
          <div className="filter-group">
            <label className="filter-label">Category</label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="filter-select"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Availability</label>
            <select
              value={availabilityFilter}
              onChange={handleAvailabilityChange}
              className="filter-select"
            >
              <option value="all">All Plants</option>
              <option value="true">In Stock</option>
              <option value="false">Out of Stock</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Sort By</label>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="filter-select"
            >
              <option value="createdAt">Date Added</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Order</label>
            <select
              value={sortOrder}
              onChange={handleSortOrderChange}
              className="filter-select"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>

      <div className="search-section">
        <div className="search-input-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search plants by name, category, or description..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          {searchQuery && (
            <button 
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
              type="button"
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      <div className="clear-section">
        <button className="clear-filters-btn" onClick={clearFilters}>
          Clear All
        </button>
      </div>
    </div>
  );
};

export default SearchAndFilter;
