import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { locationService } from '../../services';
import { LocationType } from '../../types';

export function Home() {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    requestLocation();
  }, []);

  const requestLocation = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const userLocation = await locationService.getLocationWithPermission();

      if (userLocation) {
        setLocation(userLocation);
        console.log('Геолокация получена:', userLocation);
        // Здесь можно загрузить список смен по координатам
      } else {
        setError('Не удалось получить геолокацию');
      }
    } catch (err) {
      setError('Ошибка при получении геолокации');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Получение геолокации...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.retryText} onPress={requestLocation}>
          Попробовать снова
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Доступные смены</Text>
      {location && (
        <View style={styles.locationInfo}>
          <Text style={styles.locationText}>
            Широта: {location.latitude.toFixed(6)}
          </Text>
          <Text style={styles.locationText}>
            Долгота: {location.longitude.toFixed(6)}
          </Text>
        </View>
      )}
      <Text style={styles.infoText}>
        Список смен будет загружен по вашей геолокации
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F2F2F7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#8E8E93',
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  locationInfo: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
  },
  locationText: {
    fontSize: 14,
    color: '#3A3A3C',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
});
