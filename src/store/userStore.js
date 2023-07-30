import { create } from "zustand";

import {persist,createJSONStorage} from "zustand/middleware";


export const userStore = create(
    persist(
        (set,get)=>({
            user:{},
            setUser: (profile)=>set(()=>({user:{...profile}})),
            logout: ()=>set(()=>({user:{}})),
            getUser: ()=>get().user
        }),
        {
            key:"voucher-app-user-key",
            storage: createJSONStorage(()=>sessionStorage)
        }
    )
)