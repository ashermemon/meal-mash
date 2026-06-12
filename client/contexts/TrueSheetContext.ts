import React, { createContext, useContext, ReactNode } from "react";
import { TrueSheet } from "@lodev09/react-native-true-sheet";

interface TrueSheetContextType {
  sheetRef: React.RefObject<any> | null;
  openSheet: (
    options: string[],
    onSelect: (options: string[]) => void,
    title: string,
    selected?: string[],
  ) => void;
  currentOptions: string[];
  currentOnSelect: ((options: string[]) => void) | null;
  currentTitle: string;
  currentSelected: string[];
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
    onSelect: (options: string[]) => void,
    title: string,
    selected?: string[],
  ) => void;
  currentOptions: string[];
  currentOnSelect: ((options: string[]) => void) | null;
  currentTitle: string;
  currentSelected: string[];
}

export const TrueSheetProvider = ({
  children,
  sheetRef,
  openSheet,
  currentOptions,
  currentOnSelect,
  currentTitle,
  currentSelected,
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
        currentSelected,
      },
    },
    children,
  );
};
