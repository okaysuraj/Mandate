import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

const DrawerContext = createContext();
const DrawerActionsContext = createContext();
export const useDrawerActions = () => useContext(DrawerActionsContext);

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }
  return context;
};

export const DrawerProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleDrawer = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const actions = useMemo(() => ({openDrawer, closeDrawer, toggleDrawer}), [openDrawer, closeDrawer, toggleDrawer]);
  const value = useMemo(() => ({isOpen, ...actions}), [isOpen, actions]);
  return <DrawerActionsContext.Provider value={actions}><DrawerContext.Provider value={value}>{children}</DrawerContext.Provider></DrawerActionsContext.Provider>;
};

export default DrawerContext;
