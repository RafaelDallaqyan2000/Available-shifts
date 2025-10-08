import { observable, action, runInAction } from 'mobx';
import { ShiftType, LocationType } from '../types';
import { apiService, locationService } from '../services';

const createShiftStore = () => {
  const store = observable({
    shifts: [] as ShiftType[],
    selectedShift: null as ShiftType | null,
    location: null as LocationType | null,
    isLoading: false,
    isRefreshing: false,
    error: null as string | null,

    setLocation: action((location: LocationType) => {
      store.location = location;
    }),

    selectShift: action((shift: ShiftType) => {
      store.selectedShift = shift;
    }),

    clearSelectedShift: action(() => {
      store.selectedShift = null;
    }),

    initialize: action(async () => {
      store.isLoading = true;
      store.error = null;

      try {
        const userLocation = await locationService.getLocationWithPermission();

        if (!userLocation) {
          runInAction(() => {
            store.error = 'Не удалось получить геолокацию';
            store.isLoading = false;
          });
          return;
        }

        runInAction(() => {
          //   store.location = userLocation;
          store.location = {
            latitude: 45.039268,
            longitude: 38.987221,
          };
          store.isLoading = false;
        });
      } catch (error) {
        runInAction(() => {
          store.error =
            error instanceof Error
              ? error.message
              : 'Ошибка при загрузке данных';
          store.isLoading = false;
        });
      }
    }),

    fetchShifts: action(async () => {
      if (!store.location) {
        store.error = 'Геолокация не установлена';
        return;
      }

      store.isLoading = true;
      store.error = null;

      try {
        const data = await apiService.getShifts(store.location);
        console.log(data);

        runInAction(() => {
          store.shifts = data;
          store.isLoading = false;
        });
      } catch (error) {
        runInAction(() => {
          store.error = 'Ошибка при загрузке смен';
          store.isLoading = false;
        });
      }
    }),

    refreshShifts: action(async () => {
      if (!store.location) {
        return;
      }

      store.isRefreshing = true;

      try {
        const data = await apiService.getShifts(store.location);

        runInAction(() => {
          store.shifts = data;
          store.error = null;
          store.isRefreshing = false;
        });
      } catch (error) {
        runInAction(() => {
          store.error =
            error instanceof Error ? error.message : 'Ошибка при обновлении';
          store.isRefreshing = false;
        });
      }
    }),

    getShiftById: (id: string): ShiftType | undefined => {
      return store.shifts.find(shift => shift.id === id);
    },

    clearError: action(() => {
      store.error = null;
    }),

    reset: action(() => {
      store.shifts = [];
      store.selectedShift = null;
      store.location = null;
      store.isLoading = false;
      store.isRefreshing = false;
      store.error = null;
    }),
  });

  return store;
};

export const shiftStore = createShiftStore();
