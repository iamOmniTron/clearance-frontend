import AdminDashboardLayout from "./layout";
import { useNavigate } from "react-router-dom";
import { getUserProfile, userStore } from "../../../store/userStore";
import { useEffect } from "react";
import { message } from "antd";





export default function AdminDashboard(){
    const navigate = useNavigate();
    const setUser = userStore(state=>state.setUser);
    
    useEffect(()=>{
        const synchronizeUserAuth = async ()=>{
            try{
                const user = await getUserProfile();
                if(!user || Object.keys(user).length < 1){
                    message.error("User unauthenticated");
                    return navigate("/login");
                }
                setUser({...user});
                return;
            }catch(err){
                navigate("/");
                throw err;
            }
        }
        synchronizeUserAuth();
    })

    return <AdminDashboardLayout/>
}