import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Menu, ShoppingCart, User, Bell, Search, Users, Calendar, BookOpen, Trophy, Settings, HelpCircle, LogOut, X } from 'lucide-react-native';

export default function TopNavigation() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const menuItems = [
    { 
      id: 'groups', 
      title: 'Study Groups', 
      icon: Users, 
      description: 'Join or create study groups',
      action: () => router.push('/groups')
    },
    { 
      id: 'events', 
      title: 'Events', 
      icon: Calendar, 
      description: 'Webinars and workshops',
      action: () => router.push('/events')
    },
    { 
      id: 'quiz', 
      title: 'Quizzes', 
      icon: Trophy, 
      description: 'Test your knowledge',
      action: () => router.push('/quiz')
    },
    { 
      id: 'downloads', 
      title: 'Downloads', 
      icon: BookOpen, 
      description: 'Your downloaded content',
      action: () => router.push('/downloads')
    },
  ];

  const settingsItems = [
    {
      id: 'settings',
      title: 'Settings',
      icon: Settings,
      action: () => console.log('Settings')
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: HelpCircle,
      action: () => console.log('Help')
    },
    {
      id: 'logout',
      title: 'Sign Out',
      icon: LogOut,
      action: () => console.log('Logout')
    }
  ];

  const handleMenuItemPress = (item: typeof menuItems[0]) => {
    setShowMenu(false);
    item.action();
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.leftSection}>
          <TouchableOpacity style={styles.menuButton} onPress={() => setShowMenu(true)}>
            <Menu size={24} color="#6B7280" />
          </TouchableOpacity>
          <Text style={styles.logo}>edvibe</Text>
        </View>
        
        <View style={styles.rightSection}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => router.push('/store')}
          >
            <ShoppingCart size={24} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <User size={24} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => router.push('/notifications')}
          >
            <Bell size={24} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => router.push('/search')}
          >
            <Search size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Sidebar Menu Modal */}
      <Modal
        visible={showMenu}
        transparent
        animationType="slide"
        onRequestClose={() => setShowMenu(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.modalBackground} 
            activeOpacity={1} 
            onPress={() => setShowMenu(false)}
          />
          <View style={styles.sidebar}>
            <View style={styles.sidebarHeader}>
              <Text style={styles.sidebarTitle}>Menu</Text>
              <TouchableOpacity onPress={() => setShowMenu(false)}>
                <X size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.sidebarContent}>
              <View style={styles.menuSection}>
                <Text style={styles.sectionTitle}>Explore</Text>
                {menuItems.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.menuItem}
                    onPress={() => handleMenuItemPress(item)}
                  >
                    <View style={styles.menuItemIcon}>
                      <item.icon size={20} color="#6B7280" />
                    </View>
                    <View style={styles.menuItemContent}>
                      <Text style={styles.menuItemTitle}>{item.title}</Text>
                      <Text style={styles.menuItemDescription}>{item.description}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.menuSection}>
                <Text style={styles.sectionTitle}>Account</Text>
                {settingsItems.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.menuItem}
                    onPress={() => {
                      setShowMenu(false);
                      item.action();
                    }}
                  >
                    <View style={styles.menuItemIcon}>
                      <item.icon size={20} color="#6B7280" />
                    </View>
                    <Text style={styles.menuItemTitle}>{item.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    marginRight: 16,
    padding: 4,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
    padding: 4,
  },
  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    width: 280,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  sidebarContent: {
    flex: 1,
  },
  menuSection: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    paddingHorizontal: 20,
    paddingBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  menuItemDescription: {
    fontSize: 13,
    color: '#6B7280',
  },
});