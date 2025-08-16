import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, DollarSign, TrendingUp, Eye, Download, CreditCard as Edit, Trash2, Plus, ChartBar as BarChart3, Calendar } from 'lucide-react-native';

interface SellerStats {
  totalEarnings: number;
  monthlyEarnings: number;
  totalSales: number;
  totalProducts: number;
  totalViews: number;
  totalDownloads: number;
}

interface SellerProduct {
  id: string;
  title: string;
  cover: string;
  price: number;
  sales: number;
  earnings: number;
  views: number;
  downloads: number;
  status: 'active' | 'pending' | 'rejected';
  uploadDate: string;
}

export default function SellerDashboardScreen() {
  const router = useRouter();
  
  const [stats] = useState<SellerStats>({
    totalEarnings: 2847.50,
    monthlyEarnings: 456.30,
    totalSales: 89,
    totalProducts: 12,
    totalViews: 5432,
    totalDownloads: 234,
  });

  const [products] = useState<SellerProduct[]>([
    {
      id: '1',
      title: 'Complete Python Programming Course',
      cover: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      price: 49.99,
      sales: 34,
      earnings: 1699.66,
      views: 1234,
      downloads: 34,
      status: 'active',
      uploadDate: '2024-01-15',
    },
    {
      id: '2',
      title: 'Advanced Mathematics Textbook',
      cover: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      price: 29.99,
      sales: 28,
      earnings: 839.72,
      views: 892,
      downloads: 28,
      status: 'active',
      uploadDate: '2024-01-10',
    },
    {
      id: '3',
      title: 'Study Music Collection',
      cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      price: 9.99,
      sales: 15,
      earnings: 149.85,
      views: 543,
      downloads: 15,
      status: 'pending',
      uploadDate: '2024-01-20',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#10B981';
      case 'pending':
        return '#F59E0B';
      case 'rejected':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'pending':
        return 'Under Review';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Seller Dashboard</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Stats Overview */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <DollarSign size={24} color="#10B981" />
              <Text style={styles.statValue}>${stats.totalEarnings.toFixed(2)}</Text>
              <Text style={styles.statLabel}>Total Earnings</Text>
            </View>
            
            <View style={styles.statCard}>
              <TrendingUp size={24} color="#8B5CF6" />
              <Text style={styles.statValue}>${stats.monthlyEarnings.toFixed(2)}</Text>
              <Text style={styles.statLabel}>This Month</Text>
            </View>
            
            <View style={styles.statCard}>
              <Download size={24} color="#3B82F6" />
              <Text style={styles.statValue}>{stats.totalSales}</Text>
              <Text style={styles.statLabel}>Total Sales</Text>
            </View>
            
            <View style={styles.statCard}>
              <Eye size={24} color="#F59E0B" />
              <Text style={styles.statValue}>{stats.totalViews}</Text>
              <Text style={styles.statLabel}>Total Views</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Plus size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Add Product</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <BarChart3 size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Analytics</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <DollarSign size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Earnings</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Products Management */}
        <View style={styles.productsSection}>
          <Text style={styles.sectionTitle}>Your Products</Text>
          {products.map((product) => (
            <View key={product.id} style={styles.productDashboardCard}>
              <View style={styles.productDashboardInfo}>
                <Image source={{ uri: product.cover }} style={styles.productDashboardCover} />
                <View style={styles.productDashboardDetails}>
                  <Text style={styles.productDashboardTitle} numberOfLines={2}>
                    {product.title}
                  </Text>
                  
                  <View style={styles.productDashboardMeta}>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(product.status) }]}>
                      <Text style={styles.statusText}>{getStatusLabel(product.status)}</Text>
                    </View>
                    <Text style={styles.uploadDate}>
                      Uploaded {new Date(product.uploadDate).toLocaleDateString()}
                    </Text>
                  </View>
                  
                  <View style={styles.productDashboardStats}>
                    <View style={styles.dashboardStatItem}>
                      <Text style={styles.dashboardStatValue}>${product.earnings.toFixed(2)}</Text>
                      <Text style={styles.dashboardStatLabel}>Earned</Text>
                    </View>
                    <View style={styles.dashboardStatItem}>
                      <Text style={styles.dashboardStatValue}>{product.sales}</Text>
                      <Text style={styles.dashboardStatLabel}>Sales</Text>
                    </View>
                    <View style={styles.dashboardStatItem}>
                      <Text style={styles.dashboardStatValue}>{product.views}</Text>
                      <Text style={styles.dashboardStatLabel}>Views</Text>
                    </View>
                  </View>
                </View>
              </View>
              
              <View style={styles.productDashboardActions}>
                <TouchableOpacity style={styles.editButton}>
                  <Edit size={16} color="#8B5CF6" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton}>
                  <Trash2 size={16} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
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
  addButton: {
    width: 40,
    height: 40,
    backgroundColor: '#8B5CF6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  statsSection: {
    margin: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
    alignItems: 'center',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  actionsSection: {
    margin: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B5CF6',
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  productsSection: {
    margin: 16,
  },
  productDashboardCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  productDashboardInfo: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  productDashboardCover: {
    width: 60,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  productDashboardDetails: {
    flex: 1,
  },
  productDashboardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: 6,
  },
  productDashboardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 8,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  uploadDate: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  productDashboardStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dashboardStatItem: {
    alignItems: 'center',
  },
  dashboardStatValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  dashboardStatLabel: {
    color: '#9CA3AF',
    fontSize: 10,
    marginTop: 2,
  },
  productDashboardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  editButton: {
    width: 36,
    height: 36,
    backgroundColor: '#374151',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  deleteButton: {
    width: 36,
    height: 36,
    backgroundColor: '#7F1D1D',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});