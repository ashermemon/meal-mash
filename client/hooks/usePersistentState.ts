import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

export function usePersistentState<T>(
  read: () => T,
  write: (value: T) => void,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(read);
  const isHydrating = useRef(true);

  useEffect(() => {
    if (isHydrating.current) {
      isHydrating.current = false;
      return;
    }
    write(value);
  }, [value, write]);

  return [value, setValue];
}
