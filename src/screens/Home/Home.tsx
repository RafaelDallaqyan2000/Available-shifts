import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { SafeAreaView } from 'react-native-safe-area-context';
import { shiftStore } from '../../stores';
import { styles } from './home.styles';

export const Home = observer(() => {
  useEffect(() => {
    asyncFetchShifts();
  }, []);

  const asyncFetchShifts = async () => {
    await shiftStore.initialize();
    await shiftStore.fetchShifts();
  };

  if (shiftStore.isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Получение геолокации...</Text>
      </SafeAreaView>
    );
  }

  if (shiftStore.error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{shiftStore.error}</Text>
        <Text style={styles.retryText} onPress={() => shiftStore.initialize()}>
          Попробовать снова
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Доступные смены</Text>
      {shiftStore.location && (
        <View style={styles.locationInfo}>
          <Text style={styles.locationText}>
            Широта: {shiftStore.location.latitude.toFixed(6)}
          </Text>
          <Text style={styles.locationText}>
            Долгота: {shiftStore.location.longitude.toFixed(6)}
          </Text>
          <Text style={styles.shiftsCountText}>
            Найдено смен: {shiftStore.shifts.length}
          </Text>
        </View>
      )}
      <Text style={styles.infoText}>
        Список смен загружен по вашей геолокации
      </Text>
    </SafeAreaView>
  );
});
