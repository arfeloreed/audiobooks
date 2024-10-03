import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface AudiobooksContextType {
  showRegister: boolean;
  setShowRegister: Dispatch<SetStateAction<boolean>>;
}

export const AudiobooksContext = createContext<
  AudiobooksContextType | undefined
>(undefined);

interface AudiobooksProviderProps {
  children: ReactNode;
}

export function AudiobooksContextProvider({
  children,
}: AudiobooksProviderProps) {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <AudiobooksContext.Provider value={{ showRegister, setShowRegister }}>
      {children}
    </AudiobooksContext.Provider>
  );
}
