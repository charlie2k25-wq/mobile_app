import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';
import TopNavigation from '@/components/TopNavigation';
import FloatingActionButton from '@/components/FloatingActionButton';

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  category: string;
}

export default function LibraryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('For You');

  const [trendingBooks] = useState<Book[]>([
    {
      id: '1',
      title: 'Advanced Machine Learning',
      author: 'Dr. Alan Turing',
      cover: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=200&h=280&fit=crop',
      category: 'Computer Science',
    },
    {
      id: '2',
      title: 'Quantum Physics',
      author: 'Prof. Marie Curie',
      cover: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=200&h=280&fit=crop',
      category: 'Physics',
    },
    {
      id: '3',
      title: 'Modern Psychology',
      author: 'Dr. Sigmund Freud',
      cover: 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=200&h=280&fit=crop',
      category: 'Psychology',
    },
  ]);

  const tabs = ['For You', 'Top Charts', 'Categories', "Editor's Choice"];

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation />
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search books..."
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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Trending Books Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Books</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See all</Text>
              <Text style={styles.seeAllArrow}>›</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bookGrid}>
            {trendingBooks.map((book) => (
              <TouchableOpacity key={book.id} style={styles.bookCard}>
                <Image source={{ uri: book.cover }} style={styles.bookCover} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <FloatingActionButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    color: '#000000',
    fontSize: 16,
    marginLeft: 12,
  },
  tabsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  selectedTab: {
    backgroundColor: '#000000',
  },
  tabText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedTabText: {
    color: '#FFFFFF',
    fontWeight: '600',
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
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#000000',
    fontSize: 22,
    fontWeight: 'bold',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    color: '#6B7280',
    fontSize: 16,
    marginRight: 4,
  },
  seeAllArrow: {
    color: '#6B7280',
    fontSize: 18,
  },
  bookGrid: {
    paddingLeft: 20,
  },
  bookCard: {
    marginRight: 16,
  },
  bookCover: {
    width: 120,
    height: 160,
    borderRadius: 12,
  },
});