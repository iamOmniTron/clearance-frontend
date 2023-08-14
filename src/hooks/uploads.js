import {query, destroy, mutate, upload } from "../utils/fetch";
import { useEffect,useState} from "react";


export const useUploadForm = ()=>{
    const uploadForm = async (payload)=>{
        const url = `form/upload`;
        const {message} = await mutate(url,true,payload);
        return message;
    };
    return uploadForm;
}


export const useForms = (flag)=>{
    const [loading,setLoading]= useState(false);
    const [forms,setForms] = useState([]);

    useEffect(()=>{
        const getForms = async ()=>{
            setLoading(true)
            const url = `form/get-all`;
            const {data} = await query(url);
            setForms(data);
            setLoading(false);
        }
        getForms();
    },[flag]);
    return {
        loading,forms
    }
}



export const useDeleteForm = ()=>{
    const deleteForm = async (id)=>{
        const url = `form/delete/${id}`;
        const {message}= await destroy(url);
        return message;
    }
    return deleteForm;
}



export const useFileUpload = ()=>{
    const uploadFile = async (formData)=>{
        const url = `document/upload`;
        const {message} = await upload(url,true,formData);
        return message;
    }
    return uploadFile;
}

export const useDocuments = (flag)=>{
    const [loading,setLoading]= useState(false);
    const [documents,setDocuments] = useState([]);

    useEffect(()=>{
        const getDocuments = async ()=>{
            setLoading(true)
            const url = `document/get-all`;
            const {data} = await query(url);
            setDocuments(data);
            setLoading(false);
        }
        getDocuments();
    },[flag]);
    return {
        loading,documents
    }
}

export const useDeleteFile = ()=>{
    const deleteFile = async (id)=>{
        const url = `document/delete/${id}`;
        const {message}= await destroy(url);
        return message;
    }
    return deleteFile;
}
