import { Breadcrumb,Tag,Descriptions, message } from "antd"
import { BiSync } from "react-icons/bi"
import { RxDashboard } from "react-icons/rx"
import { STAGES } from "../../../DB/stages";
import { getUserProfile, userStore } from "../../../store/userStore";
import { FileUpload } from "./fileUpload";
import UserForm from "./form";
import { useStages } from "../../../hooks/stages";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";





export default function Facility(){

    const u = userStore(state=>state.user);
    const [user,setUser] = useState(u);

    const navigate = useNavigate();

    useEffect(()=>{
        const getUser = async ()=>{
            const response = await getUserProfile();
            if(!response){
                message.success("User unauthenticated");
                return navigate("/login");
            }
            const {password,...data} = response;
            setUser(data);
        }
        getUser();
    },[])

    
    const userStage = user?.Stage;


    return(
        <>
             <div style={{
                    display:"flex",
                    justifyContent:"space-between",
                    padding:"1em",
                    marginTop:"1em",
                    marginBottom:"1em",
                    boxShadow:"3px 8px 17px 0px rgba(0,0,0,0.75)"
                }}>

                <Breadcrumb>
                <Breadcrumb.Item>
                <RxDashboard style={{
                    fontSize:"1.5em"
                }}/>
                    Dashboard
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <BiSync style={{
                    fontSize:"1.5em"
                }}/>
                    Facility
                </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div style={{
                height:"100%",
                width:"95%",
                marginTop:"2em"
            }}>
                <Descriptions style={{marginTop:"3em"}} column={1}>
                    <Descriptions.Item label="Previous Stage">
                        {userStage.prerequisiteStage ? userStage.prerequisiteStage.label : "None"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Current Stage/Process">
                        {userStage?.name}
                    </Descriptions.Item>
                    <Descriptions.Item contentStyletyle={{marginRight:"3em"}} label="Action Required">
                    {
                        userStage?.isUpload? (
                            <>
                                <FileUpload userStage={userStage}/>
                            </>
                        ):userStage?.isForm ? (
                            <>
                                <UserForm userStage={userStage}/>
                            </>
                        ): <Tag color={"yellow"}>None</Tag>
                    }
                    </Descriptions.Item>
                </Descriptions>
            </div>
        </>
    )
}