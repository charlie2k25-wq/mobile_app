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
  Users, 
  Plus, 
  Search,
  Filter,
  Lock,
  Globe,
  MessageCircle,
  Calendar,
  ChevronDown
} from 'lucide-react-native';

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  subject: string;
  creator: string;
  creatorAvatar: string;
  members: number;
  maxMembers: number;
  isPrivate: boolean;
  isJoined: boolean;
  lastActivity: string;
  category: string;
}

export default function StudyGroupsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([
    {
      id: '1',
      name: 'Advanced Calculus Study Group',
      description: 'Weekly sessions covering limits, derivatives, integrals, and applications. Perfect for university-level mathematics.',
      subject: 'Mathematics',
      creator: 'Prof. Michael Davis',
      creatorAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      members: 23,
      maxMembers: 30,
      isPrivate: false,
      isJoined: true,
      lastActivity: '2h ago',
      category: 'Mathematics',
    },
    {
      id: '2',
      name: 'Python Programming Bootcamp',
      description: 'Learn Python from scratch with hands-on projects. Covers basics to advanced topics including web development.',
      subject: 'Programming',
      creator: 'Dr. Sarah Chen',
      creatorAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      members: 45,
      maxMembers: 50,
      isPrivate: false,
      isJoined: false,
      lastActivity: '1h ago',
      category: 'Programming',
    },
    {
      id: '3',
      name: 'IELTS Preparation Circle',
      description: 'Private group for IELTS test preparation. Daily practice sessions and mock tests.',
      subject: 'Language',
      creator: 'Emma Thompson',
      creatorAvatar: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      members: 12,
      maxMembers: 15,
      isPrivate: true,
      isJoined: false,
      lastActivity: '30m ago',
      category: 'Language',
    },
  ]);

  const categories = ['All', 'Mathematics', 'Programming', 'Language', 'Science', 'Business', 'Arts'];

  const handleJoinGroup = (groupId: string) => {
    setStudyGroups(prev => prev.map(group => 
      group.id === groupId 
        ? { 
            ...group, 
            isJoined: !group.isJoined,
            members: group.isJoined ? group.members - 1 : group.members + 1
          }
        : group
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Study Groups</Text>
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
            placeholder="Search study groups..."
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

      {/* Study Groups List */}
      <ScrollView style={styles.groupsList} showsVerticalScrollIndicator={false}>
        {studyGroups.map((group) => (
          <View key={group.id} style={styles.groupCard}>
            <View style={styles.groupHeader}>
              <View style={styles.groupMeta}>
                <Text style={styles.groupCategory}>{group.category}</Text>
                <View style={styles.privacyIndicator}>
                  {group.isPrivate ? (
                    <Lock size={12} color="#F59E0B" />
                  ) : (
                    <Globe size={12} color="#10B981" />
                  )}
                  <Text style={styles.privacyText}>
                    {group.isPrivate ? 'Private' : 'Public'}
                  </Text>
                </View>
              </View>
              <Text style={styles.lastActivity}>{group.lastActivity}</Text>
            </View>

            <Text style={styles.groupName}>{group.name}</Text>
            <Text style={styles.groupDescription} numberOfLines={2}>
              {group.description}
            </Text>

            <View style={styles.creatorInfo}>
              <Image source={{ uri: group.creatorAvatar }} style={styles.creatorAvatar} />
              <Text style={styles.creatorName}>Created by {group.creator}</Text>
            </View>

            <View style={styles.groupFooter}>
              <View style={styles.memberInfo}>
                <Users size={16} color="#9CA3AF" />
                <Text style={styles.memberText}>
                  {group.members}/{group.maxMembers} members
                </Text>
              </View>

              <View style={styles.groupActions}>
                <TouchableOpacity style={styles.chatButton}>
                  <MessageCircle size={16} color="#9CA3AF" />
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.joinButton,
                    group.isJoined && styles.joinedButton,
                  ]}
                  onPress={() => handleJoinGroup(group.id)}
                >
                  <Text style={[
                    styles.joinButtonText,
                    group.isJoined && styles.joinedButtonText,
                  ]}>
                    {group.isJoined ? 'Joined' : 'Join'}
                  </Text>
                </TouchableOpacity>
              </View>
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
  groupsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  groupCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#374151',
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  groupMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupCategory: {
    color: '#8B5CF6',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 12,
  },
  privacyIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  privacyText: {
    color: '#9CA3AF',
    fontSize: 10,
    marginLeft: 4,
  },
  lastActivity: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  groupName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 8,
  },
  groupDescription: {
    color: '#E5E7EB',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  creatorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  creatorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  creatorName: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  groupFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberText: {
    color: '#9CA3AF',
    fontSize: 14,
    marginLeft: 6,
  },
  groupActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatButton: {
    width: 36,
    height: 36,
    backgroundColor: '#374151',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  joinButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  joinedButton: {
    backgroundColor: '#10B981',
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  joinedButtonText: {
    color: '#FFFFFF',
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