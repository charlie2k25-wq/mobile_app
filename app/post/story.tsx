import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  X, 
  Camera, 
  Image as ImageIcon, 
  Palette, 
  Type, 
  Smile,
  Globe,
  Users,
  Lock
} from 'lucide-react-native';

export default function StoryPostScreen() {
  const router = useRouter();
  const [storyText, setStoryText] = useState('');
  const [selectedBackground, setSelectedBackground] = useState('#8B5CF6');
  const [privacy, setPrivacy] = useState<'public' | 'friends' | 'private'>('public');
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const backgroundColors = [
    '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', 
    '#EF4444', '#EC4899', '#6366F1', '#14B8A6'
  ];

  const privacyOptions = [
    { id: 'public', label: 'Public', icon: Globe, description: 'Anyone can see this story' },
    { id: 'friends', label: 'Friends Only', icon: Users, description: 'Only your friends can see this' },
    { id: 'private', label: 'Private', icon: Lock, description: 'Only you can see this story' },
  ];

  const handlePost = () => {
    if (storyText.trim()) {
      // Handle story posting logic here
      Alert.alert('Success', 'Your story has been posted!');
      router.back();
    } else {
      Alert.alert('Error', 'Please add some content to your story');
    }
  };

  const getPrivacyIcon = () => {
    const option = privacyOptions.find(opt => opt.id === privacy);
    return option ? option.icon : Globe;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: selectedBackground }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <X size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Story</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Story Content */}
      <View style={styles.storyContainer}>
        <TextInput
          style={styles.storyInput}
          placeholder="Write your story..."
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          value={storyText}
          onChangeText={setStoryText}
          multiline
          maxLength={2000}
          textAlignVertical="top"
        />
        
        <View style={styles.characterCount}>
          <Text style={styles.characterText}>
            {storyText.length}/2000
          </Text>
        </View>
      </View>

      {/* Tools */}
      <View style={styles.toolsContainer}>
        <TouchableOpacity style={styles.toolButton}>
          <Camera size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.toolButton}>
          <ImageIcon size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.toolButton}>
          <Type size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.toolButton}>
          <Smile size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Background Colors */}
      <View style={styles.backgroundSelector}>
        <Text style={styles.selectorTitle}>Background</Text>
        <View style={styles.colorGrid}>
          {backgroundColors.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorOption,
                { backgroundColor: color },
                selectedBackground === color && styles.selectedColor,
              ]}
              onPress={() => setSelectedBackground(color)}
            />
          ))}
        </View>
      </View>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity 
          style={styles.privacyButton}
          onPress={() => setShowPrivacyModal(true)}
        >
          {React.createElement(getPrivacyIcon(), { size: 20, color: '#FFFFFF' })}
          <Text style={styles.privacyText}>
            {privacyOptions.find(opt => opt.id === privacy)?.label}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Post Story</Text>
        </TouchableOpacity>
      </View>

      {/* Privacy Modal */}
      <Modal
        visible={showPrivacyModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPrivacyModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Who can see this?</Text>
            
            {privacyOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.privacyOption,
                  privacy === option.id && styles.selectedPrivacyOption,
                ]}
                onPress={() => {
                  setPrivacy(option.id as any);
                  setShowPrivacyModal(false);
                }}
              >
                <View style={styles.privacyOptionLeft}>
                  <option.icon size={20} color="#8B5CF6" />
                  <View style={styles.privacyOptionText}>
                    <Text style={styles.privacyOptionTitle}>{option.label}</Text>
                    <Text style={styles.privacyOptionDescription}>{option.description}</Text>
                  </View>
                </View>
                {privacy === option.id && (
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 24,
  },
  storyContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  storyInput: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    minHeight: 200,
  },
  characterCount: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  characterText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  toolsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  toolButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  backgroundSelector: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  selectorTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  colorGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 6,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: '#FFFFFF',
    borderWidth: 3,
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  privacyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  privacyText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  postButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  postButtonText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
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
  privacyOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#374151',
  },
  selectedPrivacyOption: {
    backgroundColor: '#8B5CF6',
  },
  privacyOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  privacyOptionText: {
    marginLeft: 12,
  },
  privacyOptionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  privacyOptionDescription: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 2,
  },
  selectedIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
});