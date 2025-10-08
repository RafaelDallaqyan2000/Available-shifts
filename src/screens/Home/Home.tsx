import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ShiftType } from '../../types';
import { styles } from './home.styles';
import { ShiftListItem } from '../../components';
import { RootStackParamList } from '../../navigation/NavigationScreens';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import type { RootState } from '../../store';
import { getShifts, initialize } from '../../store/thunks';
import { selectShift } from '../../store/shiftSlice';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'HomeScreen'
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export const Home: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const shifts = useAppSelector((state: RootState) => state.shift.shifts);
  const isLoading = useAppSelector((state: RootState) => state.shift.isLoading);
  const error = useAppSelector((state: RootState) => state.shift.error);

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
    dispatch(selectShift(shift));
    navigation.navigate('ShiftDetailScreen');
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
