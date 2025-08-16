import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  Star, 
  ThumbsUp, 
  ThumbsDown,
  MessageCircle,
  Filter,
  ChevronDown
} from 'lucide-react-native';

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  notHelpful: number;
  userVote: 'helpful' | 'not-helpful' | null;
  verified: boolean;
}

export default function ProductReviewsScreen() {
  const router = useRouter();
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [filterRating, setFilterRating] = useState('All');
  const [showFilterModal, setShowFilterModal] = useState(false);
  
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      userId: '1',
      userName: 'Sarah Johnson',
      userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      rating: 5,
      comment: 'Excellent course! The explanations are clear and the projects are very practical. Highly recommend for anyone starting with Python.',
      date: '2024-01-20',
      helpful: 23,
      notHelpful: 1,
      userVote: null,
      verified: true,
    },
    {
      id: '2',
      userId: '2',
      userName: 'Mike Chen',
      userAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      rating: 4,
      comment: 'Great content overall. Some sections could be more detailed, but the hands-on approach is fantastic.',
      date: '2024-01-18',
      helpful: 15,
      notHelpful: 3,
      userVote: 'helpful',
      verified: true,
    },
    {
      id: '3',
      userId: '3',
      userName: 'Emma Davis',
      userAvatar: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      rating: 5,
      comment: 'Perfect for beginners! The instructor explains complex concepts in simple terms. Worth every penny.',
      date: '2024-01-15',
      helpful: 31,
      notHelpful: 0,
      userVote: null,
      verified: false,
    },
  ]);

  const filterOptions = ['All', '5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'];

  const handleVoteHelpful = (reviewId: string, isHelpful: boolean) => {
    setReviews(prev => prev.map(review => {
      if (review.id === reviewId) {
        let newHelpful = review.helpful;
        let newNotHelpful = review.notHelpful;
        let newUserVote = isHelpful ? 'helpful' : 'not-helpful';

        // Remove previous vote if exists
        if (review.userVote === 'helpful') newHelpful--;
        if (review.userVote === 'not-helpful') newNotHelpful--;

        // Add new vote if different from previous
        if (review.userVote === newUserVote) {
          newUserVote = null; // Remove vote if same
        } else {
          if (isHelpful) newHelpful++;
          else newNotHelpful++;
        }

        return {
          ...review,
          helpful: newHelpful,
          notHelpful: newNotHelpful,
          userVote: newUserVote,
        };
      }
      return review;
    }));
  };

  const handleSubmitReview = () => {
    if (newRating > 0 && newComment.trim()) {
      Alert.alert('Success', 'Your review has been submitted!');
      setShowWriteReview(false);
      setNewRating(0);
      setNewComment('');
    } else {
      Alert.alert('Error', 'Please provide a rating and comment');
    }
  };

  const renderStars = (rating: number, interactive = false, onPress?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, i) => (
      <TouchableOpacity
        key={i}
        disabled={!interactive}
        onPress={() => onPress && onPress(i + 1)}
      >
        <Star
          size={interactive ? 24 : 16}
          color="#F59E0B"
          fill={i < rating ? "#F59E0B" : "transparent"}
        />
      </TouchableOpacity>
    ));
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => 
    reviews.filter(review => review.rating === rating).length
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reviews</Text>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilterModal(true)}
        >
          <Filter size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Rating Summary */}
        <View style={styles.ratingSummary}>
          <View style={styles.averageRating}>
            <Text style={styles.averageRatingNumber}>{averageRating.toFixed(1)}</Text>
            <View style={styles.averageStars}>
              {renderStars(Math.round(averageRating))}
            </View>
            <Text style={styles.totalReviews}>{reviews.length} reviews</Text>
          </View>
          
          <View style={styles.ratingDistribution}>
            {ratingDistribution.map((count, index) => (
              <View key={index} style={styles.distributionRow}>
                <Text style={styles.distributionLabel}>{5 - index}</Text>
                <Star size={12} color="#F59E0B" fill="#F59E0B" />
                <View style={styles.distributionBar}>
                  <View 
                    style={[
                      styles.distributionFill, 
                      { width: `${(count / reviews.length) * 100}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.distributionCount}>{count}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Write Review Button */}
        <TouchableOpacity 
          style={styles.writeReviewButton}
          onPress={() => setShowWriteReview(true)}
        >
          <MessageCircle size={20} color="#FFFFFF" />
          <Text style={styles.writeReviewText}>Write a Review</Text>
        </TouchableOpacity>

        {/* Reviews List */}
        <View style={styles.reviewsSection}>
          {reviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewerInfo}>
                  <Image source={{ uri: review.userAvatar }} style={styles.reviewerAvatar} />
                  <View>
                    <View style={styles.reviewerNameRow}>
                      <Text style={styles.reviewerName}>{review.userName}</Text>
                      {review.verified && (
                        <View style={styles.verifiedBadge}>
                          <Text style={styles.verifiedText}>✓</Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.reviewStars}>
                      {renderStars(review.rating)}
                    </View>
                  </View>
                </View>
                <Text style={styles.reviewDate}>
                  {new Date(review.date).toLocaleDateString()}
                </Text>
              </View>
              
              <Text style={styles.reviewComment}>{review.comment}</Text>
              
              <View style={styles.reviewActions}>
                <TouchableOpacity
                  style={[
                    styles.helpfulButton,
                    review.userVote === 'helpful' && styles.helpfulButtonActive,
                  ]}
                  onPress={() => handleVoteHelpful(review.id, true)}
                >
                  <ThumbsUp 
                    size={16} 
                    color={review.userVote === 'helpful' ? '#10B981' : '#9CA3AF'} 
                  />
                  <Text style={[
                    styles.helpfulText,
                    review.userVote === 'helpful' && styles.helpfulTextActive,
                  ]}>
                    Helpful ({review.helpful})
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.helpfulButton,
                    review.userVote === 'not-helpful' && styles.notHelpfulButtonActive,
                  ]}
                  onPress={() => handleVoteHelpful(review.id, false)}
                >
                  <ThumbsDown 
                    size={16} 
                    color={review.userVote === 'not-helpful' ? '#EF4444' : '#9CA3AF'} 
                  />
                  <Text style={[
                    styles.helpfulText,
                    review.userVote === 'not-helpful' && styles.notHelpfulTextActive,
                  ]}>
                    ({review.notHelpful})
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Write Review Modal */}
      <Modal
        visible={showWriteReview}
        transparent
        animationType="slide"
        onRequestClose={() => setShowWriteReview(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.writeReviewModal}>
            <View style={styles.writeReviewHeader}>
              <Text style={styles.writeReviewTitle}>Write a Review</Text>
              <TouchableOpacity onPress={() => setShowWriteReview(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.ratingSelector}>
              <Text style={styles.ratingSelectorTitle}>Your Rating</Text>
              <View style={styles.interactiveStars}>
                {renderStars(newRating, true, setNewRating)}
              </View>
            </View>
            
            <TextInput
              style={styles.reviewInput}
              placeholder="Share your experience with this product..."
              placeholderTextColor="#9CA3AF"
              value={newComment}
              onChangeText={setNewComment}
              multiline
              textAlignVertical="top"
            />
            
            <TouchableOpacity style={styles.submitReviewButton} onPress={handleSubmitReview}>
              <Text style={styles.submitReviewText}>Submit Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Reviews</Text>
            
            {filterOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.filterOption,
                  filterRating === option && styles.selectedFilterOption,
                ]}
                onPress={() => {
                  setFilterRating(option);
                  setShowFilterModal(false);
                }}
              >
                <Text style={[
                  styles.filterOptionText,
                  filterRating === option && styles.selectedFilterText,
                ]}>
                  {option}
                </Text>
                {filterRating === option && (
                  <View style={styles.selectedIndicator} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
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
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  filterButton: {
    width: 40,
    height: 40,
    backgroundColor: '#374151',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  ratingSummary: {
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  averageRating: {
    flex: 1,
    alignItems: 'center',
    paddingRight: 20,
    borderRightWidth: 1,
    borderRightColor: '#374151',
  },
  averageRatingNumber: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  averageStars: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  totalReviews: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  ratingDistribution: {
    flex: 1,
    paddingLeft: 20,
  },
  distributionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  distributionLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    width: 8,
  },
  distributionBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  distributionFill: {
    height: '100%',
    backgroundColor: '#F59E0B',
  },
  distributionCount: {
    color: '#9CA3AF',
    fontSize: 12,
    width: 16,
    textAlign: 'right',
  },
  writeReviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B5CF6',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  writeReviewText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  reviewsSection: {
    paddingHorizontal: 16,
  },
  reviewCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reviewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  reviewerName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  verifiedBadge: {
    backgroundColor: '#10B981',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  reviewStars: {
    flexDirection: 'row',
  },
  reviewDate: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  reviewComment: {
    color: '#E5E7EB',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  reviewActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  helpfulButtonActive: {
    backgroundColor: '#065F46',
  },
  notHelpfulButtonActive: {
    backgroundColor: '#7F1D1D',
  },
  helpfulText: {
    color: '#9CA3AF',
    fontSize: 12,
    marginLeft: 4,
  },
  helpfulTextActive: {
    color: '#10B981',
  },
  notHelpfulTextActive: {
    color: '#EF4444',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  writeReviewModal: {
    backgroundColor: '#1F2937',
    borderRadius: 20,
    padding: 20,
  },
  writeReviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  writeReviewTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    color: '#9CA3AF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  ratingSelector: {
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingSelectorTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 12,
  },
  interactiveStars: {
    flexDirection: 'row',
  },
  reviewInput: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    minHeight: 100,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  submitReviewButton: {
    backgroundColor: '#8B5CF6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitReviewText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContent: {
    backgroundColor: '#1F2937',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  filterOption: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#374151',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedFilterOption: {
    backgroundColor: '#8B5CF6',
  },
  filterOptionText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  selectedFilterText: {
    fontWeight: '600',
  },
  selectedIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
});