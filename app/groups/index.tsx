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
import { ArrowLeft, Search, Users, Lock, Globe, Plus, Clock, BookOpen } from 'lucide-react-native';

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  subject: string;
  creator: string;
  creatorAvatar: string;
  membersCount: number;
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
  
  const [studyGroups] = useState<StudyGroup[]>([
    {
      id: '1',
      name: 'Advanced Mathematics Study Circle',
      description: 'Weekly sessions covering calculus, linear algebra, and statistics. Perfect for university-level math students.',
      subject: 'Mathematics',
      creator: 'Prof. Sarah Chen',
      creatorAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      membersCount: 24,
      maxMembers: 30,
      isPrivate: false,
      isJoined: false,
      lastActivity: '2 hours ago',
      category: 'STEM',
    },
    {
      id: '2',
      name: 'Python Programming Bootcamp',
      description: 'Learn Python from basics to advanced topics. Hands-on coding sessions every Tuesday and Thursday.',
      subject: 'Programming',
      creator: 'Alex Rodriguez',
      creatorAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      membersCount: 18,
      maxMembers: 25,
      isPrivate: false,
      isJoined: true,
      lastActivity: '1 hour ago',
      category: 'Technology',
    },
    {
      id: '3',
      name: 'Medical School Prep Group',
      description: 'MCAT preparation and medical school application guidance. Exclusive group for serious pre-med students.',
      subject: 'Medicine',
      creator: 'Dr. Emily Watson',
      creatorAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      membersCount: 12,
      maxMembers: 15,
      isPrivate: true,
      isJoined: false,
      lastActivity: '3 hours ago',
      category: 'Health',
    },
    {
      id: '4',
      name: 'Literature Discussion Club',
      description: 'Analyzing classic and contemporary literature. Monthly book discussions and essay writing workshops.',
      subject: 'Literature',
      creator: 'Prof. James Wilson',
      creatorAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      membersCount: 16,
      maxMembers: 20,
      isPrivate: false,
      isJoined: false,
      lastActivity: '5 hours ago',
      category: 'Humanities',
    },
  ];

  const categories = ['All', 'STEM', 'Technology', 'Health', 'Humanities', 'Business'];

  const handleJoinGroup = (groupId: string) => {
    console.log('Joining group:', groupId);
  };

  const filteredGroups = studyGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || group.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Study Groups</Text>
        <TouchableOpacity style={styles.createButton}>
          <Plus size={20} color="#FFFFFF" />
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
      </View>

      {/* Category Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryTab,
              selectedCategory === category && styles.selectedCategoryTab,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Study Groups List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredGroups.map((group) => (
          <View key={group.id} style={styles.groupCard}>
            <View style={styles.groupHeader}>
              <View style={styles.groupInfo}>
                <View style={styles.groupTitleRow}>
                  <Text style={styles.groupName} numberOfLines={2}>{group.name}</Text>
                  <View style={styles.groupBadges}>
                    {group.isPrivate ? (
                      <View style={styles.privateBadge}>
                        <Lock size={12} color="#6B7280" />
                      </View>
                    ) : (
                      <View style={styles.publicBadge}>
                        <Globe size={12} color="#10B981" />
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.subjectContainer}>
                  <BookOpen size={14} color="#8B5CF6" />
                  <Text style={styles.groupSubject}>{group.subject}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.groupDescription} numberOfLines={3}>{group.description}</Text>

            <View style={styles.groupMeta}>
              <View style={styles.creatorInfo}>
                <Image source={{ uri: group.creatorAvatar }} style={styles.creatorAvatar} />
                <View>
                  <Text style={styles.creatorName}>{group.creator}</Text>
                  <View style={styles.activityInfo}>
                    <Clock size={12} color="#9CA3AF" />
                    <Text style={styles.lastActivity}>{group.lastActivity}</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.membersInfo}>
                <Users size={16} color="#6B7280" />
                <Text style={styles.membersText}>
                  {group.membersCount}/{group.maxMembers}
                </Text>
              </View>
            </View>

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
                {group.isJoined ? 'Joined' : 'Join Group'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        {filteredGroups.length === 0 && (
          <View style={styles.emptyState}>
            <Users size={48} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>No study groups found</Text>
            <Text style={styles.emptyDescription}>
              Try adjusting your search or browse different categories
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
  createButton: {
    width: 36,
    height: 36,
    backgroundColor: '#000000',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
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
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  selectedCategoryTab: {
    backgroundColor: '#000000',
  },
  categoryText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  groupCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  groupHeader: {
    marginBottom: 12,
  },
  groupInfo: {
    flex: 1,
  },
  groupTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    flex: 1,
    marginRight: 12,
  },
  groupBadges: {
    flexDirection: 'row',
  },
  privateBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  publicBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subjectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  groupSubject: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '500',
    marginLeft: 6,
  },
  groupDescription: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 16,
  },
  groupMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  creatorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  creatorAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  creatorName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  activityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastActivity: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 4,
  },
  membersInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  membersText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    marginLeft: 4,
  },
  joinButton: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
  },
  joinedButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  joinedButtonText: {
    color: '#6B7280',
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
    paddingHorizontal: 32,
  },
});