import { useContext, createContext, PropsWithChildren } from "react";

const defaultAppContext = {
  debugMode: false,
};

const appContext = createContext(defaultAppContext);

export function AppContextProvider(props: PropsWithChildren) {
  return (
    <appContext.Provider value={defaultAppContext}>
      {props.children}
    </appContext.Provider>
  );
}

export function useAppContext() {
  return useContext(appContext);
}
