import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
import { Plus, X, FileText, Camera, Headphones, ShoppingBag } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const router = useRouter();

  const toggleFAB = () => {
    const toValue = isOpen ? 0 : 1;
    
    Animated.spring(animation, {
      toValue,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
    
    setIsOpen(!isOpen);
  };

  const handleOptionPress = (option: string) => {
    setIsOpen(false);
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();

    // Navigate to respective posting screens
    switch (option) {
      case 'story':
        router.push('/post/story');
        break;
      case 'update':
        router.push('/post/update');
        break;
      case 'podcast':
        router.push('/post/podcast');
        break;
      case 'product':
        router.push('/store/upload');
        break;
    }
  };

  const fabOptions = [
    { id: 'story', icon: Camera, label: 'Story', color: '#10B981' },
    { id: 'update', icon: FileText, label: 'Update', color: '#3B82F6' },
    { id: 'podcast', icon: Headphones, label: 'Podcast', color: '#8B5CF6' },
    { id: 'product', icon: ShoppingBag, label: 'Sell', color: '#F59E0B' },
  ];

  const rotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <Modal transparent visible={isOpen} animationType="fade">
          <TouchableOpacity 
            style={styles.backdrop} 
            activeOpacity={1} 
            onPress={toggleFAB}
          />
        </Modal>
      )}

      {/* FAB Options */}
      {isOpen && (
        <View style={styles.optionsContainer}>
          {fabOptions.map((option, index) => {
            const optionAnimation = animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -(60 * (index + 1) + 20)],
            });

            const scaleAnimation = animation.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0, 0.8, 1],
            });

            return (
              <Animated.View
                key={option.id}
                style={[
                  styles.fabOption,
                  {
                    transform: [
                      { translateY: optionAnimation },
                      { scale: scaleAnimation },
                    ],
                  },
                ]}
              >
                <TouchableOpacity
                  style={[styles.optionButton, { backgroundColor: option.color }]}
                  onPress={() => handleOptionPress(option.id)}
                >
                  <option.icon size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.optionLabel}>{option.label}</Text>
              </Animated.View>
            );
          })}
        </View>
      )}

      {/* Main FAB */}
      <TouchableOpacity style={styles.fab} onPress={toggleFAB}>
        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
          {isOpen ? (
            <X size={28} color="#FFFFFF" />
          ) : (
            <Plus size={28} color="#FFFFFF" />
          )}
        </Animated.View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 1000,
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    zIndex: 999,
  },
  fabOption: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  optionLabel: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});