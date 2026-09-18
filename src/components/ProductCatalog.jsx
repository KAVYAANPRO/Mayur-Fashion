import React, { useState, useMemo } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import ProductCard from './ProductCard';
import { CATEGORIES, SIZES, PRODUCTS } from '../data/products';

export default function ProductCatalog({ 
  searchQuery, 
  onQuickView, 
  onToggleInquiry, 
  inquiryList 
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category Match
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      // Search Match
      if (searchQuery && searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchFabric = item.fabric.toLowerCase().includes(query);
        const matchColor = item.color.toLowerCase().includes(query);
        const matchId = item.id.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        if (!matchTitle && !matchFabric && !matchColor && !matchId && !matchDesc) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "bestsellers") {
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      }
      if (sortBy === "newest") {
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="collections" className="section" style={{ background: '#EDEBE6', borderBottom: '1px solid #ECE5CE' }}>
      <div className="container-wide">
        {/* Section Heading */}
        <div className="section-title-wrap">
          <div className="section-tag">
            <span>Curated Ethnic Creations</span>
          </div>
          <h2 className="section-title">
            Our Standout Collections
          </h2>
          <p className="section-subtitle">
            Crafted using premium fabrics like Pure Chanderi, Modal Silk, Crinkle Georgette, and Rayon. Complete catalog grading in sizes <strong>M to 6XL</strong>.
          </p>
        </div>

        {/* Category & Filter Navigation Bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          paddingBottom: '24px',
          borderBottom: '1px solid #ECE5CE',
          marginBottom: '36px'
        }}>
          {/* Category Tabs */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: '9px 18px',
                    borderRadius: '9999px',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    background: isActive ? 'linear-gradient(135deg, #EF233C, #b81427)' : '#ffffff',
                    color: isActive ? '#ffffff' : '#1c1917',
                    border: isActive ? '1px solid #EF233C' : '1px solid #ECE5CE',
                    boxShadow: isActive ? '0 4px 14px rgba(239, 35, 60, 0.25)' : 'none',
                    transition: 'all 0.25s ease'
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Controls: Sort & Total Count */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '0.85rem', color: '#5e5750', fontWeight: 600 }}>
              Showing {filteredProducts.length} designs
            </span>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#ffffff',
              padding: '6px 12px',
              borderRadius: '9999px',
              border: '1px solid #C8D6BF'
            }}>
              <SlidersHorizontal size={14} color="#EF233C" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: '#1c1917',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="featured">Featured Catalog</option>
                <option value="bestsellers">Bestsellers First</option>
                <option value="newest">2026 New Edits</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '28px'
          }}>
            {filteredProducts.map((product) => {
              const isInInquiry = inquiryList.some((item) => item.id === product.id);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={onQuickView}
                  onToggleInquiry={onToggleInquiry}
                  isInInquiry={isInInquiry}
                />
              );
            })}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            background: '#ffffff',
            borderRadius: '20px',
            border: '1px dashed #C8D6BF'
          }}>
            <h3 style={{ fontSize: '1.3rem', color: '#EF233C', marginBottom: '8px' }}>
              No designs matched your filter
            </h3>
            <p style={{ color: '#5e5750', marginBottom: '16px' }}>
              Try searching with another keyword or resetting the category filter.
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); }}
              className="btn btn-outline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
