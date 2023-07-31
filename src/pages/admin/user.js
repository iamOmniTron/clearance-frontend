import { Breadcrumb,Button,Descriptions,Typography } from "antd"
import { RxDashboard } from "react-icons/rx"
import {DownloadOutlined} from "@ant-design/icons"
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";


const {Title} = Typography;




export default function SingleUser(){
    const {state:user} = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        (!user || user == null || Object.keys(user).length <1) && navigate(-1)
    },[])


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
                    <FaUser style={{
                    fontSize:"1.5em"
                }}/>
                    User
                </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div style={{
                height:"100%",
                witdh:"95%",
                marginTop:"2em"
            }}>
                <div style={{margin:"2em 0",display:"flex",justifyContent:"space-between"}}>
                    <Title level={3}>
                       STUDENT DETAILS
                    </Title>
                    <div>
                        <Button icon={<DownloadOutlined style={{fontSize:20}}/>} type="primary" style={{backgroundColor:"green"}}>
                            Download
                        </Button>
                    </div>
                </div>
                <div style={{marginTop:"2em",boxShadow:"3px 8px 17px 0px rgba(0,0,0,0.75)",padding:"1em",borderRadius:"2px"}}>
                    <Descriptions column={1}>
                        <Descriptions.Item labelStyle={{marginRight:"2em",fontStyle:"italic"}} contentStyle={{marginBottom:"1em"}} label="Fullname">
                            <b>{user.name}</b>
                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={{marginRight:"2em",fontStyle:"italic"}} contentStyle={{marginBottom:"1em"}} label="Registration Number">
                            <b>{user.registrationNumber}</b>
                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={{marginRight:"2em",fontStyle:"italic"}} contentStyle={{marginBottom:"1em"}} label="Department">
                            <b>{user.department}</b>
                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={{marginRight:"2em",fontStyle:"italic"}} contentStyle={{marginBottom:"1em"}} label="Phone Number">
                            <b>{user.phone}</b>
                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={{marginRight:"2em",fontStyle:"italic"}} contentStyle={{marginBottom:"1em"}} label="E-Mail">
                            <b>{user.email}</b>
                        </Descriptions.Item>
                        <Descriptions.Item labelStyle={{marginRight:"2em",fontStyle:"italic"}} contentStyle={{marginBottom:"1em"}} label="Current Stage">
                            <b>{user.status.label}</b>
                        </Descriptions.Item>
                    </Descriptions>
                    <div style={{display:"flex",justifyContent:"flex-end"}}>
                        <Button type="primary">
                            <BiEdit style={{fontSize:20}}/>
                            Edit User
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}