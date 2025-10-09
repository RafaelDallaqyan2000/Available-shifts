import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: colors.shadowDark,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: colors.surface,
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: colors.primaryLight,
    fontWeight: '600',
    opacity: 0.95,
  },
  listContent: {
    paddingTop: 20,
    paddingBottom: 24,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 17,
    color: colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  errorText: {
    fontSize: 17,
    color: colors.error,
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '600',
    paddingHorizontal: 32,
  },
  retryText: {
    fontSize: 17,
    color: colors.primary,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 14,
    paddingHorizontal: 32,
    backgroundColor: colors.primaryLight + '20',
    borderRadius: 12,
    overflow: 'hidden',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 120,
  },
  emptyText: {
    fontSize: 18,
    color: colors.textTertiary,
    textAlign: 'center',
    fontWeight: '600',
  },
});
