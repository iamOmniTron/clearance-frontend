import { useEffect, useState } from "react";
import { mutate, query,update,destroy} from "../utils/fetch"



export const useUsers = (flag)=>{
    const [loading,setLoading]= useState(false);
    const [users,setUsers] = useState([]);

    useEffect(()=>{
        const getUsers = async ()=>{
            setLoading(true)
            const url = `student/get-all`;
            const {data} = await query(url);
            setUsers(data);
            setLoading(false);
        }
        getUsers();
    },[flag]);
    return {
        loading,users
    }
}


export const useGetUser = (flag)=>{
    const getUser = async (regNumber)=>{
        const url = `student/find/${regNumber}`
        const {data} = await query(url);
        return data;
    }
    return getUser;
}


export const useRegisterUser = ()=>{
    const register = async (payload)=>{
        const url = `student/register`;
        const {message} = await mutate(url,true,payload);
        return message;
    }
    return register;
}



export const useUpdateStudent = ()=>{
    const updateStudent = async (id,body)=>{
        const url = `student/update/${id}`;
        const response = await update(url,body);
        return response;
    }
    return updateStudent;
}


export const useDeleteUser = ()=>{
    const deleteUser = async (id)=>{
        const url = `student/delete/${id}`;
        const response = await destroy(url);
        return response;
    }
    return deleteUser;
}