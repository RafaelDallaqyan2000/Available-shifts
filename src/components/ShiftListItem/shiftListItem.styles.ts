import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 8,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: colors.borderLight,
    marginRight: 16,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  leftSection: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 16,
  },
  workType: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  companyName: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 10,
    fontWeight: '600',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 13,
    color: colors.textTertiary,
    fontWeight: '500',
  },
  timeDivider: {
    fontSize: 13,
    color: colors.border,
    marginHorizontal: 8,
  },
  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    minWidth: 90,
  },
  price: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.success,
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  ratingBadge: {
    backgroundColor: colors.warning + '15',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: colors.warning + '30',
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.warning,
  },
  statusBadge: {
    backgroundColor: colors.primary + '15',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  statusBadgeFull: {
    backgroundColor: colors.error + '15',
    borderColor: colors.error + '30',
  },
  statusText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  statusTextFull: {
    color: colors.error,
  },
});
