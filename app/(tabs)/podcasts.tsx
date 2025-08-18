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
import { Search, Play, Pause, SkipBack, SkipForward } from 'lucide-react-native';
import TopNavigation from '@/components/TopNavigation';
import FloatingActionButton from '@/components/FloatingActionButton';

interface Podcast {
  id: string;
  title: string;
  author: string;
  cover: string;
  duration: string;
  category: string;
  isPlaying: boolean;
}

export default function PodcastsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('For You');
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>({
    id: '1',
    title: 'The Future of Education',
    author: 'Dr. Sarah Johnson',
    cover: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    duration: '45:32',
    category: 'Education',
    isPlaying: false,
  });

  const [trendingPodcasts] = useState<Podcast[]>([
    {
      id: '1',
      title: 'The Future of Education',
      author: 'Dr. Sarah Johnson',
      cover: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      duration: '45:32',
      category: 'Education',
      isPlaying: false,
    },
    {
      id: '2',
      title: 'Learning Psychology',
      author: 'Prof. Michael Davis',
      cover: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      duration: '38:15',
      category: 'Psychology',
      isPlaying: false,
    },
    {
      id: '3',
      title: 'Science Simplified',
      author: 'Emma Thompson',
      cover: 'https://images.pexels.com/photos/2249531/pexels-photo-2249531.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      duration: '52:20',
      category: 'Science',
      isPlaying: false,
    },
  ]);

  const tabs = ['For You', 'Top Charts', 'Categories', "Editor's Choice"];

  const togglePlay = () => {
    if (currentPodcast) {
      setCurrentPodcast({
        ...currentPodcast,
        isPlaying: !currentPodcast.isPlaying,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation />
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search podcasts..."
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
        {/* Current Playing Podcast */}
        {currentPodcast && (
          <View style={styles.currentPodcastContainer}>
            <View style={styles.currentPodcastInfo}>
              <Image source={{ uri: currentPodcast.cover }} style={styles.currentPodcastCover} />
              <View style={styles.currentPodcastDetails}>
                <Text style={styles.currentPodcastTitle}>{currentPodcast.title}</Text>
                <Text style={styles.currentPodcastAuthor}>{currentPodcast.author}</Text>
              </View>
              <View style={styles.playbackControls}>
                <TouchableOpacity style={styles.controlButton}>
                  <SkipBack size={24} color="#000000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.playButton} onPress={togglePlay}>
                  {currentPodcast.isPlaying ? (
                    <Pause size={24} color="#FFFFFF" />
                  ) : (
                    <Play size={24} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton}>
                  <SkipForward size={24} color="#000000" />
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <Text style={styles.progressTime}>0:00</Text>
              <View style={styles.progressBar}>
                <View style={styles.progressFill} />
                <View style={styles.progressHandle} />
              </View>
              <Text style={styles.progressTime}>0:00</Text>
            </View>
          </View>
        )}

        {/* Trending Podcasts Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Podcasts</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See all</Text>
              <Text style={styles.seeAllArrow}>›</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.podcastGrid}>
            {trendingPodcasts.map((podcast) => (
              <TouchableOpacity key={podcast.id} style={styles.podcastCard}>
                <Image source={{ uri: podcast.cover }} style={styles.podcastCover} />
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
  currentPodcastContainer: {
    backgroundColor: '#F9FAFB',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  currentPodcastInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  currentPodcastCover: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  currentPodcastDetails: {
    flex: 1,
  },
  currentPodcastTitle: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  currentPodcastAuthor: {
    color: '#6B7280',
    fontSize: 14,
  },
  playbackControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    padding: 8,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressTime: {
    color: '#6B7280',
    fontSize: 12,
    width: 40,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginHorizontal: 12,
    position: 'relative',
  },
  progressFill: {
    width: '20%',
    height: '100%',
    backgroundColor: '#000000',
    borderRadius: 2,
  },
  progressHandle: {
    position: 'absolute',
    left: '20%',
    top: -4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#000000',
    marginLeft: -6,
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
  podcastGrid: {
    paddingLeft: 20,
  },
  podcastCard: {
    marginRight: 16,
  },
  podcastCover: {
    width: 160,
    height: 160,
    borderRadius: 12,
  },
});