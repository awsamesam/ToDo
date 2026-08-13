import {
  createContext,
  useContext,
  useState,
} from "react";

import type { ReactNode } from "react";

import CustomizedSnackbars from "../CustomizedSnackbars.js";

type ToastContextType = {
  showHideToast: (message: string) => void;
};

const ToastContext =
  createContext<ToastContextType | null>(null);

type ToastProviderProps = {
  children: ReactNode;
};

export const ToastProvider = ({
  children,
}: ToastProviderProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  function showHideToast(message: string) {
    setOpen(true);
    setTitle(message);

    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    <ToastContext.Provider
      value={{
        showHideToast,
      }}
    >
      <CustomizedSnackbars
        open={open}
        title={title}
      />

      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);

  if (context === null) {
    throw new Error(
      "useToast must be used inside ToastProvider"
    );
  }

  return context;
};