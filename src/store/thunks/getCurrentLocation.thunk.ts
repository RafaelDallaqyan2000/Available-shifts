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

      return { location: userLocation };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка при загрузке данных',
      );
    }
  },
);
