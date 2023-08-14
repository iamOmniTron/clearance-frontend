import { create } from "zustand";
import { query } from "../utils/fetch";
import {persist,createJSONStorage} from "zustand/middleware";

export const getUserProfile = async ()=>{
    const profileEndpoint = 'profile';
    const {data} = await query(profileEndpoint);
    return data;
}


export const userStore = create(
    persist((set,get)=>({
                user:{},
                setUser: (profile)=>set(()=>({user:{...profile}})),
                logout: ()=>set(()=>({user:{}})),
                getUser: ()=>get().user
    }),
    {
        name:"revenue-app-key",
        storage:createJSONStorage(()=>sessionStorage)
    })
)