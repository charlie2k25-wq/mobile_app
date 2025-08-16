import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  X, 
  Upload, 
  Mic, 
  Play, 
  Pause, 
  Image as ImageIcon,
  ChevronDown,
  DollarSign,
  Lock
} from 'lucide-react-native';

export default function PodcastPostScreen() {
  const router = useRouter();
  const [podcastTitle, setPodcastTitle] = useState('');
  const [podcastDescription, setPodcastDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Education');
  const [monetization, setMonetization] = useState<'free' | 'premium'>('free');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const categories = [
    'Education', 'Technology', 'Business', 'Lifestyle', 
    'Science', 'History', 'Language Learning', 'Self-Improvement',
    'News & Politics', 'Entertainment'
  ];

  const handlePublish = () => {
    if (podcastTitle.trim() && podcastDescription.trim()) {
      // Handle podcast publishing logic here
      Alert.alert('Success', 'Your podcast has been published!');
      router.back();
    } else {
      Alert.alert('Error', 'Please fill in all required fields');
    }
  };

  const handleRecord = () => {
    setIsRecording(!isRecording);
    // Handle recording logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <X size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Podcast</Text>
        <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
          <Text style={styles.publishButtonText}>Publish</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Cover Image */}
        <View style={styles.coverContainer}>
          <Text style={styles.sectionTitle}>Podcast Cover</Text>
          <TouchableOpacity style={styles.coverUpload}>
            {coverImage ? (
              <Image source={{ uri: coverImage }} style={styles.coverImage} />
            ) : (
              <View style={styles.coverPlaceholder}>
                <ImageIcon size={32} color="#9CA3AF" />
                <Text style={styles.coverPlaceholderText}>Upload Cover Image</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Title Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.sectionTitle}>Title *</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="Enter podcast title..."
            placeholderTextColor="#9CA3AF"
            value={podcastTitle}
            onChangeText={setPodcastTitle}
          />
        </View>

        {/* Description Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.sectionTitle}>Description *</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Write a short description..."
            placeholderTextColor="#9CA3AF"
            value={podcastDescription}
            onChangeText={setPodcastDescription}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Audio Recording/Upload */}
        <View style={styles.audioContainer}>
          <Text style={styles.sectionTitle}>Audio Content</Text>
          
          <View style={styles.audioOptions}>
            <TouchableOpacity 
              style={[styles.audioButton, isRecording && styles.recordingButton]}
              onPress={handleRecord}
            >
              {isRecording ? (
                <Pause size={24} color="#FFFFFF" />
              ) : (
                <Mic size={24} color="#FFFFFF" />
              )}
              <Text style={styles.audioButtonText}>
                {isRecording ? 'Stop Recording' : 'Record Audio'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.audioButton}>
              <Upload size={24} color="#FFFFFF" />
              <Text style={styles.audioButtonText}>Upload Audio File</Text>
            </TouchableOpacity>
          </View>

          {audioFile && (
            <View style={styles.audioPreview}>
              <Text style={styles.audioFileName}>audio_recording.mp3</Text>
              <TouchableOpacity style={styles.playPreviewButton}>
                <Play size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          )}
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

        {/* Monetization */}
        <View style={styles.monetizationContainer}>
          <Text style={styles.sectionTitle}>Monetization</Text>
          <View style={styles.monetizationOptions}>
            <TouchableOpacity
              style={[
                styles.monetizationOption,
                monetization === 'free' && styles.selectedMonetizationOption,
              ]}
              onPress={() => setMonetization('free')}
            >
              <Text style={[
                styles.monetizationText,
                monetization === 'free' && styles.selectedMonetizationText,
              ]}>
                Free Podcast
              </Text>
              <Text style={styles.monetizationDescription}>
                Available to everyone
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.monetizationOption,
                monetization === 'premium' && styles.selectedMonetizationOption,
              ]}
              onPress={() => setMonetization('premium')}
            >
              <View style={styles.premiumHeader}>
                <DollarSign size={16} color="#F59E0B" />
                <Text style={[
                  styles.monetizationText,
                  monetization === 'premium' && styles.selectedMonetizationText,
                ]}>
                  Premium Content
                </Text>
              </View>
              <Text style={styles.monetizationDescription}>
                Paid access only
              </Text>
            </TouchableOpacity>
          </View>
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
  publishButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  publishButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  coverContainer: {
    margin: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  coverUpload: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#374151',
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  coverImage: {
    width: '100%',
    height: 200,
  },
  coverPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverPlaceholderText: {
    color: '#9CA3AF',
    fontSize: 14,
    marginTop: 8,
  },
  inputContainer: {
    margin: 16,
  },
  titleInput: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  descriptionInput: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#374151',
    minHeight: 100,
  },
  audioContainer: {
    margin: 16,
  },
  audioOptions: {
    marginBottom: 16,
  },
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B5CF6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  recordingButton: {
    backgroundColor: '#EF4444',
  },
  audioButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  audioPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  audioFileName: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  playPreviewButton: {
    width: 32,
    height: 32,
    backgroundColor: '#8B5CF6',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
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
  monetizationContainer: {
    margin: 16,
  },
  monetizationOptions: {
    marginBottom: 20,
  },
  monetizationOption: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
    marginBottom: 8,
  },
  selectedMonetizationOption: {
    borderColor: '#8B5CF6',
    backgroundColor: '#1E1B4B',
  },
  premiumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monetizationText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  selectedMonetizationText: {
    color: '#8B5CF6',
  },
  monetizationDescription: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 4,
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
  selectedIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
});