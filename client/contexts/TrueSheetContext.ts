import React, { createContext, useContext, ReactNode } from "react";
import { TrueSheet } from "@lodev09/react-native-true-sheet";

interface TrueSheetContextType {
  sheetRef: React.RefObject<any> | null;
  openSheet: (
    options: string[],
    onSelect: (option: string) => void,
    title: string,
  ) => void;
  currentOptions: string[];
  currentOnSelect: ((option: string) => void) | null;
  currentTitle: string;
}

const TrueSheetContext = createContext<TrueSheetContextType | undefined>(
  undefined,
);

export const useTrueSheet = () => {
  const context = useContext(TrueSheetContext);
  if (context === undefined) {
    throw new Error("err, no provider");
  }
  return context;
};

interface TrueSheetProviderProps {
  children: ReactNode;
  sheetRef: React.RefObject<any>;
  openSheet: (
    options: string[],
    onSelect: (option: string) => void,
    title: string,
  ) => void;
  currentOptions: string[];
  currentOnSelect: ((option: string) => void) | null;
  currentTitle: string;
}

export const TrueSheetProvider = ({
  children,
  sheetRef,
  openSheet,
  currentOptions,
  currentOnSelect,
  currentTitle,
}: TrueSheetProviderProps) => {
  return React.createElement(
    TrueSheetContext.Provider,
    {
      value: {
        sheetRef,
        openSheet,
        currentOptions,
        currentOnSelect,
        currentTitle,
      },
    },
    children,
  );
};
