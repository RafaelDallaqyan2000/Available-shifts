import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
  shiftsCountText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginTop: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
});
