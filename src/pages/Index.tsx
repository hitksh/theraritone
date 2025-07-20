'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ShoppingBag, Shield, Zap, Clock, Star, TrendingUp, Mail, Phone, MapPin, Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SearchOverlay from '@/components/SearchOverlay';
import ChatWidget from '@/components/ChatWidget';
import ProductModal from '@/components/ProductModal';
import AddToCartToast from '@/components/AddToCartToast';
import ButterflyScene from '@/components/ButterflyScene';
import { useToast } from '@/components/ToastContainer';
import { useAuth } from '@/contexts/AuthContext';
import { addToCart } from '@/lib/user';

const Index = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [showCartToast, setShowCartToast] = useState(false);
  const [cartToastItem, setCartToastItem] = useState(null);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user, refreshCart, addToLocalCart } = useAuth();

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load wishlist
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Categories (only 3 as requested)
  const categories = [
    { 
      name: "T-Shirts", 
      image: "Raritone Collection/Bold vibe Oversize Tshirt.jpg", 
      count: "15 Items", 
      category: "Tops" 
    },
    { 
      name: "Hoodies", 
      image: "Raritone Collection/Hoddie1(F).jpg", 
      count: "8 Items", 
      category: "Outerwear" 
    },
    { 
      name: "Premium", 
      image: "Raritone Collection/Kiss me again.jpeg", 
      count: "12 Items", 
      category: "Premium" 
    }
  ];

  // Customer Reviews Data
  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      comment: "The AI body scan is incredible! Perfect fit every time.",
      avatar: "PS"
    },
    {
      id: 2,
      name: "Arjun Patel",
      rating: 5,
      comment: "Amazing quality and the virtual try-on saved me so much time.",
      avatar: "AP"
    },
    {
      id: 3,
      name: "Sneha Reddy",
      rating: 5,
      comment: "Love the personalized recommendations. Best fashion app!",
      avatar: "SR"
    },
    {
      id: 4,
      name: "Vikram Singh",
      rating: 5,
      comment: "Revolutionary technology. Never buying clothes without this again.",
      avatar: "VS"
    }
  ];

  // Navigate to catalog with category filter
  const handleCategoryClick = (category: string) => {
    navigate(`/catalog?category=${encodeURIComponent(category)}`);
  };

  // Handle add to cart from modal
  const handleAddToCart = async (product: any, quantity: number, size?: string, color?: string) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size,
      imageURL: product.image
    };

    if (user) {
      try {
        await addToCart(user.uid, cartItem);
        await refreshCart();
      } catch (error) {
        console.error('Error adding to cart:', error);
        showToast({
          type: 'error',
          title: 'Error',
          message: 'Failed to add item to cart. Please try again.'
        });
        return;
      }
    } else {
      addToLocalCart(cartItem);
    }

    setCartToastItem(cartItem);
    setShowCartToast(true);
  };

  // Handle add to wishlist
  const handleAddToWishlist = (productId: string) => {
    const currentWishlist = [...wishlist];
    if (!currentWishlist.includes(productId)) {
      currentWishlist.push(productId);
      setWishlist(currentWishlist);
      localStorage.setItem('wishlist', JSON.stringify(currentWishlist));
      
      window.dispatchEvent(new Event('wishlistUpdated'));
      
      showToast({
        type: 'success',
        title: 'Added to Wishlist',
        message: 'Item has been saved to your wishlist!'
      });
    } else {
      const updatedWishlist = currentWishlist.filter(id => id !== productId);
      setWishlist(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      
      window.dispatchEvent(new Event('wishlistUpdated'));
      
      showToast({
        type: 'info',
        title: 'Removed from Wishlist',
        message: 'Item has been removed from your wishlist.'
      });
    }
  };

  return (
    <div className="min-h-screen text-white">
      {/* Navigation */}
      <Navbar 
        onSearchOpen={() => setIsSearchOpen(true)}
        onCartOpen={() => {}}
      />

      {/* ENHANCED HERO SECTION */}
      <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
        {/* 3D Butterfly Background - LARGER & HIGHER */}
        <div className="absolute inset-0 w-full h-full" style={{ transform: 'scale(1.4) translateY(-15vh)', zIndex: 1 }}>
          <ButterflyScene />
        </div>
        
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/30" style={{ zIndex: 2 }} />

        {/* Hero Content - LOGO AT BUTTERFLY CENTER */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-8" style={{ zIndex: 3, transform: 'translateY(0vh)' }}>
          <div className="p-8 sm:p-12 lg:p-16">
            <div className="mb-8">
              <img
                src="/IMG-20250305-WA0003-removebg-preview.png"
                alt="RARITONE"
                className="mx-auto w-full max-w-xs sm:max-w-2xl h-auto luxury-float"
                style={{ 
                  filter: 'drop-shadow(0 0 30px rgba(0, 64, 48, 0.6)) brightness(1.1)',
                  textShadow: '0 0 15px rgba(0, 64, 48, 0.4)'
                }}
              />
            </div>

            <p className="hero-subtitle font-light mb-16 opacity-95" 
               style={{ 
                 textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                 filter: 'brightness(1.1)',
                 color: 'var(--text-secondary)'
               }}>
              Fashion Meets Technology
            </p>

            {/* EQUAL STYLED BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-16">
              <button
                className="btn-primary font-medium flex items-center space-x-3 rounded-full justify-center w-full max-w-xs sm:min-w-[240px] px-8 py-4 sm:px-10 sm:py-5 text-sm sm:text-base shadow-luxury hover-lift"
                onClick={() => navigate('/scan')}
              >
                <Camera size={isMobile ? 18 : 20} />
                <span>Start Body Scan</span>
              </button>
              
              <button
                className="btn-secondary font-medium flex items-center space-x-3 rounded-full justify-center w-full max-w-xs sm:min-w-[240px] px-8 py-4 sm:px-10 sm:py-5 text-sm sm:text-base shadow-luxury hover-lift"
                onClick={() => navigate('/catalog')}
              >
                <ShoppingBag size={isMobile ? 18 : 20} />
                <span>Browse Collection</span>
              </button>
            </div>

            {/* Notice Text with Better Visibility */}
            <p className="max-w-md mx-auto leading-relaxed text-xs sm:text-sm px-4 opacity-80"
               style={{ 
                 textShadow: '0 1px 4px rgba(0,0,0,0.3)',
                 background: 'rgba(255,255,255,0.9)',
                 padding: '8px 16px',
                 borderRadius: '12px',
                 backdropFilter: 'blur(5px)',
                 color: 'var(--text-secondary)',
                 border: '1px solid rgba(0, 64, 48, 0.2)'
               }}>
              This site uses webcam access to enable AI-powered try-ons. Your camera data is never stored or shared.
            </p>
          </div>
        </div>
      </div>

      {/* AI BODY SCAN BENEFITS SECTION */}
      <section className="py-12 sm:py-20 luxury-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="hero-title mb-4 flex items-center justify-center">
              <Shield className="mr-4" size={isMobile ? 28 : 36} color="var(--primary-accent)" />
              AI Body Scan Benefits
            </h2>
            <p className="hero-subtitle max-w-2xl mx-auto px-4">
              Revolutionary technology that ensures perfect fit every time with complete privacy and precision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
            {/* 100% Private */}
            <div className="feature-card card-3d hover-lift">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--primary-accent)] bg-opacity-10 flex items-center justify-center">
                <Shield size={32} color="var(--primary-accent)" />
              </div>
              <h3 className="feature-title">100% Private</h3>
              <p className="feature-description">
                Body data never stored or sent online. All processing happens locally on your device for complete privacy.
              </p>
            </div>

            {/* 99% Accurate */}
            <div className="feature-card card-3d hover-lift">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--primary-accent)] bg-opacity-10 flex items-center justify-center">
                <Zap size={32} color="var(--primary-accent)" />
              </div>
              <h3 className="feature-title">99% Accurate</h3>
              <p className="feature-description">
                AI scanning ensures near-perfect micro-fit. Our technology provides the most accurate measurements possible.
              </p>
            </div>

            {/* 30 Second Scan */}
            <div className="feature-card card-3d hover-lift">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--primary-accent)] bg-opacity-10 flex items-center justify-center">
                <Clock size={32} color="var(--primary-accent)" />
              </div>
              <h3 className="feature-title">30 Second Scan</h3>
              <p className="feature-description">
                Fast scan with only a smartphone camera. Get your perfect measurements in half a minute.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY SECTION (ONLY 3 CATEGORIES) */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="hero-title mb-4 flex items-center justify-center">
              <TrendingUp className="mr-4" size={isMobile ? 28 : 36} color="var(--primary-accent)" />
              Shop by Category
            </h2>
            <p className="hero-subtitle max-w-2xl mx-auto px-4">
              Explore our curated collection of premium fashion categories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {categories.map((category) => (
              <div
                key={category.name}
                className="group cursor-pointer card-3d"
                onClick={() => handleCategoryClick(category.category)}
              >
                <div className="category-card hover-lift">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-accent)]/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-medium text-white text-lg sm:text-xl font-['Playfair_Display'] mb-1">
                        {category.name}
                      </h3>
                      <p className="text-white/80 text-sm font-['Poppins']">
                        {category.count}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEW SLIDER SECTION */}
      <section className="py-12 sm:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="text-center">
            <h2 className="hero-title mb-4 flex items-center justify-center">
              <Star className="mr-4" size={isMobile ? 28 : 36} color="var(--primary-accent)" />
              What Our Customers Say
            </h2>
            <p className="hero-subtitle max-w-2xl mx-auto px-4">
              Join thousands of satisfied customers who love our AI-powered fashion experience.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="review-slider flex space-x-6">
            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className="flex-shrink-0 w-80 luxury-card p-8 mx-4 hover-lift"
              >
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-[var(--primary-accent)] flex items-center justify-center text-white font-semibold mr-4 font-['Playfair_Display']">
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text-primary)] font-['Playfair_Display']">{review.name}</h4>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="var(--primary-accent)" color="var(--primary-accent)" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-[var(--text-secondary)] italic font-['Poppins'] leading-relaxed">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER SECTION WITH SMOOTH SCROLL LINKS */}
      <footer id="footer" className="py-8 sm:py-16 section-divider border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="luxury-card rounded-2xl p-8 sm:p-12 shadow-luxury">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Brand Section */}
              <div className="lg:col-span-2" id="about">
                <img
                  src="/IMG-20250305-WA0003-removebg-preview.png"
                  alt="RARITONE"
                  className="h-20 sm:h-24 w-auto mb-6"
                />
                <p className="text-[var(--text-secondary)] max-w-md leading-relaxed text-sm sm:text-base font-['Poppins']">
                  Revolutionizing fashion with AI-powered body scanning technology. 
                  Experience perfect fit and personalized style recommendations across India.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-6 text-lg sm:text-xl font-['Playfair_Display']">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="#about" className="text-[var(--text-secondary)] hover:text-[var(--primary-accent)] text-sm sm:text-base transition-all duration-300 font-['Poppins'] hover:translate-x-1">About Us</a></li>
                  <li><a href="#privacy" className="text-[var(--text-secondary)] hover:text-[var(--primary-accent)] text-sm sm:text-base transition-all duration-300 font-['Poppins'] hover:translate-x-1">Privacy Policy</a></li>
                  <li><a href="#returns" className="text-[var(--text-secondary)] hover:text-[var(--primary-accent)] text-sm sm:text-base transition-all duration-300 font-['Poppins'] hover:translate-x-1">Returns & Exchanges</a></li>
                  <li><a href="#contact" className="text-[var(--text-secondary)] hover:text-[var(--primary-accent)] text-sm sm:text-base transition-all duration-300 font-['Poppins'] hover:translate-x-1">Contact Us</a></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div id="contact">
                <h3 className="font-semibold text-[var(--text-primary)] mb-6 text-lg sm:text-xl font-['Playfair_Display']">Contact</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--primary-accent)] bg-opacity-10 flex items-center justify-center">
                      <Mail size={16} className="text-[var(--primary-accent)]" />
                    </div>
                    <span className="text-[var(--text-secondary)] text-sm sm:text-base font-['Poppins']">
                      hello@raritone.in
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--primary-accent)] bg-opacity-10 flex items-center justify-center">
                      <Phone size={16} className="text-[var(--primary-accent)]" />
                    </div>
                    <span className="text-[var(--text-secondary)] text-sm sm:text-base font-['Poppins']">
                      +91 98765 43210
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--primary-accent)] bg-opacity-10 flex items-center justify-center">
                      <MapPin size={16} className="text-[var(--primary-accent)]" />
                    </div>
                    <span className="text-[var(--text-secondary)] text-sm sm:text-base font-['Poppins']">
                      Mumbai, India
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy and Returns Sections */}
            <div className="section-divider border-t mt-8 sm:mt-12 pt-6 sm:pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div id="privacy">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-4 font-['Playfair_Display'] text-lg">Privacy Policy</h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed font-['Poppins']">
                    Your privacy is our priority. We use advanced encryption and never store your body scan data. 
                    All measurements are processed locally on your device for complete security.
                  </p>
                </div>
                <div id="returns">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-4 font-['Playfair_Display'] text-lg">Returns & Exchanges</h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed font-['Poppins']">
                    30-day hassle-free returns. Free size exchanges. If our AI recommendation doesn't fit perfectly, 
                    we'll make it right with no questions asked.
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-[var(--text-secondary)] text-xs sm:text-sm font-['Poppins']">
                  © 2025 RARITONE. All rights reserved. | Powered by AI Fashion Technology | Made in India
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Search Overlay */}
      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
      />

      {/* Add to Cart Toast */}
      <AddToCartToast
        isOpen={showCartToast}
        onClose={() => setShowCartToast(false)}
        item={cartToastItem}
        onViewCart={() => {
          setShowCartToast(false);
          navigate('/cart');
        }}
        onCheckout={() => {
          setShowCartToast(false);
          navigate('/cart');
        }}
      />

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default Index;