import React from 'react';
import { Image, ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootSateType, useAppSelector } from '../../store';
import { styles } from './shiftDetailScreen.styles.ts';

export const ShiftDetailScreen: React.FC = () => {
  const shift = useAppSelector(
    (state: RootSateType) => state.shift.selectedShift,
  );

  if (!shift) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Смена не найдена</Text>
      </SafeAreaView>
    );
  }

  const isFullyBooked =
    (shift?.currentWorkers ?? 0) >= (shift?.planWorkers ?? 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Image
            source={{ uri: shift.logo }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.companyName}>{shift.companyName}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>
              ★ {shift?.customerRating?.toFixed(1) ?? '0.0'}
            </Text>
            <Text style={styles.feedbackCount}>
              ({shift.customerFeedbacksCount} отзывов)
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Тип работы</Text>
          <Text style={styles.workType}>
            {shift.workTypes?.[0].name || 'Не указано'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Адрес</Text>
          <Text style={styles.address}>{shift.address}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Дата и время</Text>
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateTimeRow}>
              <Text style={styles.label}>Дата:</Text>
              <Text style={styles.value}>{shift.dateStartByCity}</Text>
            </View>
            <View style={styles.dateTimeRow}>
              <Text style={styles.label}>Время:</Text>
              <Text style={styles.value}>
                {shift.timeStartByCity} - {shift.timeEndByCity}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Информация о найме</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Набрано работников:</Text>
              <Text
                style={[
                  styles.workersValue,
                  isFullyBooked && styles.workersFullyBooked,
                ]}
              >
                {`${shift.currentWorkers}/${shift.planWorkers}`}
              </Text>
            </View>
            {isFullyBooked && (
              <Text style={styles.fullyBookedText}>Все места заняты</Text>
            )}
          </View>
        </View>

        <View style={[styles.section, styles.priceSection]}>
          <Text style={styles.sectionTitle}>Оплата за смену</Text>
          <Text style={styles.priceValue}>{shift.priceWorker} ₽</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
