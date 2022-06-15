import { defineStore } from "pinia"
import type { ChatMessage } from "@/ts/common/interfaces"

export type ChatState = {
  messages: ChatMessage[]
}

export const useChatStore = defineStore( "MessageStore", {
  state: () => {
    return {
      messages: []
    } as ChatState
  },

  actions: {

  }

  // getters
})