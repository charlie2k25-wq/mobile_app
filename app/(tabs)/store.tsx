import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, Grid3x3 as Grid3X3, List, Heart, Star, Download, ShoppingCart, Plus, TrendingUp, Clock, DollarSign, Eye, Upload } from 'lucide-react-native';
import { router } from 'expo-router';
import TopNavigation from '../../components/TopNavigation';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  fileType: string;
  fileSize: string;
  author: string;
  authorAvatar: string;
  rating: number;
  reviews: number;
  downloads: number;
  image: string;
  tags: string[];
  isWishlisted: boolean;
  isPurchased: boolean;
  uploadDate: string;
}

const categories = ['All', 'Books', 'Courses', 'Templates', 'Music', 'Software', 'Graphics'];
const sortOptions = ['Popular', 'Newest', 'Price: Low to High', 'Price: High to Low', 'Highest Rated'];

export default function StoreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [priceRange, setPriceRange] = useState([0, 100]);

  const products: Product[] = [
    {
      id: '1',
      title: 'Complete React Native Course',
      description: 'Master React Native development with this comprehensive course covering everything from basics to advanced topics.',
      price: 49.99,
      originalPrice: 79.99,
      category: 'Courses',
      fileType: 'Video Course',
      fileSize: '2.5 GB',
      author: 'Sarah Johnson',
      authorAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 4.8,
      reviews: 234,
      downloads: 1250,
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      tags: ['React Native', 'Mobile Development', 'JavaScript'],
      isWishlisted: false,
      isPurchased: false,
      uploadDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'Data Structures & Algorithms',
      description: 'Essential computer science concepts explained with practical examples and coding exercises.',
      price: 29.99,
      category: 'Books',
      fileType: 'PDF',
      fileSize: '15 MB',
      author: 'Dr. Michael Chen',
      authorAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 4.9,
      reviews: 189,
      downloads: 890,
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      tags: ['Computer Science', 'Programming', 'Algorithms'],
      isWishlisted: true,
      isPurchased: false,
      uploadDate: '2024-01-10'
    },
    {
      id: '3',
      title: 'Focus Study Music Pack',
      description: 'Ambient instrumental tracks designed to enhance concentration and productivity during study sessions.',
      price: 9.99,
      category: 'Music',
      fileType: 'MP3',
      fileSize: '120 MB',
      author: 'Alex Rivera',
      authorAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 4.6,
      reviews: 156,
      downloads: 2100,
      image: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      tags: ['Study Music', 'Ambient', 'Productivity'],
      isWishlisted: false,
      isPurchased: true,
      uploadDate: '2024-01-08'
    },
    {
      id: '4',
      title: 'Modern Resume Templates',
      description: 'Professional resume templates for various industries with customizable layouts and designs.',
      price: 19.99,
      category: 'Templates',
      fileType: 'PSD/AI',
      fileSize: '45 MB',
      author: 'Emma Wilson',
      authorAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 4.7,
      reviews: 98,
      downloads: 567,
      image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      tags: ['Resume', 'Templates', 'Design'],
      isWishlisted: false,
      isPurchased: false,
      uploadDate: '2024-01-12'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'Newest':
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      case 'Price: Low to High':
        return a.price - b.price;
      case 'Price: High to Low':
        return b.price - a.price;
      case 'Highest Rated':
        return b.rating - a.rating;
      default: // Popular
        return b.downloads - a.downloads;
    }
  });

  const toggleWishlist = (productId: string) => {
    // In a real app, this would update the backend
    console.log('Toggle wishlist for product:', productId);
  };

  const purchaseProduct = (product: Product) => {
    // In a real app, this would handle payment processing
    console.log('Purchase product:', product.title);
    router.push('/store/reviews');
  };

  const renderProductCard = (product: Product) => {
    if (viewMode === 'list') {
      return (
        <TouchableOpacity
          key={product.id}
          style={styles.listCard}
          onPress={() => setSelectedProduct(product)}
        >
          <Image source={{ uri: product.image }} style={styles.listImage} />
          <View style={styles.listContent}>
            <View style={styles.listHeader}>
              <Text style={styles.listTitle} numberOfLines={2}>{product.title}</Text>
              <TouchableOpacity onPress={() => toggleWishlist(product.id)}>
                <Heart 
                  size={20} 
                  color={product.isWishlisted ? '#EF4444' : '#6B7280'} 
                  fill={product.isWishlisted ? '#EF4444' : 'transparent'} 
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.listAuthor}>by {product.author}</Text>
            <Text style={styles.listDescription} numberOfLines={2}>{product.description}</Text>
            <View style={styles.listFooter}>
              <View style={styles.ratingContainer}>
                <Star size={14} color="#F59E0B" fill="#F59E0B" />
                <Text style={styles.rating}>{product.rating}</Text>
                <Text style={styles.reviews}>({product.reviews})</Text>
              </View>
              <Text style={styles.price}>${product.price}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        key={product.id}
        style={styles.productCard}
        onPress={() => setSelectedProduct(product)}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <TouchableOpacity 
            style={styles.wishlistButton}
            onPress={() => toggleWishlist(product.id)}
          >
            <Heart 
              size={16} 
              color={product.isWishlisted ? '#EF4444' : '#FFFFFF'} 
              fill={product.isWishlisted ? '#EF4444' : 'transparent'} 
            />
          </TouchableOpacity>
          {product.originalPrice && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </Text>
            </View>
          )}
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productTitle} numberOfLines={2}>{product.title}</Text>
          <Text style={styles.productAuthor}>by {product.author}</Text>
          <View style={styles.ratingContainer}>
            <Star size={12} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.rating}>{product.rating}</Text>
            <Text style={styles.reviews}>({product.reviews})</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.price}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>${product.originalPrice}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Digital Store</Text>
          <TouchableOpacity 
            style={styles.uploadButton}
            onPress={() => router.push('/store/upload')}
          >
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.uploadText}>Sell</Text>
          </TouchableOpacity>
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor="#6B7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity onPress={() => setShowFilters(true)}>
            <Filter size={20} color="#8B5CF6" />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText
              ]}>
                {category.charAt(0)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Controls */}
        <View style={styles.controls}>
          <View style={styles.viewToggle}>
            <TouchableOpacity
              style={[styles.viewButton, viewMode === 'grid' && styles.activeViewButton]}
              onPress={() => setViewMode('grid')}
            >
              <Grid3X3 size={16} color={viewMode === 'grid' ? '#FFFFFF' : '#6B7280'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.viewButton, viewMode === 'list' && styles.activeViewButton]}
              onPress={() => setViewMode('list')}
            >
              <List size={16} color={viewMode === 'list' ? '#FFFFFF' : '#6B7280'} />
            </TouchableOpacity>
          </View>
          <Text style={styles.resultCount}>{sortedProducts.length} products</Text>
        </View>
      </View>

      {/* Products */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={viewMode === 'grid' ? styles.productsGrid : styles.productsList}>
          {sortedProducts.map(renderProductCard)}
        </View>
      </ScrollView>

      {/* Product Detail Modal */}
      <Modal
        visible={!!selectedProduct}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedProduct(null)}
      >
        {selectedProduct && (
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setSelectedProduct(null)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Product Details</Text>
              <TouchableOpacity onPress={() => toggleWishlist(selectedProduct.id)}>
                <Heart 
                  size={24} 
                  color={selectedProduct.isWishlisted ? '#EF4444' : '#6B7280'} 
                  fill={selectedProduct.isWishlisted ? '#EF4444' : 'transparent'} 
                />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalContent}>
              <Image source={{ uri: selectedProduct.image }} style={styles.modalImage} />
              
              <View style={styles.modalInfo}>
                <Text style={styles.modalProductTitle}>{selectedProduct.title}</Text>
                <Text style={styles.modalAuthor}>by {selectedProduct.author}</Text>
                
                <View style={styles.modalStats}>
                  <View style={styles.statItem}>
                    <Star size={16} color="#F59E0B" fill="#F59E0B" />
                    <Text style={styles.statText}>{selectedProduct.rating} ({selectedProduct.reviews} reviews)</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Download size={16} color="#6B7280" />
                    <Text style={styles.statText}>{selectedProduct.downloads} downloads</Text>
                  </View>
                </View>

                <Text style={styles.modalDescription}>{selectedProduct.description}</Text>

                <View style={styles.productSpecs}>
                  <Text style={styles.specsTitle}>Product Details</Text>
                  <View style={styles.specRow}>
                    <Text style={styles.specLabel}>File Type:</Text>
                    <Text style={styles.specValue}>{selectedProduct.fileType}</Text>
                  </View>
                  <View style={styles.specRow}>
                    <Text style={styles.specLabel}>File Size:</Text>
                    <Text style={styles.specValue}>{selectedProduct.fileSize}</Text>
                  </View>
                  <View style={styles.specRow}>
                    <Text style={styles.specLabel}>Category:</Text>
                    <Text style={styles.specValue}>{selectedProduct.category}</Text>
                  </View>
                </View>

                <View style={styles.tagsContainer}>
                  {selectedProduct.tags.map((tag, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <View style={styles.priceSection}>
                <Text style={styles.modalPrice}>${selectedProduct.price}</Text>
                {selectedProduct.originalPrice && (
                  <Text style={styles.modalOriginalPrice}>${selectedProduct.originalPrice}</Text>
                )}
              </View>
              <TouchableOpacity
                style={[
                  styles.purchaseButton,
                  selectedProduct.isPurchased && styles.downloadButton
                ]}
                onPress={() => purchaseProduct(selectedProduct)}
              >
                {selectedProduct.isPurchased ? (
                  <>
                    <Download size={20} color="#FFFFFF" />
                    <Text style={styles.purchaseText}>Download</Text>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} color="#FFFFFF" />
                    <Text style={styles.purchaseText}>Purchase</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
      </Modal>

      {/* Filters Modal */}
      <Modal
        visible={showFilters}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowFilters(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Filters & Sort</Text>
            <TouchableOpacity>
              <Text style={styles.resetButton}>Reset</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Sort By</Text>
              {sortOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.filterOption}
                  onPress={() => setSortBy(option)}
                >
                  <Text style={[
                    styles.filterOptionText,
                    sortBy === option && styles.selectedFilterText
                  ]}>
                    {option}
                  </Text>
                  {sortBy === option && (
                    <View style={styles.selectedIndicator} />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Price Range</Text>
              <View style={styles.priceRangeContainer}>
                <Text style={styles.priceRangeText}>${priceRange[0]} - ${priceRange[1]}</Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.applyFiltersButton}
              onPress={() => setShowFilters(false)}
            >
              <Text style={styles.applyFiltersText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F23',
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F37',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  uploadText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1F37',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoryButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1F1F37',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  selectedCategory: {
    backgroundColor: '#8B5CF6',
  },
  categoryText: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '600',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#1F1F37',
    borderRadius: 8,
    padding: 2,
  },
  viewButton: {
    padding: 8,
    borderRadius: 6,
  },
  activeViewButton: {
    backgroundColor: '#8B5CF6',
  },
  resultCount: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: 16,
  },
  productsList: {
    paddingTop: 16,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#1F1F37',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  listCard: {
    flexDirection: 'row',
    backgroundColor: '#1F1F37',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 120,
  },
  listImage: {
    width: 80,
    height: 80,
    margin: 12,
    borderRadius: 8,
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    padding: 4,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#EF4444',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  productInfo: {
    padding: 12,
  },
  listContent: {
    flex: 1,
    padding: 12,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  productTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  listTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  productAuthor: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 8,
  },
  listAuthor: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 6,
  },
  listDescription: {
    color: '#D1D5DB',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 4,
  },
  rating: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '600',
  },
  reviews: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  listFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: 'bold',
  },
  originalPrice: {
    color: '#9CA3AF',
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#0F0F23',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F37',
  },
  closeButton: {
    color: '#9CA3AF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  resetButton: {
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
  },
  modalImage: {
    width: '100%',
    height: 200,
  },
  modalInfo: {
    padding: 20,
  },
  modalProductTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalAuthor: {
    color: '#9CA3AF',
    fontSize: 16,
    marginBottom: 16,
  },
  modalStats: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    color: '#D1D5DB',
    fontSize: 14,
  },
  modalDescription: {
    color: '#D1D5DB',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  productSpecs: {
    backgroundColor: '#1F1F37',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  specsTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  specLabel: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  specValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#8B5CF6',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#1F1F37',
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalPrice: {
    color: '#8B5CF6',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalOriginalPrice: {
    color: '#9CA3AF',
    fontSize: 16,
    textDecorationLine: 'line-through',
  },
  purchaseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  downloadButton: {
    backgroundColor: '#10B981',
  },
  purchaseText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  filterSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F37',
  },
  filterTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  filterOptionText: {
    color: '#D1D5DB',
    fontSize: 16,
  },
  selectedFilterText: {
    color: '#8B5CF6',
    fontWeight: '600',
  },
  selectedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8B5CF6',
  },
  priceRangeContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  priceRangeText: {
    color: '#8B5CF6',
    fontSize: 18,
    fontWeight: '600',
  },
  applyFiltersButton: {
    backgroundColor: '#8B5CF6',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyFiltersText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});