import { createAsyncThunk } from '@reduxjs/toolkit';
import { LocationType } from '../../types';
import { apiService } from '../../services';

export const getShifts = createAsyncThunk(
  'shift/fetchShifts',
  async (location: LocationType, { rejectWithValue }) => {
    try {
      const data = await apiService.getShifts(location);
      return data;
    } catch (error) {
      return rejectWithValue('Ошибка при загрузке смен');
    }
  },
);
