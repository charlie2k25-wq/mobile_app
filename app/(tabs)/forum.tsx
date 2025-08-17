import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronUp, MessageCircle, TrendingUp, Clock, ChartBar as BarChart3 } from 'lucide-react-native';
import TopNavigation from '@/components/TopNavigation';
import FloatingActionButton from '@/components/FloatingActionButton';

interface ForumPost {
  id: string;
  title: string;
  author: string;
  upvotes: number;
  comments: number;
  userVote: 'up' | null;
}

export default function ForumScreen() {
  const [selectedFilter, setSelectedFilter] = useState('Trending');
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([
    {
      id: '1',
      title: 'What\'s the best way to study for finals?',
      author: 'Student123',
      upvotes: 20,
      comments: 5,
      userVote: null,
    },
    {
      id: '2',
      title: 'Which study method do you prefer?',
      author: 'TeacherPro',
      upvotes: 45,
      comments: 8,
      userVote: null,
    },
  ]);

  const filters = [
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'recent', label: 'Recent', icon: Clock },
    { id: 'top', label: 'Top', icon: BarChart3 },
  ];

  const handleVote = (postId: string) => {
    setForumPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const isVoted = post.userVote === 'up';
        return {
          ...post,
          upvotes: isVoted ? post.upvotes - 1 : post.upvotes + 1,
          userVote: isVoted ? null : 'up',
        };
      }
      return post;
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation />
      
      {/* Page Header */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Forum</Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filtersContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterTab,
              selectedFilter === filter.label && styles.selectedFilterTab,
            ]}
            onPress={() => setSelectedFilter(filter.label)}
          >
            <filter.icon 
              size={16} 
              color={selectedFilter === filter.label ? '#000000' : '#6B7280'} 
            />
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter.label && styles.selectedFilterText,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Forum Posts */}
      <ScrollView style={styles.forumList} showsVerticalScrollIndicator={false}>
        {forumPosts.map((post) => (
          <View key={post.id} style={styles.forumCard}>
            <View style={styles.postContent}>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postAuthor}>{post.author}</Text>
            </View>

            <View style={styles.postActions}>
              <TouchableOpacity
                style={[
                  styles.voteButton,
                  post.userVote === 'up' && styles.votedButton,
                ]}
                onPress={() => handleVote(post.id)}
              >
                <ChevronUp
                  size={20}
                  color={post.userVote === 'up' ? '#10B981' : '#6B7280'}
                />
                <Text style={[
                  styles.voteText,
                  post.userVote === 'up' && styles.votedText,
                ]}>
                  {post.upvotes}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.commentsButton}>
                <MessageCircle size={18} color="#6B7280" />
                <Text style={styles.commentsText}>{post.comments}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
  pageHeader: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  selectedFilterTab: {
    backgroundColor: '#E5E7EB',
  },
  filterText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  selectedFilterText: {
    color: '#000000',
    fontWeight: '600',
  },
  forumList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  forumCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  postContent: {
    marginBottom: 12,
  },
  postTitle: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 8,
  },
  postAuthor: {
    color: '#6B7280',
    fontSize: 14,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  voteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  votedButton: {
    backgroundColor: '#ECFDF5',
  },
  voteText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  votedText: {
    color: '#10B981',
  },
  commentsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  commentsText: {
    color: '#6B7280',
    fontSize: 14,
    marginLeft: 6,
  },
});