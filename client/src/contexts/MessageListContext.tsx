import { createContext } from "react";
import type { TMessage } from "../utils/types";

export type MessageListState = {
  msgList: TMessage[],
  setMsgList: (messages: TMessage[]) => void,
}

export const MessageListContext = createContext<MessageListState | null>(null);