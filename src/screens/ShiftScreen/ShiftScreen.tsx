import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ShiftType } from '../../types';
import { shiftStore } from '../../stores';
import { ShiftCard } from '../../components';
import { styles } from './shiftScreen.styles';

export const ShiftScreen = observer(() => {
  useEffect(() => {
    shiftStore.initialize();
  }, []);

  const handleShiftPress = (shift: ShiftType) => {
    shiftStore.selectShift(shift);
    console.log('Shift pressed:', shift.id);
  };

  const handleRefresh = () => {
    shiftStore.refreshShifts();
  };

  if (shiftStore.isLoading && shiftStore.shifts.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Загрузка смен...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (shiftStore.error && shiftStore.shifts.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>{shiftStore.error}</Text>
          <Text
            style={styles.retryText}
            onPress={() => shiftStore.initialize()}
          >
            Попробовать снова
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={shiftStore.shifts}
        keyExtractor={(item, index) => item.id || `shift-${index}`}
        renderItem={({ item }) => (
          <ShiftCard shift={item} onPress={() => handleShiftPress(item)} />
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={shiftStore.isRefreshing}
            onRefresh={handleRefresh}
            tintColor="#007AFF"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              В вашем городе пока нет доступных смен
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
});
