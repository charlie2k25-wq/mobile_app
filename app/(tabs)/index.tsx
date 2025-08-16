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
    {
      id: '3',
      author: 'Emma Thompson',
      avatar: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      content: 'Starting a new study group for Advanced Calculus this Monday. We\'ll be covering limits, derivatives, and integrals. DM me if you want to join!',
      type: 'story',
      timestamp: '6h ago',
      likes: 45,
      comments: 8,
      isLiked: false,
    },
  ]);

  const [newPost, setNewPost] = useState('');

  const handleLike = (postId: string) => {
    // Handle like functionality
  };

  const handleComment = (postId: string) => {
    // Handle comment functionality
  };

  const handleShare = (postId: string) => {
    // Handle share functionality
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
      {/* Top Navigation */}
      <TopNavigation />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>EduSocial</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
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

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleComment(post.id)}
              >
                <MessageCircle size={20} color="#9CA3AF" />
                <Text style={styles.actionText}>{post.comments}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleShare(post.id)}
              >
                <Share size={20} color="#9CA3AF" />
                <Text style={styles.actionText}>Share</Text>
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
  addButton: {
    width: 40,
    height: 40,
    backgroundColor: '#8B5CF6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createPostContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
    alignItems: 'flex-end',
  },
  createPostInput: {
    flex: 1,
    backgroundColor: '#374151',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  postInput: {
    color: '#FFFFFF',
    fontSize: 16,
    maxHeight: 80,
  },
  postButton: {
    backgroundColor: '#8B5CF6',
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
    backgroundColor: '#1F2937',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#374151',
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
    color: '#FFFFFF',
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
    color: '#E5E7EB',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#374151',
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