import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, CreditCard as Edit, Award, BookOpen, Headphones, MessageSquare, Bell, Lock, Moon, Globe, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import TopNavigation from '@/components/TopNavigation';
import FloatingActionButton from '@/components/FloatingActionButton';

interface UserProfile {
  name: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  stats: {
    podcasts: number;
    books: number;
    forumPosts: number;
    followers: number;
    following: number;
  };
  badges: string[];
  level: number;
  xp: number;
  nextLevelXp: number;
}

export default function ProfileScreen() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [profile] = useState<UserProfile>({
    name: 'Alex Rodriguez',
    username: '@alexr_learns',
    email: 'alex@example.com',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
    bio: 'Passionate learner exploring AI, psychology, and philosophy. Always eager to share knowledge and learn from others! 🎓✨',
    stats: {
      podcasts: 12,
      books: 34,
      forumPosts: 56,
      followers: 1234,
      following: 567,
    },
    badges: ['Early Adopter', 'Knowledge Seeker', 'Community Helper', 'Study Streak'],
    level: 8,
    xp: 2450,
    nextLevelXp: 3000,
  });

  const settingsOptions = [
    { icon: Edit, title: 'Edit Profile', subtitle: 'Update your information', action: () => {} },
    { icon: Bell, title: 'Notifications', subtitle: 'Manage your alerts', toggle: true, value: notifications, onToggle: setNotifications },
    { icon: Lock, title: 'Privacy & Security', subtitle: 'Control your privacy', action: () => {} },
    { icon: Moon, title: 'Dark Mode', subtitle: 'Toggle dark theme', toggle: true, value: darkMode, onToggle: setDarkMode },
    { icon: Globe, title: 'Language', subtitle: 'English', action: () => {} },
    { icon: HelpCircle, title: 'Help & Support', subtitle: 'Get assistance', action: () => {} },
    { icon: LogOut, title: 'Sign Out', subtitle: 'Log out of your account', action: () => {}, danger: true },
  ];

  const progressPercent = (profile.xp / profile.nextLevelXp) * 100;

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation */}
      <TopNavigation />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image source={{ uri: profile.avatar }} style={styles.profileAvatar} />
          <Text style={styles.profileName}>{profile.name}</Text>
          <Text style={styles.profileUsername}>{profile.username}</Text>
          <Text style={styles.profileBio}>{profile.bio}</Text>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{profile.stats.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{profile.stats.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{profile.stats.podcasts}</Text>
              <Text style={styles.statLabel}>Podcasts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{profile.stats.books}</Text>
              <Text style={styles.statLabel}>Books</Text>
            </View>
          </View>
        </View>

        {/* Level & XP */}
        <View style={styles.levelSection}>
          <View style={styles.levelHeader}>
            <View style={styles.levelInfo}>
              <Award size={20} color="#F59E0B" />
              <Text style={styles.levelText}>Level {profile.level}</Text>
            </View>
            <Text style={styles.xpText}>{profile.xp} / {profile.nextLevelXp} XP</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
          </View>
        </View>

        {/* Badges */}
        <View style={styles.badgesSection}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.badgesContainer}>
            {profile.badges.map((badge, index) => (
              <View key={index} style={styles.badge}>
                <Award size={16} color="#F59E0B" />
                <Text style={styles.badgeText}>{badge}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Activity Summary */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Your Activity</Text>
          <View style={styles.activityGrid}>
            <View style={styles.activityItem}>
              <Headphones size={24} color="#8B5CF6" />
              <Text style={styles.activityNumber}>{profile.stats.podcasts}</Text>
              <Text style={styles.activityLabel}>Podcasts Created</Text>
            </View>
            <View style={styles.activityItem}>
              <BookOpen size={24} color="#3B82F6" />
              <Text style={styles.activityNumber}>{profile.stats.books}</Text>
              <Text style={styles.activityLabel}>Books Shared</Text>
            </View>
            <View style={styles.activityItem}>
              <MessageSquare size={24} color="#10B981" />
              <Text style={styles.activityNumber}>{profile.stats.forumPosts}</Text>
              <Text style={styles.activityLabel}>Forum Posts</Text>
            </View>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {settingsOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.settingItem}
              onPress={option.action}
            >
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, option.danger && styles.dangerIcon]}>
                  <option.icon
                    size={20}
                    color={option.danger ? '#EF4444' : '#9CA3AF'}
                  />
                </View>
                <View>
                  <Text style={[styles.settingTitle, option.danger && styles.dangerText]}>
                    {option.title}
                  </Text>
                  <Text style={styles.settingSubtitle}>{option.subtitle}</Text>
                </View>
              </View>
              
              {option.toggle ? (
                <Switch
                  value={option.value}
                  onValueChange={option.onToggle}
                  trackColor={{ false: '#374151', true: '#8B5CF6' }}
                  thumbColor="#FFFFFF"
                />
              ) : (
                <ChevronRight size={20} color="#9CA3AF" />
              )}
            </TouchableOpacity>
          ))}
        </View>
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
  settingsButton: {
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
  profileSection: {
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#8B5CF6',
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileUsername: {
    color: '#8B5CF6',
    fontSize: 16,
    marginBottom: 12,
  },
  profileBio: {
    color: '#E5E7EB',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 2,
  },
  levelSection: {
    margin: 16,
    padding: 16,
    backgroundColor: '#1F2937',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
  },
  xpText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: 4,
  },
  badgesSection: {
    margin: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  badgeText: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  activitySection: {
    margin: 16,
  },
  activityGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  activityItem: {
    alignItems: 'center',
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
    width: '30%',
  },
  activityNumber: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  activityLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  settingsSection: {
    margin: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#374151',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#374151',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dangerIcon: {
    backgroundColor: '#7F1D1D',
  },
  settingTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  dangerText: {
    color: '#EF4444',
  },
  settingSubtitle: {
    color: '#9CA3AF',
    fontSize: 13,
    marginTop: 2,
  },
});