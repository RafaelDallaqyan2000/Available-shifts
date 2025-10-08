import { createAsyncThunk } from '@reduxjs/toolkit';
import { locationService } from '../../services';

export const initialize = createAsyncThunk(
  'shift/initialize',
  async (_, { rejectWithValue }) => {
    try {
      const userLocation = await locationService.getLocationWithPermission();

      if (!userLocation) {
        return rejectWithValue('Не удалось получить геолокацию');
      }

      const location = {
        latitude: 45.039268,
        longitude: 38.987221,
      };

      return { location };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка при загрузке данных',
      );
    }
  },
);
