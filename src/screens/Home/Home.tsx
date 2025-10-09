import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ShiftListItem } from '../../components';
import {
  getShifts,
  initialize,
  RootSateType,
  shiftActions,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import { ShiftType } from '../../types';
import { styles } from './home.styles';

export const Home: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const shifts = useAppSelector((state: RootSateType) => state.shift.shifts);
  const isLoading = useAppSelector(
    (state: RootSateType) => state.shift.isLoading,
  );
  const error = useAppSelector((state: RootSateType) => state.shift.error);

  useEffect(() => {
    asyncFetchShifts();
  }, []);

  const asyncFetchShifts = async () => {
    const result = await dispatch(initialize());
    if (initialize.fulfilled.match(result) && result.payload.location) {
      dispatch(getShifts(result.payload.location));
    }
  };

  const handleShiftPress = (shift: ShiftType) => {
    dispatch(shiftActions.selectShift(shift));
    navigation.navigate('ShiftDetailScreen' as never);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <ActivityIndicator size="large" color="#6366F1" />
        <Text style={styles.loadingText}>Получение геолокации...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.retryText} onPress={asyncFetchShifts}>
          Попробовать снова
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Смены рядом</Text>
        <Text style={styles.subtitle}>Найдено: {shifts.length} смен</Text>
      </View>

      <FlatList
        data={shifts}
        keyExtractor={(item, index) => item.id || `shift-${index}`}
        renderItem={({ item }: { item: ShiftType }) => (
          <ShiftListItem shift={item} onPress={() => handleShiftPress(item)} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Смены не найдены</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};
