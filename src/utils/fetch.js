import axios from "axios";
import {message} from "antd";
import { SERVER_URL,AUTH_TOKEN_NAME } from "./defaults";

export const query = async (endpoint,query)=>{
    const token = sessionStorage.getItem(AUTH_TOKEN_NAME);
    try{
    const qs = serializeObjectToUrlParams(query);
    const {data:response} = await axios.get(`${SERVER_URL}/${endpoint}?${qs}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
    if(!response.success){
        return message.error(response.message);
    }
    return response;
    }catch(err){
        console.log(err)
        message.error(err?.response?.data?.message??err.message??"Something went wrong")
    }
}


export const mutate = async (endpoint, withCredentials, body, query) => {
    try {
        const token = sessionStorage.getItem(AUTH_TOKEN_NAME);
        const headerPayload = withCredentials ? {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`
            }
    } : {};
    const qs = serializeObjectToUrlParams(query);
    const res = await axios.post(`${SERVER_URL}/${endpoint}?${qs}`,{
        ...body
    },headerPayload);
    const {data:response} = res;
    if(!response.success){
        return message.error(response.message);
    }
    return response;
    }catch(err){
        console.log(err);
        message.error(err?.response?.data?.message??err.message??"Something went wrong")
        return;
    }
}

export const update = async (endpoint, body, query) => {
    const token = sessionStorage.getItem(AUTH_TOKEN_NAME);
    try {
        const token = sessionStorage.getItem(AUTH_TOKEN_NAME);
        const qs = serializeObjectToUrlParams(query);
        const {data: response} = await axios.put(`${SERVER_URL}/${endpoint}?${qs}`, {
            ...body
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response.success) {
            return message.error(response.message);
        }
    return response;
    }catch(err){
        message.error(err?.response?.data?.message??err.message??"Something went wrong")
        return;
    }
}


export const destroy = async (endpoint) => {
    const token = sessionStorage.getItem(AUTH_TOKEN_NAME);
    try {
        const token = sessionStorage.getItem(AUTH_TOKEN_NAME);
        const {data: response} = await axios.delete(`${SERVER_URL}/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    }catch(err){
        message.error(err?.response?.data?.message??err.message??"Something went wrong")
    }
}