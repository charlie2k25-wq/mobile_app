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
import { ArrowLeft, Search, Users, Lock, Globe, Plus } from 'lucide-react-native';

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
}

export default function StudyGroupsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  
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
    },
  ]);

  const handleJoinGroup = (groupId: string) => {
    // Handle join group logic
    console.log('Joining group:', groupId);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#000000" />
        </TouchableOpacity>
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
      </View>

      {/* Study Groups List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {studyGroups.map((group) => (
          <View key={group.id} style={styles.groupCard}>
            <View style={styles.groupHeader}>
              <View style={styles.groupInfo}>
                <View style={styles.groupTitleRow}>
                  <Text style={styles.groupName}>{group.name}</Text>
                  {group.isPrivate ? (
                    <Lock size={16} color="#6B7280" />
                  ) : (
                    <Globe size={16} color="#6B7280" />
                  )}
                </View>
                <Text style={styles.groupSubject}>{group.subject}</Text>
              </View>
            </View>

            <Text style={styles.groupDescription}>{group.description}</Text>

            <View style={styles.groupMeta}>
              <View style={styles.creatorInfo}>
                <Image source={{ uri: group.creatorAvatar }} style={styles.creatorAvatar} />
                <Text style={styles.creatorName}>Created by {group.creator}</Text>
              </View>
              
              <View style={styles.membersInfo}>
                <Users size={16} color="#6B7280" />
                <Text style={styles.membersText}>
                  {group.membersCount}/{group.maxMembers} members
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
    width: 40,
    height: 40,
    backgroundColor: '#000000',
    borderRadius: 20,
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    flex: 1,
    marginRight: 8,
  },
  groupSubject: {
    fontSize: 14,
    color: '#6B7280',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
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
  },
  creatorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  creatorName: {
    fontSize: 12,
    color: '#6B7280',
  },
  membersInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  membersText: {
    fontSize: 12,
    color: '#6B7280',
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
});