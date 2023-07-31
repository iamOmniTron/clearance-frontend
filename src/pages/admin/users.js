import { Breadcrumb,Typography,Tag, Button,Space, Modal,Input, Form} from "antd";
import { RxDashboard } from "react-icons/rx";
import DataTable from "../../components/datatable";
import { FaUsers } from "react-icons/fa";
import { USERS } from "../../DB/users";
import {DownloadOutlined,PlusOutlined,UploadOutlined,EyeOutlined} from "@ant-design/icons"
import { BiTrash } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const {Title} = Typography;


const USERS_TABLE_COLUMNS = [
    {
        title:"S/N",
        key:"s/n",
        render:(_,__,idx)=>idx+1
    },
    {
        title:"Fullname",
        dataIndex:"name",
        key:"name"
    },
    {
        title:"Registration Number",
        dataIndex:"registrationNumber",
        key:"registrationNumber"
    },
    {
        title:"E-Mail",
        dataIndex:"email",
        key:"email"
    },
    {
        title:"Department",
        key:"department",
        dataIndex:"department"
    },
    {
        title:"Current Progress",
        dataIndex:"status",
        key:"status",
        render:(status)=><Tag color="green">{status.label}</Tag>
    },
    {
        title:"Actions",
        key:"actions",
        render:(_,user)=><PreviewUser user={user}/>
    }
]


function PreviewUser({user}){

    const navigate = useNavigate();

    const handleNavigateToUserPreview = ()=>{
        return navigate("/admin/users/user",{state:user})
    }


    return(
        <>
            <Space>
                <Button type="primary" onClick={handleNavigateToUserPreview}>
                    <EyeOutlined style={{fontSize:20}}/>
                </Button>
                <Button type="primary" danger>
                    <BiTrash style={{fontSize:20}}/>
                </Button>
            </Space>
        </>
    )
}


export default function ManageUsers(){
    const [isOpen,setIsOpen] = useState(false);


    return (
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
                    <FaUsers style={{
                    fontSize:"1.5em"
                }}/>
                    Users
                </Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    <Space>
                    <Button type="primary" style={{backgroundColor:"green"}}>
                        <UploadOutlined style={{fontSize:20}}/>
                        Upload via xls
                    </Button>
                    <Button type="primary" onClick={()=>setIsOpen(true)}>
                        <PlusOutlined/>
                        Add Student
                    </Button>
                    </Space>
                </div>
            </div>
            <div style={{
                height:"100%",
                witdh:"95%",
                marginTop:"2em"
            }}>
                <div style={{margin:"2em 0",display:"flex",justifyContent:"space-between"}}>
                    <Title level={3}>
                       ALL STUDENTS
                    </Title>
                    <div>
                        <Button icon={<DownloadOutlined style={{fontSize:20}}/>} type="primary" style={{backgroundColor:"green"}}>
                            Download
                        </Button>
                    </div>
                </div>
                <DataTable data={USERS} cols={USERS_TABLE_COLUMNS}/>
            </div>
            <Modal open={isOpen} onCancel={()=>setIsOpen(false)} footer={null} title="Add User">
                <Form>
                    <Form.Item>
                        <Input placeholder="Enter Name"/>
                    </Form.Item>
                    <Form.Item>
                        <Input placeholder="Enter Registration Number"/>
                    </Form.Item>
                    <Form.Item rules={[
                        {
                            type:"email",
                        }
                    ]}>
                        <Input placeholder="Enter Email"/>
                    </Form.Item>
                    <Form.Item>
                        <Input placeholder="Enter Phone"/>
                    </Form.Item>
                    <Form.Item>
                        <Input placeholder="Enter Address"/>
                    </Form.Item>
                    {/* NOTE: this Will Eventually be Select dropdown */}
                    <Form.Item>
                        <Input placeholder="Enter Enter Department"/>
                    </Form.Item>
                    <Form.Item wrapperCol={{
                                span:8,
                                offset:20
                              }}>
                        <Button type="primary" style={{backgroundColor:"green"}}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}