import { asNumber, isRecord } from "./decode";
import { StorageKeys } from "./keys";
import { readRecord, writeRecord } from "./mmkv";

export const MAX_DAILY_NOTIFICATIONS = 3;
const DAILY_REMINDER_SLOTS = 1;

export type StoredNotificationState = {
  dailyCount: number;
  dailyCountDate: string | null;
  lastEngagementScheduleDate: string | null;
  lastFeaturedRecipeIndex: number;
};

export const defaultNotificationState: StoredNotificationState = {
  dailyCount: 0,
  dailyCountDate: null,
  lastEngagementScheduleDate: null,
  lastFeaturedRecipeIndex: -1,
};

export const decodeNotificationState = (
  value: unknown,
): StoredNotificationState => {
  if (!isRecord(value)) return { ...defaultNotificationState };

  return {
    dailyCount: asNumber(value.dailyCount),
    dailyCountDate:
      typeof value.dailyCountDate === "string" ? value.dailyCountDate : null,
    lastEngagementScheduleDate:
      typeof value.lastEngagementScheduleDate === "string"
        ? value.lastEngagementScheduleDate
        : null,
    lastFeaturedRecipeIndex: asNumber(value.lastFeaturedRecipeIndex, -1),
  };
};

export const readNotificationState = (): StoredNotificationState =>
  readRecord(StorageKeys.notifications, decodeNotificationState);

export const writeNotificationState = (
  state: StoredNotificationState,
): void => writeRecord(StorageKeys.notifications, state);

const todayKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
};

const withFreshDailyCount = (
  state: StoredNotificationState,
): StoredNotificationState =>
  state.dailyCountDate === todayKey()
    ? state
    : { ...state, dailyCount: 0, dailyCountDate: todayKey() };

export const canSendNotification = (): boolean => {
  const state = withFreshDailyCount(readNotificationState());
  return state.dailyCount < MAX_DAILY_NOTIFICATIONS - DAILY_REMINDER_SLOTS;
};

export const recordNotificationSent = (): void => {
  const state = withFreshDailyCount(readNotificationState());
  writeNotificationState({ ...state, dailyCount: state.dailyCount + 1 });
};

export const hasScheduledEngagementNotificationsToday = (): boolean =>
  readNotificationState().lastEngagementScheduleDate === todayKey();

export const markEngagementNotificationsScheduled = (): void => {
  const state = readNotificationState();
  writeNotificationState({ ...state, lastEngagementScheduleDate: todayKey() });
};

export const takeNextFeaturedRecipeIndex = (poolSize: number): number => {
  const state = readNotificationState();
  const next = (state.lastFeaturedRecipeIndex + 1 + poolSize) % poolSize;
  writeNotificationState({ ...state, lastFeaturedRecipeIndex: next });
  return next;
};
