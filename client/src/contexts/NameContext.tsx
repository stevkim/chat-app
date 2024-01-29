import { createContext } from "react";

export type NameState = {
  name: string | null,
  setName: (name: string) => void
}

export const NameContext = createContext<NameState | null>(null)