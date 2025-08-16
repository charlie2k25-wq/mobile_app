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
  Image as ImageIcon,
  ChevronDown,
  DollarSign,
  FileText,
  Music,
  Video,
  Code,
  BookOpen
} from 'lucide-react-native';

export default function UploadProductScreen() {
  const router = useRouter();
  const [productTitle, setProductTitle] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Education');
  const [selectedType, setSelectedType] = useState('ebook');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [productFile, setProductFile] = useState<string | null>(null);
  const [tags, setTags] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);

  const categories = [
    'Education', 'Programming', 'Mathematics', 'Science', 'Business', 
    'Design', 'Music', 'Language', 'Self-Help', 'Technology'
  ];

  const productTypes = [
    { id: 'ebook', label: 'E-Book', icon: BookOpen, formats: ['PDF', 'EPUB', 'MOBI'] },
    { id: 'course', label: 'Online Course', icon: Video, formats: ['MP4', 'ZIP'] },
    { id: 'music', label: 'Music/Audio', icon: Music, formats: ['MP3', 'WAV', 'FLAC'] },
    { id: 'template', label: 'Template', icon: FileText, formats: ['DOCX', 'PPTX', 'PSD'] },
    { id: 'software', label: 'Software', icon: Code, formats: ['ZIP', 'EXE', 'DMG'] },
  ];

  const handlePublish = () => {
    if (productTitle.trim() && productDescription.trim() && price.trim()) {
      // Handle product publishing logic here
      Alert.alert('Success', 'Your product has been uploaded for review!');
      router.back();
    } else {
      Alert.alert('Error', 'Please fill in all required fields');
    }
  };

  const getTypeIcon = (typeId: string) => {
    const type = productTypes.find(t => t.id === typeId);
    return type ? type.icon : FileText;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <X size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upload Product</Text>
        <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
          <Text style={styles.publishButtonText}>Publish</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Cover Image */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product Cover *</Text>
          <TouchableOpacity style={styles.coverUpload}>
            {coverImage ? (
              <Image source={{ uri: coverImage }} style={styles.coverImage} />
            ) : (
              <View style={styles.coverPlaceholder}>
                <ImageIcon size={32} color="#9CA3AF" />
                <Text style={styles.coverPlaceholderText}>Upload Cover Image</Text>
                <Text style={styles.coverHint}>Recommended: 300x400px</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Product Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product Type *</Text>
          <TouchableOpacity 
            style={styles.selector}
            onPress={() => setShowTypeModal(true)}
          >
            <View style={styles.selectorLeft}>
              {React.createElement(getTypeIcon(selectedType), { size: 20, color: '#8B5CF6' })}
              <Text style={styles.selectorText}>
                {productTypes.find(t => t.id === selectedType)?.label}
              </Text>
            </View>
            <ChevronDown size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Title Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter product title..."
            placeholderTextColor="#9CA3AF"
            value={productTitle}
            onChangeText={setProductTitle}
          />
        </View>

        {/* Description Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description *</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Describe your product, its features, and benefits..."
            placeholderTextColor="#9CA3AF"
            value={productDescription}
            onChangeText={setProductDescription}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Category Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category *</Text>
          <TouchableOpacity 
            style={styles.selector}
            onPress={() => setShowCategoryModal(true)}
          >
            <Text style={styles.selectorText}>{selectedCategory}</Text>
            <ChevronDown size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Tags */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tags</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter tags separated by commas..."
            placeholderTextColor="#9CA3AF"
            value={tags}
            onChangeText={setTags}
          />
          <Text style={styles.hint}>Help users find your product with relevant keywords</Text>
        </View>

        {/* Pricing */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pricing *</Text>
          <View style={styles.priceInputs}>
            <View style={styles.priceInputContainer}>
              <Text style={styles.priceLabel}>Price ($)</Text>
              <View style={styles.priceInput}>
                <DollarSign size={20} color="#9CA3AF" />
                <TextInput
                  style={styles.priceTextInput}
                  placeholder="0.00"
                  placeholderTextColor="#9CA3AF"
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>
            
            <View style={styles.priceInputContainer}>
              <Text style={styles.priceLabel}>Original Price (Optional)</Text>
              <View style={styles.priceInput}>
                <DollarSign size={20} color="#9CA3AF" />
                <TextInput
                  style={styles.priceTextInput}
                  placeholder="0.00"
                  placeholderTextColor="#9CA3AF"
                  value={originalPrice}
                  onChangeText={setOriginalPrice}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>
          </View>
        </View>

        {/* File Upload */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product File *</Text>
          <TouchableOpacity style={styles.fileUpload}>
            {productFile ? (
              <View style={styles.filePreview}>
                <FileText size={24} color="#8B5CF6" />
                <Text style={styles.fileName}>product_file.pdf</Text>
                <Text style={styles.fileSize}>2.4 MB</Text>
              </View>
            ) : (
              <View style={styles.filePlaceholder}>
                <Upload size={32} color="#9CA3AF" />
                <Text style={styles.filePlaceholderText}>Upload Product File</Text>
                <Text style={styles.fileHint}>
                  Supported: {productTypes.find(t => t.id === selectedType)?.formats.join(', ')}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Terms */}
        <View style={styles.termsSection}>
          <Text style={styles.termsText}>
            By uploading, you agree to our Terms of Service and confirm you have the right to sell this content.
          </Text>
        </View>
      </ScrollView>

      {/* Type Modal */}
      <Modal
        visible={showTypeModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTypeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Product Type</Text>
            
            {productTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeOption,
                  selectedType === type.id && styles.selectedTypeOption,
                ]}
                onPress={() => {
                  setSelectedType(type.id);
                  setShowTypeModal(false);
                }}
              >
                <View style={styles.typeOptionLeft}>
                  <type.icon size={20} color="#8B5CF6" />
                  <View style={styles.typeOptionText}>
                    <Text style={styles.typeOptionTitle}>{type.label}</Text>
                    <Text style={styles.typeOptionFormats}>
                      Formats: {type.formats.join(', ')}
                    </Text>
                  </View>
                </View>
                {selectedType === type.id && (
                  <View style={styles.selectedIndicator} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

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
  section: {
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
  coverHint: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 4,
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  selectorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectorText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 8,
  },
  input: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  textArea: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#374151',
    minHeight: 120,
  },
  hint: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 6,
  },
  priceInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceInputContainer: {
    flex: 1,
    marginRight: 8,
  },
  priceLabel: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 8,
  },
  priceInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  priceTextInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 8,
  },
  fileUpload: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#374151',
    borderStyle: 'dashed',
  },
  filePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  fileName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
    flex: 1,
  },
  fileSize: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  filePlaceholder: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  filePlaceholderText: {
    color: '#9CA3AF',
    fontSize: 14,
    marginTop: 8,
  },
  fileHint: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  termsSection: {
    margin: 16,
    padding: 16,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  termsText: {
    color: '#9CA3AF',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
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
  typeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#374151',
  },
  selectedTypeOption: {
    backgroundColor: '#8B5CF6',
  },
  typeOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  typeOptionText: {
    marginLeft: 12,
  },
  typeOptionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  typeOptionFormats: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 2,
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