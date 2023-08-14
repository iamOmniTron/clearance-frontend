import { useEffect, useState } from "react";
import { mutate, query,update,destroy} from "../utils/fetch"



export const useSessions = (flag)=>{
    const [loading,setLoading]= useState(false);
    const [sessions,setSessions] = useState([]);

    useEffect(()=>{
        const getSessions = async ()=>{
            setLoading(true)
            const url = `session/get-all`;
            const {data} = await query(url);
            setSessions(data);
            setLoading(false)
        }
        getSessions();
    },[flag]);
    return {
        loading,sessions
    }
}

export const useCreateSession = ()=>{
    const createSession = async (payload)=>{
        const url = `session/create`;
        const {message} = await mutate(url,true,payload);
        return message;
    }
    return createSession;
}

export const useUpdateSession = ()=>{
    const updateSession = async (id,body)=>{
        const url = `session/update/${id}`;
        const response = await update(url,body);
        return response;
    }
    return updateSession;
}


export const useDeleteSession = ()=>{
    const deleteSession = async (id)=>{
        const url = `session/delete/${id}`;
        const response = await destroy(url);
        return response;
    }
    return deleteSession
}