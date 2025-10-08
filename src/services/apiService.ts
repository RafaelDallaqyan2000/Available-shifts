import axios from 'axios';
import { ShiftType, LocationType } from '../types';

const API_BASE_URL = 'https://mobile.handswork.pro/api';

const getShifts = async (location: LocationType): Promise<ShiftType[]> => {
  try {
    const data = await axios(
      `https://mobile.handswork.pro/api/shifts/map-list-unauthorized?latitude=${location.latitude}&longitude=${location.longitude}`,
    );

    if (data.data.status !== 200) {
      throw new Error('Failed to fetch shifts');
    }

    return data.data.data;
  } catch (error) {
    console.error('Error fetching shifts:', error);
    throw error;
  }
};

export const apiService = {
  getShifts,
};
