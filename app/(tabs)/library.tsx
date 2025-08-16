import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Heart, Download, Upload, Star, ChevronRight, BookOpen } from 'lucide-react-native';
import TopNavigation from '@/components/TopNavigation';
import FloatingActionButton from '@/components/FloatingActionButton';

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  format: 'PDF' | 'EPUB';
  pages: number;
  rating: number;
  downloads: number;
  likes: number;
  category: string;
  description: string;
  isLiked: boolean;
  isDownloaded: boolean;
  isNew?: boolean;
  isRecommended?: boolean;
  isTopChart?: boolean;
  isFeatured?: boolean;
}

interface BookSection {
  id: string;
  title: string;
  subtitle?: string;
  books: Book[];
}

export default function LibraryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('For you');
  
  const [allBooks] = useState<Book[]>([
    {
      id: '1',
      title: 'Advanced Machine Learning Techniques',
      author: 'Dr. Alan Turing',
      cover: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=200&h=280&fit=crop',
      format: 'PDF',
      pages: 324,
      rating: 4.8,
      downloads: 1234,
      likes: 567,
      category: 'Computer Science',
      description: 'Comprehensive guide to modern ML algorithms and implementations.',
      isLiked: false,
      isDownloaded: true,
      isRecommended: true,
      isTopChart: true,
    },
    {
      id: '2',
      title: 'Fundamentals of Quantum Physics',
      author: 'Prof. Marie Curie',
      cover: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=200&h=280&fit=crop',
      format: 'EPUB',
      pages: 456,
      rating: 4.9,
      downloads: 2156,
      likes: 892,
      category: 'Physics',
      description: 'From wave-particle duality to quantum entanglement explained.',
      isLiked: true,
      isDownloaded: false,
      isNew: true,
      isRecommended: true,
      isFeatured: true,
    },
    {
      id: '3',
      title: 'Modern Psychology: Mind and Behavior',
      author: 'Dr. Sigmund Freud',
      cover: 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=200&h=280&fit=crop',
      format: 'PDF',
      pages: 512,
      rating: 4.7,
      downloads: 1876,
      likes: 743,
      category: 'Psychology',
      description: 'Contemporary approaches to understanding human behavior.',
      isLiked: false,
      isDownloaded: false,
      isNew: true,
      isTopChart: true,
    },
    {
      id: '4',
      title: 'Calculus Made Simple',
      author: 'Prof. Isaac Newton',
      cover: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=200&h=280&fit=crop',
      format: 'PDF',
      pages: 289,
      rating: 4.6,
      downloads: 1567,
      likes: 423,
      category: 'Mathematics',
      description: 'Master calculus with step-by-step explanations.',
      isLiked: false,
      isDownloaded: false,
      isRecommended: true,
      isFeatured: true,
    },
    {
      id: '5',
      title: 'World History Chronicles',
      author: 'Dr. Elizabeth Smith',
      cover: 'https://images.pexels.com/photos/2249531/pexels-photo-2249531.jpeg?auto=compress&cs=tinysrgb&w=200&h=280&fit=crop',
      format: 'EPUB',
      pages: 678,
      rating: 4.5,
      downloads: 934,
      likes: 312,
      category: 'History',
      description: 'Comprehensive journey through human civilization.',
      isLiked: false,
      isDownloaded: false,
      isNew: true,
    },
    {
      id: '6',
      title: 'Business Strategy Essentials',
      author: 'Warren Buffett',
      cover: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=200&h=280&fit=crop',
      format: 'PDF',
      pages: 234,
      rating: 4.4,
      downloads: 1123,
      likes: 445,
      category: 'Business',
      description: 'Strategic thinking for modern business leaders.',
      isLiked: false,
      isDownloaded: false,
      isTopChart: true,
    },
  ]);

  const tabs = ['For you', 'Top charts', 'Categories', "Editor's Choice"];

  const getSections = (): BookSection[] => {
    switch (selectedTab) {
      case 'For you':
        return [
          {
            id: 'recommended',
            title: 'Recommended for you',
            subtitle: 'Based on your reading history',
            books: allBooks.filter(b => b.isRecommended),
          },
          {
            id: 'new',
            title: 'New & updated books',
            subtitle: 'Latest additions to our library',
            books: allBooks.filter(b => b.isNew),
          },
          {
            id: 'continue',
            title: 'Continue reading',
            subtitle: 'Pick up where you left off',
            books: allBooks.filter(b => b.isDownloaded),
          },
        ];
      case 'Top charts':
        return [
          {
            id: 'top',
            title: 'Top books',
            subtitle: 'Most downloaded this month',
            books: allBooks.filter(b => b.isTopChart),
          },
        ];
      case 'Categories':
        return [
          {
            id: 'stem',
            title: 'STEM',
            books: allBooks.filter(b => ['Computer Science', 'Physics', 'Mathematics'].includes(b.category)),
          },
          {
            id: 'humanities',
            title: 'Humanities & Social Sciences',
            books: allBooks.filter(b => ['Psychology', 'History', 'Business'].includes(b.category)),
          },
        ];
      default:
        return [
          {
            id: 'featured',
            title: "Editor's picks",
            subtitle: 'Curated by our editorial team',
            books: allBooks.filter(b => b.isFeatured),
          },
        ];
    }
  };

  const toggleLike = (bookId: string) => {
    // Handle like logic
  };

  const handleDownload = (bookId: string) => {
    // Handle download logic
  };

  const renderBookItem = ({ item }: { item: Book }) => (
    <TouchableOpacity style={styles.bookItem}>
      <View style={styles.coverContainer}>
        <Image source={{ uri: item.cover }} style={styles.bookCover} />
        <TouchableOpacity 
          style={styles.likeButton}
          onPress={() => toggleLike(item.id)}
        >
          <Heart 
            size={16} 
            color={item.isLiked ? '#EF4444' : '#FFFFFF'} 
            fill={item.isLiked ? '#EF4444' : 'transparent'} 
          />
        </TouchableOpacity>
        {item.isDownloaded && (
          <View style={styles.downloadedBadge}>
            <Download size={12} color="#FFFFFF" />
          </View>
        )}
        <View style={styles.formatBadge}>
          <Text style={styles.formatText}>{item.format}</Text>
        </View>
      </View>
      <Text style={styles.bookTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.bookAuthor} numberOfLines={1}>{item.author}</Text>
      <View style={styles.bookMeta}>
        <View style={styles.ratingContainer}>
          <Star size={12} color="#F59E0B" fill="#F59E0B" />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
        <Text style={styles.pages}>{item.pages}p</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSection = (section: BookSection) => (
    <View key={section.id} style={styles.section}>
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.subtitle && (
            <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
          )}
        </View>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>See all</Text>
          <ChevronRight size={16} color="#8B5CF6" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={section.books}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.bookGrid}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Library</Text>
        <TouchableOpacity style={styles.uploadButton}>
          <Upload size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for books & documents"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Category Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && styles.selectedTab,
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.selectedTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content Sections */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {getSections().map(renderSection)}
      </ScrollView>

      <FloatingActionButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  uploadButton: {
    width: 44,
    height: 44,
    backgroundColor: '#8B5CF6',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 12,
  },
  tabsContainer: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#1F2937',
    borderWidth: 1,
    borderColor: '#374151',
  },
  selectedTab: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  tabText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '600',
  },
  selectedTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    color: '#9CA3AF',
    fontSize: 14,
    marginTop: 2,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    color: '#8B5CF6',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  bookGrid: {
    paddingLeft: 20,
  },
  itemSeparator: {
    width: 16,
  },
  bookItem: {
    width: 120,
  },
  coverContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  bookCover: {
    width: 120,
    height: 160,
    borderRadius: 8,
  },
  likeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadedBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formatBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#3B82F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  formatText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  bookTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    marginBottom: 4,
  },
  bookAuthor: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 6,
  },
  bookMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 2,
  },
  pages: {
    color: '#9CA3AF',
    fontSize: 12,
  },
});