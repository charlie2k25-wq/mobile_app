import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { MessageSquare, Search, Calendar, Users, Brain, Bell } from 'lucide-react-native';

export default function TopNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const isForumActive = pathname === '/forum';
  const isSearchActive = pathname === '/search';
  const isEventsActive = pathname === '/events';
  const isGroupsActive = pathname === '/groups';
  const isQuizActive = pathname === '/quiz';
  const isNotificationsActive = pathname === '/notifications';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.navItem, isForumActive && styles.activeNavItem]}
        onPress={() => router.push('/forum')}
      >
        <MessageSquare 
          size={20} 
          color={isForumActive ? '#FFFFFF' : '#9CA3AF'} 
        />
        <Text style={[styles.navText, isForumActive && styles.activeNavText]}>
          Forum
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navItem, isSearchActive && styles.activeNavItem]}
        onPress={() => router.push('/search')}
      >
        <Search 
          size={20} 
          color={isSearchActive ? '#FFFFFF' : '#9CA3AF'} 
        />
        <Text style={[styles.navText, isSearchActive && styles.activeNavText]}>
          Search
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navItem, isEventsActive && styles.activeNavItem]}
        onPress={() => router.push('/events')}
      >
        <Calendar 
          size={20} 
          color={isEventsActive ? '#FFFFFF' : '#9CA3AF'} 
        />
        <Text style={[styles.navText, isEventsActive && styles.activeNavText]}>
          Events
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navItem, isGroupsActive && styles.activeNavItem]}
        onPress={() => router.push('/groups')}
      >
        <Users 
          size={20} 
          color={isGroupsActive ? '#FFFFFF' : '#9CA3AF'} 
        />
        <Text style={[styles.navText, isGroupsActive && styles.activeNavText]}>
          Groups
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navItem, isQuizActive && styles.activeNavItem]}
        onPress={() => router.push('/quiz')}
      >
        <Brain 
          size={20} 
          color={isQuizActive ? '#FFFFFF' : '#9CA3AF'} 
        />
        <Text style={[styles.navText, isQuizActive && styles.activeNavText]}>
          Quiz
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navItem, isNotificationsActive && styles.activeNavItem]}
        onPress={() => router.push('/notifications')}
      >
        <Bell 
          size={20} 
          color={isNotificationsActive ? '#FFFFFF' : '#9CA3AF'} 
        />
        <Text style={[styles.navText, isNotificationsActive && styles.activeNavText]}>
          Alerts
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
    paddingHorizontal: 16,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 20,
  },
  activeNavItem: {
    backgroundColor: '#8B5CF6',
  },
  navText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  activeNavText: {
    color: '#FFFFFF',
  },
});