import UserDashboardLayout from "./layout";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../../store/userStore";
import { useEffect } from "react";
import { message } from "antd";



export default function UserDashboard(){

    // const navigate = useNavigate();
    // const setUser = userStore(state=>state.setUser);
    // const user = {first:1}
    
    // useEffect(()=>{
    //     console.log("here")
    //     const synchronizeUserAuth = async ()=>{
    //         try{
    //             if(!user || Object.keys(user).length < 1){
    //                 message.error("User unauthenticated");
    //                 return navigate("/login");
    //             }
    //             setUser({...user});
    //             return;
    //         }catch(err){
    //             navigate("/");
    //             throw err;
    //         }
    //     }
    //     synchronizeUserAuth();
    // })

    return(
        <div>
            <UserDashboardLayout/>
        </div>
    )
}