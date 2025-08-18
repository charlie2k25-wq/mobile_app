import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Menu, ShoppingCart, User, Bell, Search, Users, Download, X } from 'lucide-react-native';

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
      id: 'downloads', 
      title: 'Downloads', 
      icon: Download, 
      description: 'Your downloaded and purchased items',
      action: () => router.push('/downloads')
    },
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
            <Menu size={24} color="#000000" />
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

      {/* Menu Modal */}
      <Modal
        visible={showMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.menuModal}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Menu</Text>
              <TouchableOpacity onPress={() => setShowMenu(false)}>
                <X size={24} color="#000000" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.menuContent}>
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.menuItem}
                  onPress={() => handleMenuItemPress(item)}
                >
                  <View style={styles.menuItemIcon}>
                    <item.icon size={24} color="#6B7280" />
                  </View>
                  <View style={styles.menuItemContent}>
                    <Text style={styles.menuItemTitle}>{item.title}</Text>
                    <Text style={styles.menuItemDescription}>{item.description}</Text>
                  </View>
                </TouchableOpacity>
              ))}
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
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
  },
  menuModal: {
    backgroundColor: '#FFFFFF',
    marginTop: 80,
    marginHorizontal: 20,
    borderRadius: 16,
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  menuContent: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
});