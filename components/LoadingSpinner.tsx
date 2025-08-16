import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Loader } from 'lucide-react-native';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

export default function LoadingSpinner({ size = 24, color = '#8B5CF6' }: LoadingSpinnerProps) {
  return (
    <View style={styles.container}>
      <Loader size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827',
  },
});