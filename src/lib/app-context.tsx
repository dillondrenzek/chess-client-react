import React, {
  useContext,
  createContext,
  PropsWithChildren,
  useState,
  useMemo,
  useCallback,
} from "react";

const defaultAppContext = {
  debugMode: false,
  setDebugMode: (a: boolean) => {
    return;
  },
};

const appContext = createContext<
  typeof defaultAppContext & {
    setDebugMode: (a: boolean) => void;
  }
>(defaultAppContext);

export function AppContextProvider(props: PropsWithChildren) {
  const [debugMode, setDebugMode] = useState(defaultAppContext.debugMode);

  const handleSetDebugMode = useCallback(
    (isDebugMode: boolean) => setDebugMode(isDebugMode),
    []
  );

  const value = useMemo(() => {
    return {
      ...defaultAppContext,
      debugMode,
      setDebugMode: handleSetDebugMode,
    };
  }, [debugMode, handleSetDebugMode]);

  return (
    <appContext.Provider value={value}>{props.children}</appContext.Provider>
  );
}

export function useAppContext() {
  return useContext(appContext);
}
