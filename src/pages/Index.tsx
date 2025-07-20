import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ShoppingBag, Shield, Zap, Clock, Star, TrendingUp, Mail, Phone, MapPin, Heart, Sparkles, Cpu, Eye, Search, MessageCircle, SlidersHorizontal, User, Package } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');
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

  // Categories (3 main categories)
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

  // Settings data
  const settingsItems = [
    { icon: SlidersHorizontal, label: 'Preferences', path: '/settings' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Package, label: 'Orders', path: '/orders' },
    { icon: Heart, label: 'Wishlist', path: '/wishlist' }
  ];

  // Collections data
  const collections = [
    {
      id: 1,
      title: 'Summer Essentials',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=300&fit=crop',
      description: 'Light and breezy pieces for the season'
    },
    {
      id: 2,
      title: 'Urban Streetwear',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      description: 'Bold styles for city life'
    },
    {
      id: 3,
      title: 'Elegant Evenings',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop',
      description: 'Sophisticated looks for special occasions'
    },
    {
      id: 4,
      title: 'Casual Comfort',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
      description: 'Everyday comfort meets style'
    }
  ];

  // Tech Features
  const techFeatures = [
    {
      icon: <Cpu className="w-8 h-8 text-[#81c784]" />,
      title: "AI-Powered Fit",
      description: "Advanced algorithms analyze your body measurements for perfect sizing recommendations."
    },
    {
      icon: <Eye className="w-8 h-8 text-[#81c784]" />,
      title: "3D Try-On",
      description: "Visualize how clothes look on you with our cutting-edge virtual fitting technology."
    },
    {
      icon: <Shield className="w-8 h-8 text-[#81c784]" />,
      title: "Privacy First",
      description: "Your body data is processed locally and never stored on our servers."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-[#81c784]" />,
      title: "Made in India",
      description: "Proudly crafted with premium materials and traditional Indian craftsmanship."
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

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

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
    <div className="min-h-screen" style={{ backgroundColor: '#fefbf6' }}>
      {/* Navigation */}
      <Navbar 
        onSearchOpen={() => setIsSearchOpen(true)}
        onCartOpen={() => {}}
      />

      {/* HERO SECTION WITH PASTEL BUTTERFLY WINGS */}
      <div className="relative min-h-screen overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#fefbf6' }}>
        {/* Pastel Butterfly Background */}
        <div className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          <ButterflyScene />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-8" style={{ zIndex: 3 }}>
          <div className="p-8 sm:p-12 lg:p-16 animate-fade-in-up">
            {/* Logo */}
            <div className="mb-12 relative">
              <img
                src="/IMG-20250305-WA0003-removebg-preview.png"
                alt="RARITONE"
                className="mx-auto w-full max-w-sm sm:max-w-3xl h-auto gentle-float brand-logo"
              />
            </div>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl font-light mb-8 opacity-90 animate-slide-in-right" style={{ color: '#666666' }}>
              Fashion Meets Technology
            </p>

            {/* Search Bar */}
            <div className="mb-12 flex justify-center animate-scale-in">
              <form onSubmit={handleSearchSubmit} className="search-container">
                <div className="relative">
                  <Search className="search-icon" size={20} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                </div>
              </form>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-16 animate-scale-in">
              <button
                className="pastel-btn-primary font-medium flex items-center space-x-3 justify-center w-full max-w-xs sm:min-w-[260px] px-10 py-5 sm:px-12 sm:py-6 text-sm sm:text-base hover-lift"
                onClick={() => navigate('/scan')}
              >
                <Camera size={isMobile ? 18 : 20} />
                <span>Start Body Scan</span>
              </button>
              
              <button
                className="pastel-btn-secondary font-medium flex items-center space-x-3 justify-center w-full max-w-xs sm:min-w-[260px] px-10 py-5 sm:px-12 sm:py-6 text-sm sm:text-base hover-lift"
                onClick={() => navigate('/catalog')}
              >
                <ShoppingBag size={isMobile ? 18 : 20} />
                <span>Browse Collection</span>
              </button>
            </div>

            {/* Privacy Notice */}
            <div className="max-w-lg mx-auto animate-fade-in-up">
              <div className="pastel-privacy-card p-5 text-center">
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#666666' }}>
                  Your privacy is our priority. Camera data is processed locally and never stored.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <section className="py-12 sm:py-20" style={{ backgroundColor: '#f2eee6' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 flex items-center justify-center" style={{ color: '#333333' }}>
              <Zap className="mr-4" size={isMobile ? 28 : 36} color="#81c784" />
              Revolutionary Technology
            </h2>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto px-4" style={{ color: '#666666' }}>
              Experience the future of fashion with our cutting-edge AI technology and precision fitting.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {techFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="feature-card hover-lift animate-fade-in-up"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center pastel-icon-bg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#333333' }}>{feature.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: '#666666' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY SECTION */}
      <section className="py-12 sm:py-20" style={{ backgroundColor: '#e6e0d7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 flex items-center justify-center" style={{ color: '#333333' }}>
              <TrendingUp className="mr-4" size={isMobile ? 28 : 36} color="#81c784" />
              Shop by Category
            </h2>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto px-4" style={{ color: '#666666' }}>
              Discover our curated collection of premium fashion categories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {categories.map((category, index) => (
              <div
                key={category.name}
                className="group cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                onClick={() => handleCategoryClick(category.category)}
              >
                <div className="category-card hover-lift">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-medium text-white text-lg sm:text-xl mb-1">
                        {category.name}
                      </h3>
                      <p className="text-white/80 text-sm">
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

      {/* SETTINGS SECTION */}
      <section className="py-12 sm:py-20" style={{ backgroundColor: '#fefbf6' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 flex items-center justify-center" style={{ color: '#333333' }}>
              <SlidersHorizontal className="mr-4" size={isMobile ? 28 : 36} color="#81c784" />
              Personalize Your Experience
            </h2>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto px-4" style={{ color: '#666666' }}>
              Customize your fashion journey with our personalization tools.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {settingsItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="pastel-card hover-lift cursor-pointer p-6 text-center"
                  onClick={() => navigate(item.path)}
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-2xl flex items-center justify-center pastel-icon-bg">
                    <IconComponent size={24} color="#81c784" />
                  </div>
                  <h3 className="font-medium" style={{ color: '#333333' }}>{item.label}</h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* COLLECTIONS SECTION */}
      <section className="py-12 sm:py-20" style={{ backgroundColor: '#f2eee6' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 flex items-center justify-center" style={{ color: '#333333' }}>
              <Package className="mr-4" size={isMobile ? 28 : 36} color="#81c784" />
              Featured Collections
            </h2>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto px-4" style={{ color: '#666666' }}>
              Explore our carefully curated fashion collections.
            </p>
          </div>

          <div className="collections-scroll snap-scroll">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="collection-card cursor-pointer"
                onClick={() => navigate('/catalog')}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#333333' }}>
                    {collection.title}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: '#666666' }}>
                    {collection.description}
                  </p>
                  <button className="pastel-btn-secondary text-sm px-4 py-2">
                    Explore Collection
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEW SLIDER SECTION */}
      <section className="py-12 sm:py-20 overflow-hidden" style={{ backgroundColor: '#fefbf6' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="text-center animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 flex items-center justify-center" style={{ color: '#333333' }}>
              <Star className="mr-4" size={isMobile ? 28 : 36} color="#81c784" />
              What Our Customers Say
            </h2>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto px-4" style={{ color: '#666666' }}>
              Join thousands of satisfied customers who love our AI-powered fashion experience.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="review-slider flex space-x-6">
            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className="flex-shrink-0 w-80 testimonial-card mx-4"
              >
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold mr-4" style={{ backgroundColor: '#81c784' }}>
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold" style={{ color: '#333333' }}>{review.name}</h4>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="#81c784" color="#81c784" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="italic leading-relaxed" style={{ color: '#666666' }}>"{review.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="py-16" style={{ backgroundColor: '#E8E1CE' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <img
                src="/IMG-20250305-WA0003-removebg-preview.png"
                alt="RARITONE"
                className="h-16 sm:h-20 w-auto mb-6"
              />
              <p className="max-w-md leading-relaxed text-sm sm:text-base mb-6" style={{ color: '#666666' }}>
                Revolutionizing fashion with AI-powered body scanning technology. 
                Experience perfect fit and personalized style recommendations across India.
              </p>
              
              {/* Newsletter Signup */}
              <div className="pastel-newsletter-section max-w-md">
                <h4 className="font-semibold mb-3" style={{ color: '#333333' }}>Stay Updated</h4>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 pastel-newsletter-input text-sm"
                  />
                  <button className="pastel-newsletter-btn px-4 py-2 text-sm">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-6 text-lg" style={{ color: '#333333' }}>Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="/about" className="text-sm sm:text-base transition-all duration-300 hover:text-[#81c784]" style={{ color: '#666666' }}>About Us</a></li>
                <li><a href="/contact" className="text-sm sm:text-base transition-all duration-300 hover:text-[#81c784]" style={{ color: '#666666' }}>Contact</a></li>
                <li><a href="/faqs" className="text-sm sm:text-base transition-all duration-300 hover:text-[#81c784]" style={{ color: '#666666' }}>FAQ</a></li>
                <li><a href="/quick-links" className="text-sm sm:text-base transition-all duration-300 hover:text-[#81c784]" style={{ color: '#666666' }}>Privacy Policy</a></li>
                <li><a href="/returns" className="text-sm sm:text-base transition-all duration-300 hover:text-[#81c784]" style={{ color: '#666666' }}>Returns & Exchanges</a></li>
                <li><a href="/terms" className="text-sm sm:text-base transition-all duration-300 hover:text-[#81c784]" style={{ color: '#666666' }}>Terms & Conditions</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold mb-6 text-lg" style={{ color: '#333333' }}>Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(129, 199, 132, 0.2)' }}>
                    <Mail size={16} color="#81c784" />
                  </div>
                  <span className="text-sm sm:text-base" style={{ color: '#666666' }}>
                    hello@raritone.in
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(129, 199, 132, 0.2)' }}>
                    <Phone size={16} color="#81c784" />
                  </div>
                  <span className="text-sm sm:text-base" style={{ color: '#666666' }}>
                    +91 98765 43210
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(129, 199, 132, 0.2)' }}>
                    <MapPin size={16} color="#81c784" />
                  </div>
                  <span className="text-sm sm:text-base" style={{ color: '#666666' }}>
                    Mumbai, India
                  </span>
                </div>
              </div>

              {/* Social Icons */}
              <div className="mt-6">
                <h4 className="font-semibold mb-3" style={{ color: '#333333' }}>Follow Us</h4>
                <div className="flex space-x-3">
                  <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'rgba(129, 199, 132, 0.2)', color: '#81c784' }}>
                    <span className="text-sm font-bold">IG</span>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'rgba(129, 199, 132, 0.2)', color: '#81c784' }}>
                    <span className="text-sm font-bold">X</span>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'rgba(129, 199, 132, 0.2)', color: '#81c784' }}>
                    <span className="text-sm font-bold">LI</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pastel-divider"></div>
          
          <div className="text-center">
            <p className="text-xs sm:text-sm" style={{ color: '#999999' }}>
              © 2025 RARITONE. All rights reserved. | Powered by AI Fashion Technology | Made in India with ❤️
            </p>
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
      <div className="floating-chat">
        <button
          className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
          style={{ backgroundColor: 'white', color: '#81c784' }}
        >
          <MessageCircle size={24} />
        </button>
      </div>

      {/* Floating Cart & Wishlist */}
      <div className="floating-cart">
        <button
          onClick={() => navigate('/cart')}
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 relative"
          style={{ backgroundColor: 'white', color: '#81c784' }}
        >
          <ShoppingBag size={20} />
          {cart.reduce((total, item) => total + item.quantity, 0) > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </button>
      </div>

      <div className="floating-wishlist">
        <button
          onClick={() => navigate('/wishlist')}
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 relative"
          style={{ backgroundColor: 'white', color: '#81c784' }}
        >
          <Heart size={20} />
          {wishlist.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Index;