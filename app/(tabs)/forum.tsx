import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronUp, ChevronDown, MessageCircle, Plus, Filter, Flame, TrendingUp } from 'lucide-react-native';
import FloatingActionButton from '@/components/FloatingActionButton';

interface ForumPost {
  id: string;
  title: string;
  author: string;
  category: string;
  content: string;
  upvotes: number;
  downvotes: number;
  comments: number;
  timestamp: string;
  userVote: 'up' | 'down' | null;
  isHot: boolean;
}

export default function ForumScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Hot');
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([
    {
      id: '1',
      title: 'What are the best memory techniques for studying complex mathematical concepts?',
      author: 'StudentLearner23',
      category: 'Study Tips',
      content: 'I\'m struggling with calculus and need effective memory techniques. Has anyone tried mind mapping or spaced repetition for math?',
      upvotes: 45,
      downvotes: 2,
      comments: 23,
      timestamp: '3h ago',
      userVote: null,
      isHot: true,
    },
    {
      id: '2',
      title: 'Recommended podcasts for learning programming languages?',
      author: 'CodeNewbie',
      category: 'Programming',
      content: 'Looking for quality podcasts that teach JavaScript, Python, and React. Any suggestions?',
      upvotes: 38,
      downvotes: 1,
      comments: 19,
      timestamp: '5h ago',
      userVote: 'up',
      isHot: true,
    },
    {
      id: '3',
      title: 'How to stay motivated during long study sessions?',
      author: 'MotivatedLearner',
      category: 'Motivation',
      content: 'I find myself losing focus after 2 hours of studying. What techniques do you use to maintain concentration?',
      upvotes: 67,
      downvotes: 3,
      comments: 34,
      timestamp: '8h ago',
      userVote: null,
      isHot: false,
    },
  ]);

  const filters = ['Hot', 'New', 'Top', 'Trending'];
  const categories = ['All', 'Study Tips', 'Programming', 'Mathematics', 'Science', 'Motivation'];

  const handleVote = (postId: string, voteType: 'up' | 'down') => {
    setForumPosts(prev => prev.map(post => {
      if (post.id === postId) {
        let newUpvotes = post.upvotes;
        let newDownvotes = post.downvotes;
        let newUserVote = voteType;

        if (post.userVote === voteType) {
          // Remove vote
          newUserVote = null;
          if (voteType === 'up') newUpvotes--;
          else newDownvotes--;
        } else {
          // Change or add vote
          if (post.userVote === 'up') newUpvotes--;
          if (post.userVote === 'down') newDownvotes--;
          
          if (voteType === 'up') newUpvotes++;
          else newDownvotes++;
        }

        return {
          ...post,
          upvotes: newUpvotes,
          downvotes: newDownvotes,
          userVote: newUserVote,
        };
      }
      return post;
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Forum</Text>
        <TouchableOpacity style={styles.createButton}>
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search discussions..."
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
            {filter === 'Hot' && <Flame size={16} color={selectedFilter === filter ? '#FFFFFF' : '#9CA3AF'} />}
            {filter === 'Trending' && <TrendingUp size={16} color={selectedFilter === filter ? '#FFFFFF' : '#9CA3AF'} />}
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

      {/* Forum Posts */}
      <ScrollView style={styles.forumList} showsVerticalScrollIndicator={false}>
        {forumPosts.map((post) => (
          <View key={post.id} style={styles.forumCard}>
            <View style={styles.postHeader}>
              <View style={styles.postMeta}>
                <Text style={styles.categoryTag}>{post.category}</Text>
                {post.isHot && (
                  <View style={styles.hotBadge}>
                    <Flame size={12} color="#FFFFFF" />
                    <Text style={styles.hotText}>Hot</Text>
                  </View>
                )}
              </View>
              <Text style={styles.timestamp}>{post.timestamp}</Text>
            </View>

            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postContent} numberOfLines={2}>
              {post.content}
            </Text>
            <Text style={styles.authorText}>by {post.author}</Text>

            <View style={styles.postFooter}>
              <View style={styles.votingContainer}>
                <TouchableOpacity
                  style={[styles.voteButton, post.userVote === 'up' && styles.upvotedButton]}
                  onPress={() => handleVote(post.id, 'up')}
                >
                  <ChevronUp
                    size={20}
                    color={post.userVote === 'up' ? '#10B981' : '#9CA3AF'}
                  />
                  <Text style={[styles.voteText, post.userVote === 'up' && styles.upvotedText]}>
                    {post.upvotes}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.voteButton, post.userVote === 'down' && styles.downvotedButton]}
                  onPress={() => handleVote(post.id, 'down')}
                >
                  <ChevronDown
                    size={20}
                    color={post.userVote === 'down' ? '#EF4444' : '#9CA3AF'}
                  />
                  <Text style={[styles.voteText, post.userVote === 'down' && styles.downvotedText]}>
                    {post.downvotes}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.commentsButton}>
                <MessageCircle size={18} color="#9CA3AF" />
                <Text style={styles.commentsText}>{post.comments} replies</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  createButton: {
    width: 40,
    height: 40,
    backgroundColor: '#8B5CF6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#374151',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  searchInput: {
    color: '#FFFFFF',
    fontSize: 16,
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
    flexDirection: 'row',
    alignItems: 'center',
    width: 32,
    height: 32,
    backgroundColor: '#374151',
    borderRadius: 16,
    marginRight: 8,
    justifyContent: 'center',
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
  forumList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  forumCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#374151',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  postMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryTag: {
    color: '#8B5CF6',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 8,
  },
  hotBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  hotText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 2,
  },
  timestamp: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  postTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 8,
  },
  postContent: {
    color: '#E5E7EB',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  authorText: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 12,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  votingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  upvotedButton: {
    backgroundColor: '#065F46',
  },
  downvotedButton: {
    backgroundColor: '#7F1D1D',
  },
  voteText: {
    color: '#9CA3AF',
    fontSize: 14,
    marginLeft: 4,
  },
  upvotedText: {
    color: '#10B981',
  },
  downvotedText: {
    color: '#EF4444',
  },
  commentsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  commentsText: {
    color: '#9CA3AF',
    fontSize: 14,
    marginLeft: 6,
  },
});