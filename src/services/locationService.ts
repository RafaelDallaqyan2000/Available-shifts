import { Platform, PermissionsAndroid, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { LocationType } from '../types';

export class LocationService {
  async requestLocationPermission(): Promise<boolean> {
    if (Platform.OS === 'ios') {
      const result = await Geolocation.requestAuthorization('whenInUse');
      return result === 'granted';
    }

    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Разрешение на геолокацию',
            message:
              'Приложению необходим доступ к вашей геолокации для поиска смен в вашем городе',
            buttonPositive: 'Разрешить',
            buttonNegative: 'Отмена',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.error('Error requesting location permission:', err);
        return false;
      }
    }

    return false;
  }

  async getCurrentLocation(): Promise<LocationType> {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        error => {
          console.error('Error getting location:', error);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    });
  }

  async getLocationWithPermission(): Promise<LocationType | null> {
    try {
      const hasPermission = await this.requestLocationPermission();

      if (!hasPermission) {
        Alert.alert(
          'Геолокация недоступна',
          'Для работы приложения необходим доступ к геолокации',
        );
        return null;
      }

      const location = await this.getCurrentLocation();
      return location;
    } catch (error) {
      Alert.alert(
        'Ошибка',
        'Не удалось получить геолокацию. Проверьте настройки устройства.',
      );
      return null;
    }
  }
}

export const locationService = new LocationService();
