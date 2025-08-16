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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  Brain, 
  Plus, 
  Search,
  Filter,
  Clock,
  Trophy,
  Target,
  Play,
  ChevronDown,
  Star
} from 'lucide-react-native';

interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: number;
  duration: number; // in minutes
  creator: string;
  creatorAvatar: string;
  attempts: number;
  rating: number;
  isCompleted: boolean;
  bestScore?: number;
  createdAt: string;
}

export default function QuizScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: '1',
      title: 'Python Fundamentals Assessment',
      description: 'Test your knowledge of Python basics including variables, functions, loops, and data structures.',
      category: 'Programming',
      difficulty: 'Medium',
      questions: 25,
      duration: 30,
      creator: 'Dr. Sarah Chen',
      creatorAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      attempts: 1234,
      rating: 4.8,
      isCompleted: true,
      bestScore: 85,
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      title: 'Calculus Mastery Challenge',
      description: 'Advanced calculus problems covering limits, derivatives, integrals, and applications.',
      category: 'Mathematics',
      difficulty: 'Hard',
      questions: 20,
      duration: 45,
      creator: 'Prof. Michael Davis',
      creatorAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      attempts: 892,
      rating: 4.9,
      isCompleted: false,
      createdAt: '2024-01-10',
    },
    {
      id: '3',
      title: 'English Grammar Quick Test',
      description: 'Quick assessment of English grammar rules, tenses, and sentence structure.',
      category: 'Language',
      difficulty: 'Easy',
      questions: 15,
      duration: 20,
      creator: 'Emma Thompson',
      creatorAvatar: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      attempts: 2156,
      rating: 4.6,
      isCompleted: true,
      bestScore: 92,
      createdAt: '2024-01-20',
    },
  ]);

  const categories = ['All', 'Programming', 'Mathematics', 'Language', 'Science', 'History', 'Business'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return '#10B981';
      case 'Medium':
        return '#F59E0B';
      case 'Hard':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        color="#F59E0B"
        fill={i < Math.floor(rating) ? "#F59E0B" : "transparent"}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quizzes</Text>
        <TouchableOpacity style={styles.createButton}>
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search quizzes..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowCategoryModal(true)}
        >
          <Filter size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.selectedCategoryChip,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category.charAt(0)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Quizzes List */}
      <ScrollView style={styles.quizzesList} showsVerticalScrollIndicator={false}>
        {quizzes.map((quiz) => (
          <View key={quiz.id} style={styles.quizCard}>
            <View style={styles.quizHeader}>
              <View style={styles.quizMeta}>
                <Text style={styles.quizCategory}>{quiz.category}</Text>
                <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(quiz.difficulty) }]}>
                  <Text style={styles.difficultyText}>{quiz.difficulty}</Text>
                </View>
              </View>
              {quiz.isCompleted && (
                <View style={styles.completedBadge}>
                  <Trophy size={12} color="#FFFFFF" />
                  <Text style={styles.completedText}>Completed</Text>
                </View>
              )}
            </View>

            <Text style={styles.quizTitle}>{quiz.title}</Text>
            <Text style={styles.quizDescription} numberOfLines={2}>
              {quiz.description}
            </Text>

            <View style={styles.creatorInfo}>
              <Image source={{ uri: quiz.creatorAvatar }} style={styles.creatorAvatar} />
              <Text style={styles.creatorName}>by {quiz.creator}</Text>
            </View>

            <View style={styles.quizStats}>
              <View style={styles.statItem}>
                <Target size={14} color="#9CA3AF" />
                <Text style={styles.statText}>{quiz.questions} questions</Text>
              </View>
              <View style={styles.statItem}>
                <Clock size={14} color="#9CA3AF" />
                <Text style={styles.statText}>{quiz.duration} min</Text>
              </View>
              <View style={styles.statItem}>
                <Users size={14} color="#9CA3AF" />
                <Text style={styles.statText}>{quiz.attempts} attempts</Text>
              </View>
            </View>

            <View style={styles.ratingContainer}>
              {renderStars(quiz.rating)}
              <Text style={styles.ratingText}>{quiz.rating}</Text>
            </View>

            <View style={styles.quizFooter}>
              {quiz.isCompleted && quiz.bestScore && (
                <View style={styles.scoreContainer}>
                  <Text style={styles.scoreLabel}>Best Score:</Text>
                  <Text style={styles.scoreValue}>{quiz.bestScore}%</Text>
                </View>
              )}
              
              <TouchableOpacity style={styles.startButton}>
                <Play size={16} color="#FFFFFF" />
                <Text style={styles.startButtonText}>
                  {quiz.isCompleted ? 'Retake' : 'Start Quiz'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Category Modal */}
      <Modal
        visible={showCategoryModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Category</Text>
            
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryOption,
                  selectedCategory === category && styles.selectedCategoryOption,
                ]}
                onPress={() => {
                  setSelectedCategory(category);
                  setShowCategoryModal(false);
                }}
              >
                <Text style={[
                  styles.categoryOptionText,
                  selectedCategory === category && styles.selectedCategoryText,
                ]}>
                  {category}
                </Text>
                {selectedCategory === category && (
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
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  categoryChip: {
    width: 32,
    height: 32,
    backgroundColor: '#374151',
    borderRadius: 16,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCategoryChip: {
    backgroundColor: '#8B5CF6',
  },
  categoryText: {
    color: '#9CA3AF',
    fontSize: 10,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  quizzesList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  quizCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#374151',
  },
  quizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  quizMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quizCategory: {
    color: '#8B5CF6',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 8,
  },
  difficultyBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  difficultyText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  completedText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 2,
  },
  quizTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 8,
  },
  quizDescription: {
    color: '#E5E7EB',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  creatorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  creatorAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6,
  },
  creatorName: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  quizStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    color: '#9CA3AF',
    fontSize: 12,
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingText: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  quizFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreLabel: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  scoreValue: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
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
  categoryOption: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#374151',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedCategoryOption: {
    backgroundColor: '#8B5CF6',
  },
  categoryOptionText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  selectedCategoryText: {
    fontWeight: '600',
  },
  selectedIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
});