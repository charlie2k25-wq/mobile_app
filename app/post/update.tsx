import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  X, 
  Bold, 
  Italic, 
  List, 
  Camera, 
  Video, 
  Paperclip,
  Globe,
  Users,
  Lock,
  ChevronDown
} from 'lucide-react-native';

export default function UpdatePostScreen() {
  const router = useRouter();
  const [updateText, setUpdateText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [privacy, setPrivacy] = useState<'public' | 'friends' | 'private'>('public');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const categories = [
    'General', 'Announcements', 'Academic', 'Events', 
    'Study Tips', 'Resources', 'Discussion', 'Q&A'
  ];

  const privacyOptions = [
    { id: 'public', label: 'Public', icon: Globe, description: 'Anyone can see this update' },
    { id: 'friends', label: 'Friends Only', icon: Users, description: 'Only your friends can see this' },
    { id: 'private', label: 'Private', icon: Lock, description: 'Only you can see this update' },
  ];

  const handlePost = () => {
    if (updateText.trim()) {
      // Handle update posting logic here
      Alert.alert('Success', 'Your update has been posted!');
      router.back();
    } else {
      Alert.alert('Error', 'Please add some content to your update');
    }
  };

  const getPrivacyIcon = () => {
    const option = privacyOptions.find(opt => opt.id === privacy);
    return option ? option.icon : Globe;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <X size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Update</Text>
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Text Input */}
        <View style={styles.textContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="What's on your mind? Share your thoughts, insights, or questions..."
            placeholderTextColor="#9CA3AF"
            value={updateText}
            onChangeText={setUpdateText}
            multiline
            textAlignVertical="top"
          />
          
          <View style={styles.characterCount}>
            <Text style={styles.characterText}>
              {updateText.length} characters
            </Text>
          </View>
        </View>

        {/* Formatting Tools */}
        <View style={styles.formattingContainer}>
          <Text style={styles.sectionTitle}>Formatting</Text>
          <View style={styles.formattingTools}>
            <TouchableOpacity style={styles.formatButton}>
              <Bold size={20} color="#9CA3AF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.formatButton}>
              <Italic size={20} color="#9CA3AF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.formatButton}>
              <List size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Media Attachments */}
        <View style={styles.mediaContainer}>
          <Text style={styles.sectionTitle}>Add Media</Text>
          <View style={styles.mediaOptions}>
            <TouchableOpacity style={styles.mediaButton}>
              <Camera size={24} color="#8B5CF6" />
              <Text style={styles.mediaButtonText}>Photo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.mediaButton}>
              <Video size={24} color="#8B5CF6" />
              <Text style={styles.mediaButtonText}>Video</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.mediaButton}>
              <Paperclip size={24} color="#8B5CF6" />
              <Text style={styles.mediaButtonText}>Document</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Category Selection */}
        <View style={styles.categoryContainer}>
          <Text style={styles.sectionTitle}>Category</Text>
          <TouchableOpacity 
            style={styles.categorySelector}
            onPress={() => setShowCategoryModal(true)}
          >
            <Text style={styles.categoryText}>{selectedCategory}</Text>
            <ChevronDown size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Privacy Settings */}
        <View style={styles.privacyContainer}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <TouchableOpacity 
            style={styles.privacySelector}
            onPress={() => setShowPrivacyModal(true)}
          >
            <View style={styles.privacyLeft}>
              {React.createElement(getPrivacyIcon(), { size: 20, color: '#8B5CF6' })}
              <Text style={styles.privacyText}>
                {privacyOptions.find(opt => opt.id === privacy)?.label}
              </Text>
            </View>
            <ChevronDown size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
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
                  <View style={styles.privacyOptionTextContainer}>
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
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  postButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  postButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  textContainer: {
    margin: 16,
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#374151',
    minHeight: 200,
  },
  textInput: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
    minHeight: 150,
  },
  characterCount: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  characterText: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  formattingContainer: {
    margin: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  formattingTools: {
    flexDirection: 'row',
  },
  formatButton: {
    width: 44,
    height: 44,
    backgroundColor: '#374151',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  mediaContainer: {
    margin: 16,
  },
  mediaOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  mediaButton: {
    alignItems: 'center',
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
    width: '30%',
  },
  mediaButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 8,
  },
  categoryContainer: {
    margin: 16,
  },
  categorySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  privacyContainer: {
    margin: 16,
  },
  privacySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  privacyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  privacyText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 8,
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
  privacyOptionTextContainer: {
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