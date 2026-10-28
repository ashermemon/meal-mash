import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { AppState } from "react-native";
import * as Notifications from "expo-notifications";
import { EventSubscription } from "expo-notifications";
import { registerForPushNotificationsAsync } from "@/utils/registerForPushNotificationsAsync";
import { scheduleEngagementNotifications } from "@/utils/notifications/scheduleEngagementNotifications";

interface NotificationContextType {
  expoPushToken: string | null;
  notification: Notifications.Notification | null;
  error: Error | null;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const notificationListener = useRef<EventSubscription | null>(null);
  const responseListener = useRef<EventSubscription | null>(null);

  useEffect(() => {
    let isMounted = true;

    registerForPushNotificationsAsync().then(
      async (token) => {
        if (isMounted) {
          setExpoPushToken(token);
          const { scheduleDailyNotification } = await import(
            "@/utils/scheduleDailyNotification"
          );
          await scheduleDailyNotification();
          await scheduleEngagementNotifications();
        }
      },
      (error) => {
        if (isMounted) setError(error);
      }
    );

    const appStateListener = AppState.addEventListener("change", (nextState) => {
      if (nextState === "active") {
        scheduleEngagementNotifications().catch(() => {});
      }
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification Received: ", notification);
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(
          "Notification Response: ",
          JSON.stringify(response, null, 2)
        );
      });

    return () => {
      isMounted = false;
      appStateListener.remove();
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{ expoPushToken, notification, error }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
