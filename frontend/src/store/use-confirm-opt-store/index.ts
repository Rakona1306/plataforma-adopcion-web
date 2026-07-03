import { create } from "zustand"
import { UserRegistered } from "./interface/user-registered.interface"



interface Props {
    confirmOpt: boolean
    userRegistered: UserRegistered
    setConfirmOpt: (confirmOpt: boolean) => void
    setUserRegistered: (userRegistered: UserRegistered) => void
}

export const useConfirmOptStore = create<Props>((set) => ({
    confirmOpt: false,
    userRegistered: {
        email: "",
        password: "",
        name: "",
        lastName: ""
    },
    setConfirmOpt: (confirmOpt: boolean) => set({ confirmOpt }),
    setUserRegistered: (userRegistered: UserRegistered) => set({ userRegistered })
}))