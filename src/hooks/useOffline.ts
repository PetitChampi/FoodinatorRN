import { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

interface OfflineState {
  isOnline: boolean;
  isOfflineReady: boolean;
  hasUpdate: boolean;
}

/**
 * Custom hook for managing network status in React Native
 */
export function useOffline(): OfflineState {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? true);
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return {
    isOnline,
    isOfflineReady: true, // React Native apps are always "ready" offline
    hasUpdate: false, // Update checking would be handled differently in RN
  };
}
