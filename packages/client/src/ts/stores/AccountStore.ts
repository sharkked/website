import { defineStore } from "pinia"
import type { User } from "../../../../common/types"

export type UserState = {
  users: User[]
}

export const useUserStore = defineStore( "UserStore", {
  state: () => {
    return {
      users: []
    } as UserState
  },

  actions: {
    async fill() {
      this.users = (await import("../../data/users.json")).default
      let friends = "hi"
      friends ??= "cool"
    }
  }

  // getters
})