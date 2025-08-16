import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Plus, 
  Filter,
  Video,
  BookOpen,
  Presentation,
  ChevronDown
} from 'lucide-react-native';

interface Event {
  id: string;
  title: string;
  description: string;
  type: 'webinar' | 'workshop' | 'study_session';
  startTime: string;
  endTime: string;
  host: string;
  hostAvatar: string;
  attendees: number;
  maxAttendees: number;
  isRegistered: boolean;
  isLive: boolean;
  category: string;
  meetingUrl?: string;
}

export default function EventsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showFilterModal, setShowFilterModal] = useState(false);
  
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Advanced Python Programming Workshop',
      description: 'Learn advanced Python concepts including decorators, generators, and async programming.',
      type: 'workshop',
      startTime: '2024-02-15T14:00:00Z',
      endTime: '2024-02-15T16:00:00Z',
      host: 'Dr. Sarah Chen',
      hostAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      attendees: 45,
      maxAttendees: 100,
      isRegistered: false,
      isLive: false,
      category: 'Programming',
    },
    {
      id: '2',
      title: 'Mathematics Study Session: Calculus',
      description: 'Group study session focusing on limits, derivatives, and integration techniques.',
      type: 'study_session',
      startTime: '2024-02-16T19:00:00Z',
      endTime: '2024-02-16T21:00:00Z',
      host: 'Prof. Michael Davis',
      hostAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      attendees: 23,
      maxAttendees: 50,
      isRegistered: true,
      isLive: false,
      category: 'Mathematics',
    },
    {
      id: '3',
      title: 'Career Development Webinar',
      description: 'Tips for building a successful career in tech, networking strategies, and interview preparation.',
      type: 'webinar',
      startTime: '2024-02-14T18:00:00Z',
      endTime: '2024-02-14T19:30:00Z',
      host: 'Emma Thompson',
      hostAvatar: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      attendees: 156,
      maxAttendees: 200,
      isRegistered: true,
      isLive: true,
      category: 'Career',
    },
  ]);

  const filters = ['All', 'Webinars', 'Workshops', 'Study Sessions', 'Live Now'];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'webinar':
        return <Video size={20} color="#8B5CF6" />;
      case 'workshop':
        return <Presentation size={20} color="#10B981" />;
      case 'study_session':
        return <BookOpen size={20} color="#F59E0B" />;
      default:
        return <Calendar size={20} color="#9CA3AF" />;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'webinar':
        return '#8B5CF6';
      case 'workshop':
        return '#10B981';
      case 'study_session':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  const formatEventTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleRSVP = (eventId: string) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { 
            ...event, 
            isRegistered: !event.isRegistered,
            attendees: event.isRegistered ? event.attendees - 1 : event.attendees + 1
          }
        : event
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Events</Text>
        <TouchableOpacity style={styles.createButton}>
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search events..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilterModal(true)}
        >
          <Filter size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterTab,
              selectedFilter === filter && styles.selectedFilterTab,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.selectedFilterText,
              ]}
            >
              {filter.charAt(0)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Events List */}
      <ScrollView style={styles.eventsList} showsVerticalScrollIndicator={false}>
        {events.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <View style={styles.eventHeader}>
              <View style={styles.eventMeta}>
                <View style={[styles.typeIndicator, { backgroundColor: getEventTypeColor(event.type) }]}>
                  {getEventIcon(event.type)}
                </View>
                <View style={styles.eventInfo}>
                  <Text style={styles.eventCategory}>{event.category}</Text>
                  {event.isLive && (
                    <View style={styles.liveBadge}>
                      <View style={styles.liveIndicator} />
                      <Text style={styles.liveText}>LIVE</Text>
                    </View>
                  )}
                </View>
              </View>
              <Text style={styles.eventTime}>{formatEventTime(event.startTime)}</Text>
            </View>

            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventDescription} numberOfLines={2}>
              {event.description}
            </Text>

            <View style={styles.hostInfo}>
              <Image source={{ uri: event.hostAvatar }} style={styles.hostAvatar} />
              <Text style={styles.hostName}>Hosted by {event.host}</Text>
            </View>

            <View style={styles.eventFooter}>
              <View style={styles.attendeeInfo}>
                <Users size={16} color="#9CA3AF" />
                <Text style={styles.attendeeText}>
                  {event.attendees}/{event.maxAttendees} attending
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.rsvpButton,
                  event.isRegistered && styles.registeredButton,
                ]}
                onPress={() => handleRSVP(event.id)}
              >
                <Text style={[
                  styles.rsvpButtonText,
                  event.isRegistered && styles.registeredButtonText,
                ]}>
                  {event.isRegistered ? 'Registered' : 'RSVP'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Events</Text>
            
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterOption,
                  selectedFilter === filter && styles.selectedFilterOption,
                ]}
                onPress={() => {
                  setSelectedFilter(filter);
                  setShowFilterModal(false);
                }}
              >
                <Text style={[
                  styles.filterOptionText,
                  selectedFilter === filter && styles.selectedFilterText,
                ]}>
                  {filter}
                </Text>
                {selectedFilter === filter && (
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  createButton: {
    width: 40,
    height: 40,
    backgroundColor: '#8B5CF6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#374151',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  searchInput: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: '#374151',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  filterTab: {
    width: 32,
    height: 32,
    backgroundColor: '#374151',
    borderRadius: 16,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedFilterTab: {
    backgroundColor: '#8B5CF6',
  },
  filterText: {
    color: '#9CA3AF',
    fontSize: 10,
    fontWeight: '500',
  },
  selectedFilterText: {
    color: '#FFFFFF',
  },
  eventsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  eventCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#374151',
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  eventInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventCategory: {
    color: '#8B5CF6',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 8,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  liveIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    marginRight: 4,
  },
  liveText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  eventTime: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  eventTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 8,
  },
  eventDescription: {
    color: '#E5E7EB',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  hostInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  hostAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  hostName: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attendeeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeeText: {
    color: '#9CA3AF',
    fontSize: 14,
    marginLeft: 6,
  },
  rsvpButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  registeredButton: {
    backgroundColor: '#10B981',
  },
  rsvpButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  registeredButtonText: {
    color: '#FFFFFF',
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
  filterOption: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#374151',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedFilterOption: {
    backgroundColor: '#8B5CF6',
  },
  filterOptionText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  selectedFilterText: {
    fontWeight: '600',
  },
  selectedIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
});