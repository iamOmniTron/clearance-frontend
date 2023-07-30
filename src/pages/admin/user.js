import { Breadcrumb,Button,Descriptions,Typography } from "antd"
import { RxDashboard } from "react-icons/rx"
import {DownloadOutlined} from "@ant-design/icons"
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";


const {Title} = Typography;




export default function SingleUser(){
    const {state} = useLocation();
    console.log("state",state)
    const {user} = state;
    const navigate = useNavigate();

    useEffect(()=>{
        !user || user == null || Object.keys(user).length <1 && navigate(-1)
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
                {/* <div>
                    <Space>
                    <Button type="primary" style={{backgroundColor:"green"}}>
                        <UploadOutlined style={{fontSize:20}}/>
                        Upload via xls
                    </Button>
                    <Button type="primary">
                        <PlusOutlined/>
                        Add Student
                    </Button>
                    </Space>
                </div> */}
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
                <div style={{marginTop:"2em"}}>
                    <Descriptions>
                        <Descriptions.Item>
                            
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            </div>
        </>
    )
}