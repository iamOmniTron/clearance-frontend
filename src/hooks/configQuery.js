import { useEffect, useState } from "react";
import { mutate, query,update,destroy} from "../utils/fetch"






export const useDocumentConfig = (flag)=>{
    const [loading,setLoading]= useState(false);
    const [documentConfigs,setDocumentConfig] = useState([]);

    useEffect(()=>{
        const getDocumentConfig = async ()=>{
            setLoading(true)
            const url = `config/document/get-all`;
            const {data} = await query(url);
            setDocumentConfig(data);
            setLoading(false);
        }
        getDocumentConfig();
    },[flag]);
    return {
        loading,documentConfigs
    }
}



export const useFormConfig = (flag)=>{
    const [loading,setLoading]= useState(false);
    const [formConfigs,setFormConfigs] = useState([]);

    useEffect(()=>{
        const getFormConfigs = async ()=>{
            setLoading(true)
            const url = `config/form/get-all`;
            const {data} = await query(url);
            setFormConfigs(data);
            setLoading(false);
        }
        getFormConfigs();
    },[flag]);
    return {
        loading,formConfigs
    }
}


export const useCreateFormConfig = ()=>{
    const createForm = async (payload)=>{
        const url = `config/form/create`;
        const {message} = await mutate(url,true,payload);
        return message;
    }
    return createForm;
}
export const useCreateDocumentConfig = ()=>{
    const createDocument = async (payload)=>{
        const url = `config/document/create`;
        const {message} = await mutate(url,true,payload);
        return message;
    }
    return createDocument;
}

export const useUpdateFormConfig = ()=>{

    const updateFormConfig = async (id,body)=>{
        const url = `config/form/update/${id}`;
        const response = await update(url,body);
        return response;
    }
    return updateFormConfig;
}

export const useUpdateDocumentConfig = ()=>{
    const updateDocumentConfig = async (id,body)=>{
        const url = `config/document/update/${id}`;
        const response = await update(url,body);
        return response;
    }
    return updateDocumentConfig;
}


export const useDeleteFormConfig = ()=>{
    const deleteFormConfig = async (id)=>{
        const url = `config/form/delete/${id}`;
        const response = await destroy(url);
        return response;
    }
    return deleteFormConfig
}

export const useDeleteDocumentConfig = ()=>{
    const deleteDocumentConfig = async (id)=>{
        const url = `config/document/delete/${id}`;
        const response = await destroy(url);
        return response;
    }
    return deleteDocumentConfig
}