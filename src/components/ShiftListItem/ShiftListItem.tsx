import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { ShiftType } from '../../types';
import { styles } from './shiftListItem.styles.ts';

interface ShiftListItemProps {
  shift: ShiftType;
  onPress: () => void;
}

export const ShiftListItem: React.FC<ShiftListItemProps> = ({
  shift,
  onPress,
}) => {
  const isFullyBooked =
    (shift?.currentWorkers ?? 0) >= (shift?.planWorkers ?? 0);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: shift.logo }}
        style={styles.logo}
        resizeMode="cover"
      />
      <View style={styles.leftSection}>
        <Text style={styles.workType} numberOfLines={1}>
          {shift.workTypes?.[0].name || 'Не указано'}
        </Text>
        <Text style={styles.companyName} numberOfLines={1}>
          {shift.companyName}
        </Text>
        <View style={styles.timeRow}>
          <Text style={styles.timeText}>{shift.dateStartByCity}</Text>
          <Text style={styles.timeDivider}>•</Text>
          <Text style={styles.timeText}>
            {shift.timeStartByCity} - {shift.timeEndByCity}
          </Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.price}>{shift.priceWorker} ₽</Text>
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>
            ★ {shift?.customerRating?.toFixed(1) ?? '0.0'}
          </Text>
        </View>
        <View
          style={[styles.statusBadge, isFullyBooked && styles.statusBadgeFull]}
        >
          <Text
            style={[styles.statusText, isFullyBooked && styles.statusTextFull]}
          >
            {shift.currentWorkers}/{shift.planWorkers}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
