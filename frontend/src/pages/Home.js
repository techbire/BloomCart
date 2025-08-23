import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PlantCard from '../components/PlantCard';
import SearchAndFilter from '../components/SearchAndFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { plantsAPI } from '../utils/api';
import './Home.css';

const Home = ({ onAddToCart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [plants, setPlants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await plantsAPI.getCategories();
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch plants with filters
  const fetchPlants = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page,
        limit: 12,
        sortBy,
        sortOrder
      };

      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }

      if (selectedCategory !== 'all') {
        params.category = selectedCategory;
      }

      if (availabilityFilter !== 'all') {
        params.availability = availabilityFilter;
      }

      const response = await plantsAPI.getAllPlants(params);
      
      if (response.data.success) {
        setPlants(response.data.data);
        setCurrentPage(response.data.pagination.currentPage);
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.totalItems);
      } else {
        throw new Error(response.data.message || 'Failed to fetch plants');
      }
    } catch (error) {
      console.error('Error fetching plants:', error);
      setError(error.response?.data?.message || 'Failed to load plants. Please try again.');
      setPlants([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory, availabilityFilter, sortBy, sortOrder]);

  // Initial load
  useEffect(() => {
    fetchCategories();

    // Read category from URL on first render
    const params = new URLSearchParams(location.search);
    const urlCategory = params.get('category');
    if (urlCategory) {
      // Normalize to match stored categories (case-insensitive)
      setSelectedCategory(urlCategory);
    }
  }, []);

  // When URL changes (e.g., clicked from Footer), update selectedCategory
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlCategory = params.get('category');
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    }
  }, [location.search]);

  // Fetch plants when filters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1);
      fetchPlants(1);
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [fetchPlants]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchPlants(page);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keep URL in sync when user changes category via filter UI
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (selectedCategory && selectedCategory !== params.get('category')) {
      if (selectedCategory === 'all') {
        params.delete('category');
      } else {
        params.set('category', selectedCategory);
      }
      navigate({ search: params.toString() }, { replace: true });
    }
  }, [selectedCategory]);

  const handleRetry = () => {
    fetchPlants(currentPage);
  };

  if (loading && plants.length === 0) {
    return <LoadingSpinner message="Loading beautiful plants..." />;
  }

  return (
    <div className="home-page">
      <div className="container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to BloomCart</h1>
            <p className="hero-description">
              Discover our collection of beautiful, healthy plants to bring nature into your home
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">{totalItems}</span>
                <span className="stat-label">Plants Available</span>
              </div>
              <div className="stat">
                <span className="stat-number">{categories.length}</span>
                <span className="stat-label">Categories</span>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <SearchAndFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          availabilityFilter={availabilityFilter}
          setAvailabilityFilter={setAvailabilityFilter}
          categories={categories}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        {/* Results Section */}
        <section className="results-section">
          {loading ? (
            <LoadingSpinner message="Updating results..." />
          ) : error ? (
            <ErrorMessage message={error} onRetry={handleRetry} />
          ) : plants.length === 0 ? (
            <div className="no-results">
              <div className="no-results-content">
                <div className="no-results-icon">🔍</div>
                <h3>No plants found</h3>
                <p>Try adjusting your search criteria or filters</p>
              </div>
            </div>
          ) : (
            <>
              <div className="results-header">
                <h2 className="results-title">
                  {searchQuery 
                    ? `Search results for "${searchQuery}"` 
                    : selectedCategory !== 'all' 
                      ? `${selectedCategory} Plants` 
                      : 'All Plants'
                  }
                </h2>
                <div className="results-info">
                  Showing {plants.length} of {totalItems} plants
                </div>
              </div>

              <div className="plants-grid">
                {plants.map(plant => (
                  <PlantCard key={plant._id} plant={plant} onAddToCart={onAddToCart} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  
                  <div className="pagination-pages">
                    {[...Array(Math.min(5, totalPages))].map((_, index) => {
                      let pageNumber;
                      if (totalPages <= 5) {
                        pageNumber = index + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = index + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + index;
                      } else {
                        pageNumber = currentPage - 2 + index;
                      }

                      return (
                        <button
                          key={pageNumber}
                          className={`pagination-page ${currentPage === pageNumber ? 'active' : ''}`}
                          onClick={() => handlePageChange(pageNumber)}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
