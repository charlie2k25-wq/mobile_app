import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, User, Headphones, BookOpen, ShoppingCart, MessageSquare } from 'lucide-react-native';
import FloatingActionButton from '@/components/FloatingActionButton';

interface SearchResult {
  id: string;
  type: 'user' | 'podcast' | 'book' | 'forum' | 'product';
  title: string;
  subtitle: string;
  image: string;
  metadata: string;
}

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([
    {
      id: '1',
      type: 'user',
      title: 'Dr. Sarah Chen',
      subtitle: 'Learning Psychology Expert',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      metadata: '12.5K followers',
    },
    {
      id: '2',
      type: 'podcast',
      title: 'The Science of Learning',
      subtitle: 'Memory Techniques That Actually Work',
      image: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      metadata: '45:32 • 234 likes',
    },
    {
      id: '3',
      type: 'book',
      title: 'Advanced Machine Learning',
      subtitle: 'Dr. Alan Turing',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      metadata: 'PDF • 324 pages',
    },
    {
      id: '4',
      type: 'forum',
      title: 'Best memory techniques for math?',
      subtitle: 'Study Tips Discussion',
      image: '',
      metadata: '45 upvotes • 23 replies',
    },
  ]);

  const filters = ['All', 'Users', 'Podcasts', 'Books', 'Forum', 'Products'];

  const getFilterIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <User size={20} color="#8B5CF6" />;
      case 'podcast':
        return <Headphones size={20} color="#8B5CF6" />;
      case 'book':
        return <BookOpen size={20} color="#8B5CF6" />;
      case 'forum':
        return <MessageSquare size={20} color="#8B5CF6" />;
      case 'product':
        return <ShoppingCart size={20} color="#8B5CF6" />;
      default:
        return <Search size={20} color="#8B5CF6" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'user':
        return 'User';
      case 'podcast':
        return 'Podcast';
      case 'book':
        return 'Book';
      case 'forum':
        return 'Discussion';
      case 'product':
        return 'Product';
      default:
        return 'Result';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search everything..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterTab,
              selectedFilter === filter && styles.selectedFilterTab,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.selectedFilterText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Recent Searches */}
      {searchQuery === '' && (
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['quantum physics', 'study techniques', 'calculus help', 'productivity podcasts'].map((term) => (
              <TouchableOpacity key={term} style={styles.recentChip}>
                <Text style={styles.recentText}>{term}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Search Results */}
      <ScrollView style={styles.resultsList} showsVerticalScrollIndicator={false}>
        {searchResults.map((result) => (
          <TouchableOpacity key={result.id} style={styles.resultCard}>
            <View style={styles.resultInfo}>
              {result.image ? (
                <Image source={{ uri: result.image }} style={styles.resultImage} />
              ) : (
                <View style={styles.resultIconContainer}>
                  {getFilterIcon(result.type)}
                </View>
              )}
              <View style={styles.resultDetails}>
                <View style={styles.resultHeader}>
                  <Text style={styles.resultTitle} numberOfLines={1}>
                    {result.title}
                  </Text>
                  <View style={styles.typeBadge}>
                    <Text style={styles.typeText}>{getTypeLabel(result.type)}</Text>
                  </View>
                </View>
                <Text style={styles.resultSubtitle} numberOfLines={1}>
                  {result.subtitle}
                </Text>
                <Text style={styles.resultMetadata}>{result.metadata}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Floating Action Button */}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 8,
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: '#374151',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  filterTab: {
    width: 32,
    height: 32,
    backgroundColor: '#374151',
    borderRadius: 16,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedFilterTab: {
    backgroundColor: '#8B5CF6',
  },
  filterText: {
    color: '#9CA3AF',
    fontSize: 10,
    fontWeight: '500',
  },
  selectedFilterText: {
    color: '#FFFFFF',
  },
  recentSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  recentChip: {
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  recentText: {
    color: '#9CA3AF',
    fontSize: 13,
  },
  resultsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  resultCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 12,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#374151',
  },
  resultInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  resultIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#374151',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resultDetails: {
    flex: 1,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  resultTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  typeBadge: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  resultSubtitle: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 2,
  },
  resultMetadata: {
    color: '#6B7280',
    fontSize: 12,
  },
});