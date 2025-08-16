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
import { Search, Play, Pause, Heart, Upload, Star, ChevronRight } from 'lucide-react-native';
import TopNavigation from '@/components/TopNavigation';
import FloatingActionButton from '@/components/FloatingActionButton';

interface Podcast {
  id: string;
  title: string;
  author: string;
  avatar: string;
  cover: string;
  duration: string;
  category: string;
  likes: number;
  plays: number;
  rating: number;
  isPlaying: boolean;
  isLiked: boolean;
  isNew?: boolean;
  isRecommended?: boolean;
  isTopChart?: boolean;
}

interface PodcastSection {
  id: string;
  title: string;
  subtitle?: string;
  podcasts: Podcast[];
}

export default function PodcastsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('For you');
  
  const [allPodcasts] = useState<Podcast[]>([
    {
      id: '1',
      title: 'The Science of Learning',
      author: 'Dr. Sarah Chen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      cover: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      duration: '45:32',
      category: 'Psychology',
      likes: 234,
      plays: 1250,
      rating: 4.8,
      isPlaying: false,
      isLiked: false,
      isRecommended: true,
      isTopChart: true,
    },
    {
      id: '2',
      title: 'Mastering Mathematics',
      author: 'Prof. Michael Davis',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      cover: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      duration: '52:18',
      category: 'Mathematics',
      likes: 189,
      plays: 890,
      rating: 4.9,
      isPlaying: false,
      isLiked: true,
      isRecommended: true,
      isNew: true,
    },
    {
      id: '3',
      title: 'History Uncovered',
      author: 'Emma Thompson',
      avatar: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      cover: 'https://images.pexels.com/photos/2249531/pexels-photo-2249531.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      duration: '38:44',
      category: 'History',
      likes: 156,
      plays: 670,
      rating: 4.7,
      isPlaying: false,
      isLiked: false,
      isNew: true,
      isTopChart: true,
    },
    {
      id: '4',
      title: 'Code & Coffee',
      author: 'Alex Rivera',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      cover: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      duration: '28:15',
      category: 'Programming',
      likes: 312,
      plays: 1890,
      rating: 4.6,
      isPlaying: false,
      isLiked: false,
      isRecommended: true,
    },
    {
      id: '5',
      title: 'Philosophy Talks',
      author: 'Dr. James Wilson',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      cover: 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      duration: '41:22',
      category: 'Philosophy',
      likes: 98,
      plays: 445,
      rating: 4.5,
      isPlaying: false,
      isLiked: false,
      isNew: true,
    },
    {
      id: '6',
      title: 'Business Insights',
      author: 'Maria Garcia',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      cover: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      duration: '35:48',
      category: 'Business',
      likes: 167,
      plays: 723,
      rating: 4.4,
      isPlaying: false,
      isLiked: false,
      isTopChart: true,
    },
  ]);

  const tabs = ['For you', 'Top charts', 'Categories', "Editor's Choice"];

  const getSections = (): PodcastSection[] => {
    switch (selectedTab) {
      case 'For you':
        return [
          {
            id: 'recommended',
            title: 'Recommended for you',
            subtitle: 'Based on your listening history',
            podcasts: allPodcasts.filter(p => p.isRecommended),
          },
          {
            id: 'new',
            title: 'New & updated podcasts',
            subtitle: 'Fresh content from your favorite creators',
            podcasts: allPodcasts.filter(p => p.isNew),
          },
          {
            id: 'trending',
            title: 'Trending now',
            subtitle: 'Popular podcasts this week',
            podcasts: allPodcasts.slice(0, 4),
          },
        ];
      case 'Top charts':
        return [
          {
            id: 'top',
            title: 'Top podcasts',
            subtitle: 'Most popular this month',
            podcasts: allPodcasts.filter(p => p.isTopChart),
          },
        ];
      case 'Categories':
        return [
          {
            id: 'education',
            title: 'Education',
            podcasts: allPodcasts.filter(p => ['Psychology', 'Mathematics', 'Programming'].includes(p.category)),
          },
          {
            id: 'lifestyle',
            title: 'Lifestyle & Culture',
            podcasts: allPodcasts.filter(p => ['History', 'Philosophy', 'Business'].includes(p.category)),
          },
        ];
      default:
        return [
          {
            id: 'editors',
            title: "Editor's picks",
            subtitle: 'Hand-picked by our team',
            podcasts: allPodcasts.slice(0, 3),
          },
        ];
    }
  };

  const togglePlay = (podcastId: string) => {
    // Handle play/pause logic
  };

  const toggleLike = (podcastId: string) => {
    // Handle like logic
  };

  const renderPodcastItem = ({ item }: { item: Podcast }) => (
    <TouchableOpacity style={styles.podcastItem}>
      <View style={styles.coverContainer}>
        <Image source={{ uri: item.cover }} style={styles.podcastCover} />
        <TouchableOpacity 
          style={styles.playOverlay}
          onPress={() => togglePlay(item.id)}
        >
          {item.isPlaying ? (
            <Pause size={20} color="#FFFFFF" />
          ) : (
            <Play size={20} color="#FFFFFF" />
          )}
        </TouchableOpacity>
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
      </View>
      <Text style={styles.podcastTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.podcastAuthor} numberOfLines={1}>{item.author}</Text>
      <View style={styles.podcastMeta}>
        <View style={styles.ratingContainer}>
          <Star size={12} color="#F59E0B" fill="#F59E0B" />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
        <Text style={styles.duration}>{item.duration}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSection = (section: PodcastSection) => (
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
        data={section.podcasts}
        renderItem={renderPodcastItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.podcastGrid}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Podcasts</Text>
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
            placeholder="Search for podcasts & audio content"
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
  podcastGrid: {
    paddingLeft: 20,
  },
  itemSeparator: {
    width: 16,
  },
  podcastItem: {
    width: 140,
  },
  coverContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  podcastCover: {
    width: 140,
    height: 140,
    borderRadius: 12,
  },
  playOverlay: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
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
  podcastTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    marginBottom: 4,
  },
  podcastAuthor: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 6,
  },
  podcastMeta: {
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
  duration: {
    color: '#9CA3AF',
    fontSize: 12,
  },
});