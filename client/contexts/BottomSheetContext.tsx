import React, { createContext, useContext, ReactNode } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

interface BottomSheetContextType {
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>;
  openBottomSheet: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
  undefined,
);

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (context === undefined) {
    throw new Error("useBottomSheet must be used within a BottomSheetProvider");
  }
  return context;
};

interface BottomSheetProviderProps {
  children: ReactNode;
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>;
  openBottomSheet: () => void;
}

export const BottomSheetProvider = ({
  children,
  bottomSheetModalRef,
  openBottomSheet,
}: BottomSheetProviderProps) => {
  return (
    <BottomSheetContext.Provider
      value={{ bottomSheetModalRef, openBottomSheet }}
    >
      {children}
    </BottomSheetContext.Provider>
  );
};
