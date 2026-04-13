import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import ProductCard from './ProductCard';
import SkeletonCard from './SkeletonCard';
import CategoryFilter from './CategoryFilter';
import { useDebounce } from '../../hooks';``

const API_URL = 'https://dummyjson.com/products?limit=0';
const BATCH_SIZE = 8;

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 400);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [displayCount, setDisplayCount] = useState(BATCH_SIZE);

  // Fetch all products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to load products');
      const data = await res.json();
      setProducts(data.products); 
    } catch (err) {
      setError('Could not load products. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Get unique categories
  const categories = useMemo(() => {
    return [...new Set(products.map(p => p.category))];
  }, [products]);

  // Combined filtering (search + categories)
  const filteredProducts = useMemo(() => {
    let result = products;

    if (debouncedSearch.trim()) {
      const term = debouncedSearch.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    return result;
  }, [products, debouncedSearch, selectedCategories]);

  // Reset infinite scroll when filters change
  useEffect(() => {
    setDisplayCount(BATCH_SIZE);
  }, [filteredProducts]);

  const displayedProducts = filteredProducts.slice(0, displayCount);
  const hasMore = displayCount < filteredProducts.length;

  // Infinite Scroll using Intersection Observer
  const observerRef = useRef();
  const lastProductRef = useCallback((node) => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setDisplayCount(prev => Math.min(prev + BATCH_SIZE, filteredProducts.length));
      }
    });

    if (node) observerRef.current.observe(node);
  }, [hasMore, filteredProducts.length]);

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchInput('');
  };

  const isEmpty = !loading && !error && filteredProducts.length === 0;

  return (
    <div className="min-h-screen pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-2">
          <h1 className="text-xl font-bold text-gray-900">Product Store</h1>
          <p className="text-gray-600 text-xs">Browse {products.length} products from DummyJSON</p>
        </div>

        {/* Search Bar */}
        <div className="mb-5">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search products..."
            className="w-full max-w-lg px-6 py-1 rounded-md border bg-white border-gray-200 focus:outline-none focus:border-blue-500 text-lg"
          />
        </div>

        {/* Category Chips */}
        {categories.length > 0 && (
          <div className="mb-5">
            <CategoryFilter
              categories={categories}
              selectedCategories={selectedCategories}
              onToggle={toggleCategory}
              onClear={clearFilters}
            />
          </div>
        )}

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-red-600 text-xl mb-4">{error}</p>
            <button
              onClick={fetchProducts}
              className="px-8 py-3 bg-blue-600 text-white rounded-3xl hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {isEmpty && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold">No matching products</h3>
            <p className="text-gray-600 mt-2">Try changing your search or filters</p>
            <button
              onClick={clearFilters}
              className="mt-6 px-8 py-3 bg-gray-900 text-white rounded-3xl"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && !isEmpty && (
          <>
            <p className="text-gray-800 mb-5 shadow sticky top-15 bg-white rounded-md px-4 py-2 z-50">
              Showing {displayedProducts.length} of {filteredProducts.length} products
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {displayedProducts.map((product, index) => {
                const isLast = index === displayedProducts.length - 1;
                return (
                  <div
                    key={product.id}
                    ref={isLast ? lastProductRef : null}
                  >
                    <ProductCard product={product} />
                  </div>
                );
              })}
            </div>

            {hasMore && (
              <div className="text-center text-gray-400 py-10">
                Scroll down for more products...
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductListing;