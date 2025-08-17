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
import { Plus, Heart, MessageCircle, Share, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';
import TopNavigation from '@/components/TopNavigation';
import FloatingActionButton from '@/components/FloatingActionButton';

interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  type: 'story' | 'podcast' | 'achievement';
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

export default function HomeScreen() {
  const [posts] = useState<Post[]>([
    {
      id: '1',
      author: 'Dr. Sarah Chen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      content: 'Just finished recording Episode 47 of "Learning Psychology" - discussing the science behind spaced repetition and how it can improve your study habits by 300%!',
      type: 'podcast',
      timestamp: '2h ago',
      likes: 124,
      comments: 18,
      isLiked: false,
    },
    {
      id: '2',
      author: 'Alex Rodriguez',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      content: 'Achieved my 30-day reading streak! Currently diving deep into "Atomic Habits" - the insights on habit stacking are game-changing. Who else is reading this?',
      type: 'achievement',
      timestamp: '4h ago',
      likes: 89,
      comments: 12,
      isLiked: true,
    },
  ]);

  const [newPost, setNewPost] = useState('');

  const handleLike = (postId: string) => {
    // Handle like functionality
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'podcast':
        return '#8B5CF6';
      case 'achievement':
        return '#10B981';
      case 'story':
        return '#3B82F6';
      default:
        return '#6B7280';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'podcast':
        return 'Podcast Update';
      case 'achievement':
        return 'Achievement';
      case 'story':
        return 'Story';
      default:
        return 'Post';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation />

      {/* Page Header */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>EduSocial</Text>
      </View>

      {/* Create Post Section */}
      <View style={styles.createPostContainer}>
        <View style={styles.createPostInput}>
          <TextInput
            style={styles.postInput}
            placeholder="Share your learning journey..."
            placeholderTextColor="#9CA3AF"
            value={newPost}
            onChangeText={setNewPost}
            multiline
          />
        </View>
        <TouchableOpacity style={styles.postButton}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      {/* Timeline */}
      <ScrollView style={styles.timeline} showsVerticalScrollIndicator={false}>
        {posts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            {/* Post Header */}
            <View style={styles.postHeader}>
              <Image source={{ uri: post.avatar }} style={styles.avatar} />
              <View style={styles.postInfo}>
                <Text style={styles.authorName}>{post.author}</Text>
                <View style={styles.postMeta}>
                  <View style={[styles.typeTag, { backgroundColor: getTypeColor(post.type) }]}>
                    <Text style={styles.typeText}>{getTypeLabel(post.type)}</Text>
                  </View>
                  <Text style={styles.timestamp}>{post.timestamp}</Text>
                </View>
              </View>
              <TouchableOpacity>
                <MoreHorizontal size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            {/* Post Content */}
            <Text style={styles.postContent}>{post.content}</Text>

            {/* Post Actions */}
            <View style={styles.postActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleLike(post.id)}
              >
                <Heart
                  size={20}
                  color={post.isLiked ? '#EF4444' : '#9CA3AF'}
                  fill={post.isLiked ? '#EF4444' : 'transparent'}
                />
                <Text style={[styles.actionText, post.isLiked && styles.likedText]}>
                  {post.likes}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <MessageCircle size={20} color="#9CA3AF" />
                <Text style={styles.actionText}>{post.comments}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Share size={20} color="#9CA3AF" />
                <Text style={styles.actionText}>Share</Text>
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
    backgroundColor: '#F9FAFB',
  },
  pageHeader: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
  },
  createPostContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    alignItems: 'flex-end',
  },
  createPostInput: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  postInput: {
    color: '#000000',
    fontSize: 16,
    maxHeight: 80,
  },
  postButton: {
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  postButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  timeline: {
    flex: 1,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postInfo: {
    flex: 1,
  },
  authorName: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  postMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 8,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  timestamp: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  postContent: {
    color: '#374151',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  actionText: {
    color: '#9CA3AF',
    fontSize: 14,
    marginLeft: 6,
  },
  likedText: {
    color: '#EF4444',
  },
});