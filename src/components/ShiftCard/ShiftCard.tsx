import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { ShiftType } from '../../types';

const { width } = Dimensions.get('window');

interface ShiftCardProps {
  shift: ShiftType;
  onPress: () => void;
}

export const ShiftCard: React.FC<ShiftCardProps> = ({ shift, onPress }) => {
  const workersStatus = `${shift.currentWorkers}/${shift.planWorkers}`;
  const isFullyBooked = shift.currentWorkers >= shift.planWorkers;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <Image
          source={{ uri: shift.logo }}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.headerInfo}>
          <Text style={styles.companyName} numberOfLines={1}>
            {shift.companyName}
          </Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>
              ★ {shift.customerRating.toFixed(1)}
            </Text>
            <Text style={styles.feedbackCount}>
              ({shift.customerFeedbacksCount})
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.workType}>{shift.workTypes}</Text>
      <Text style={styles.address} numberOfLines={2}>
        {shift.address}
      </Text>

      <View style={styles.timeContainer}>
        <Text style={styles.date}>{shift.dateStartByCity}</Text>
        <Text style={styles.time}>
          {shift.timeStartByCity} - {shift.timeEndByCity}
        </Text>
      </View>

      <View style={styles.footer}>
        <View>
          <Text style={styles.priceLabel}>Оплата</Text>
          <Text style={styles.price}>{shift.priceWorker} ₽</Text>
        </View>
        <View style={styles.workersContainer}>
          <Text style={styles.workersLabel}>Набрано</Text>
          <Text
            style={[styles.workers, isFullyBooked && styles.workersFullyBooked]}
          >
            {workersStatus}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#FF9500',
    fontWeight: '600',
  },
  feedbackCount: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 4,
  },
  workType: {
    fontSize: 15,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 8,
  },
  address: {
    fontSize: 14,
    color: '#3A3A3C',
    marginBottom: 12,
    lineHeight: 20,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  date: {
    fontSize: 14,
    color: '#3A3A3C',
    fontWeight: '500',
    marginRight: 12,
  },
  time: {
    fontSize: 14,
    color: '#8E8E93',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  priceLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 4,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#34C759',
  },
  workersContainer: {
    alignItems: 'flex-end',
  },
  workersLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 4,
  },
  workers: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  workersFullyBooked: {
    color: '#FF3B30',
  },
});
