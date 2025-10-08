import { Platform, PermissionsAndroid, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { LocationType } from '../types';

const requestLocationPermission = async (): Promise<boolean> => {
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
};

const getCurrentLocation = async (): Promise<LocationType> => {
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
};

const getLocationWithPermission = async (): Promise<LocationType | null> => {
  try {
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      Alert.alert(
        'Геолокация недоступна',
        'Для работы приложения необходим доступ к геолокации',
      );
      return null;
    }

    const location = await getCurrentLocation();
    return location;
  } catch (error) {
    Alert.alert(
      'Ошибка',
      'Не удалось получить геолокацию. Проверьте настройки устройства.',
    );
    return null;
  }
};

export const locationService = {
  requestLocationPermission,
  getCurrentLocation,
  getLocationWithPermission,
};
