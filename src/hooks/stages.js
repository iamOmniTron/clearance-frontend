import { useEffect, useState } from "react";
import { mutate, query,update,destroy} from "../utils/fetch"



export const useStages = (flag)=>{
    const [loading,setLoading]= useState(false);
    const [stages,setStages] = useState([]);

    useEffect(()=>{
        const getStages = async ()=>{
            setLoading(true)
            const url = `stage/get-all`;
            const {data} = await query(url);
            setStages(data);
            setLoading(false);
        }
        getStages();
    },[flag]);
    return {
        loading,stages
    }
}

export const useCreateStage = ()=>{
    const createStage = async (payload)=>{
        const url = `stage/create`;
        const {message} = await mutate(url,true,payload);
        return message;
    }
    return createStage;
}

export const useUpdateStage = ()=>{
    const updateStage = async (id,body)=>{
        const url = `stage/update/${id}`;
        const response = await update(url,body);
        return response;
    }
    return updateStage;
}


export const useDeleteStage = ()=>{
    const deleteStage = async (id)=>{
        const url = `stage/delete/${id}`;
        const response = await destroy(url);
        return response;
    }
    return deleteStage
}