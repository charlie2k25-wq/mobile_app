export interface User {
  id: string;
  email: string;
  username: string;
  full_name: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface Podcast {
  id: string;
  title: string;
  description: string;
  audio_url: string;
  cover_image_url?: string;
  duration: number;
  category: string;
  author_id: string;
  author?: User;
  likes_count: number;
  comments_count: number;
  plays_count: number;
  created_at: string;
  updated_at: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  file_url: string;
  cover_image_url?: string;
  format: 'PDF' | 'EPUB';
  pages: number;
  category: string;
  uploader_id: string;
  uploader?: User;
  likes_count: number;
  downloads_count: number;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: string;
  author_id: string;
  author?: User;
  upvotes_count: number;
  downvotes_count: number;
  comments_count: number;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  content: string;
  author_id: string;
  author?: User;
  post_id?: string;
  podcast_id?: string;
  book_id?: string;
  parent_id?: string;
  likes_count: number;
  created_at: string;
  updated_at: string;
}

export interface Like {
  id: string;
  user_id: string;
  post_id?: string;
  podcast_id?: string;
  book_id?: string;
  comment_id?: string;
  created_at: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
  created_at: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  badge?: Badge;
  earned_at: string;
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  subject: string;
  creator_id: string;
  creator?: User;
  members_count: number;
  max_members: number;
  is_private: boolean;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  event_type: 'webinar' | 'workshop' | 'study_session';
  start_time: string;
  end_time: string;
  host_id: string;
  host?: User;
  attendees_count: number;
  max_attendees: number;
  meeting_url?: string;
  created_at: string;
  updated_at: string;
}