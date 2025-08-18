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
import { useRouter } from 'expo-router';
import { ArrowLeft, Search, Download, Play, BookOpen, FileText, Music } from 'lucide-react-native';

interface DownloadedItem {
  id: string;
  title: string;
  author: string;
  cover: string;
  type: 'book' | 'podcast' | 'music' | 'document';
  size: string;
  downloadDate: string;
  isPurchased: boolean;
}

export default function DownloadsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('All');
  
  const [downloadedItems] = useState<DownloadedItem[]>([
    {
      id: '1',
      title: 'Advanced Machine Learning Techniques',
      author: 'Dr. Alan Turing',
      cover: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      type: 'book',
      size: '15.2 MB',
      downloadDate: '2024-01-20',
      isPurchased: true,
    },
    {
      id: '2',
      title: 'The Science of Learning',
      author: 'Dr. Sarah Chen',
      cover: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      type: 'podcast',
      size: '45.8 MB',
      downloadDate: '2024-01-18',
      isPurchased: false,
    },
    {
      id: '3',
      title: 'Focus Study Music Pack',
      author: 'Alex Rivera',
      cover: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      type: 'music',
      size: '120 MB',
      downloadDate: '2024-01-15',
      isPurchased: true,
    },
    {
      id: '4',
      title: 'Study Notes - Calculus',
      author: 'Prof. Michael Davis',
      cover: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      type: 'document',
      size: '2.4 MB',
      downloadDate: '2024-01-12',
      isPurchased: false,
    },
  ]);

  const tabs = ['All', 'Books', 'Podcasts', 'Music', 'Documents'];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'book':
        return <BookOpen size={20} color="#6B7280" />;
      case 'podcast':
        return <Play size={20} color="#6B7280" />;
      case 'music':
        return <Music size={20} color="#6B7280" />;
      case 'document':
        return <FileText size={20} color="#6B7280" />;
      default:
        return <Download size={20} color="#6B7280" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'book':
        return '#3B82F6';
      case 'podcast':
        return '#8B5CF6';
      case 'music':
        return '#10B981';
      case 'document':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  const filteredItems = selectedTab === 'All' 
    ? downloadedItems 
    : downloadedItems.filter(item => {
        const typeMap: { [key: string]: string } = {
          'Books': 'book',
          'Podcasts': 'podcast',
          'Music': 'music',
          'Documents': 'document'
        };
        return item.type === typeMap[selectedTab];
      });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Downloads</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search downloads..."
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

      {/* Downloads List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.itemCard}>
            <Image source={{ uri: item.cover }} style={styles.itemCover} />
            
            <View style={styles.itemInfo}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
                <View style={[styles.typeBadge, { backgroundColor: getTypeColor(item.type) }]}>
                  {getTypeIcon(item.type)}
                </View>
              </View>
              
              <Text style={styles.itemAuthor}>{item.author}</Text>
              
              <View style={styles.itemMeta}>
                <Text style={styles.itemSize}>{item.size}</Text>
                <Text style={styles.itemDate}>
                  Downloaded {new Date(item.downloadDate).toLocaleDateString()}
                </Text>
                {item.isPurchased && (
                  <View style={styles.purchasedBadge}>
                    <Text style={styles.purchasedText}>Purchased</Text>
                  </View>
                )}
              </View>
            </View>

            <TouchableOpacity style={styles.downloadButton}>
              <Download size={20} color="#000000" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        {filteredItems.length === 0 && (
          <View style={styles.emptyState}>
            <Download size={48} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>No downloads yet</Text>
            <Text style={styles.emptyDescription}>
              Your downloaded content will appear here
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  placeholder: {
    width: 24,
  },
  searchContainer: {
    paddingHorizontal: 16,
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
    paddingHorizontal: 16,
    marginBottom: 16,
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
    paddingHorizontal: 16,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  itemCover: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  itemInfo: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
    marginRight: 8,
  },
  typeBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemAuthor: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  itemSize: {
    fontSize: 12,
    color: '#9CA3AF',
    marginRight: 12,
  },
  itemDate: {
    fontSize: 12,
    color: '#9CA3AF',
    marginRight: 12,
  },
  purchasedBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  purchasedText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  downloadButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});