import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ShiftType, LocationType } from '../types';
import { apiService, locationService } from '../services';
import { getShifts, initialize } from './thunks';

interface ShiftState {
  shifts: ShiftType[];
  selectedShift: ShiftType | null;
  location: LocationType | null;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
}

const initialState: ShiftState = {
  shifts: [],
  selectedShift: null,
  location: null,
  isLoading: false,
  isRefreshing: false,
  error: null,
};

const shiftSlice = createSlice({
  name: 'shift',
  initialState,
  reducers: {
    selectShift: (state, action: PayloadAction<ShiftType>) => {
      state.selectedShift = action.payload;
    },
    clearSelectedShift: state => {
      state.selectedShift = null;
    },
    setLocation: (state, action: PayloadAction<LocationType>) => {
      state.location = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
    reset: state => {
      state.shifts = [];
      state.selectedShift = null;
      state.location = null;
      state.isLoading = false;
      state.isRefreshing = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initialize.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initialize.fulfilled, (state, action) => {
        state.location = action.payload.location;
        state.isLoading = false;
      })
      .addCase(initialize.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      .addCase(getShifts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getShifts.fulfilled, (state, action) => {
        state.shifts = action.payload;
        state.isLoading = false;
      })
      .addCase(getShifts.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  },
});

export const {
  selectShift,
  clearSelectedShift,
  setLocation,
  clearError,
  reset,
} = shiftSlice.actions;

export default shiftSlice.reducer;
