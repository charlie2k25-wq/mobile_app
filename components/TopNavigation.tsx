import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Menu, ShoppingCart, User, Bell, Search } from 'lucide-react-native';

export default function TopNavigation() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <TouchableOpacity style={styles.menuButton}>
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
});