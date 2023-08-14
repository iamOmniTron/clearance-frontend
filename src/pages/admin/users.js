import { Breadcrumb,Typography,Tag, Button,Space, Modal,Input, Form, message, Spin, Select} from "antd";
import { RxDashboard } from "react-icons/rx";
import DataTable from "../../components/datatable";
import { FaUsers } from "react-icons/fa";
import { USERS } from "../../DB/users";
import {DownloadOutlined,PlusOutlined,UploadOutlined,EyeOutlined} from "@ant-design/icons"
import { BiTrash } from "react-icons/bi";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteUser, useRegisterUser, useUsers } from "../../hooks/userQuery";
import { extractValueFromInputRef } from "../../utils/helpers";
import RefreshContext from "../../context/refreshContext";
import { useStages } from "../../hooks/stages";
import { useSessions } from "../../hooks/sessionsQuery";

const {Title} = Typography;

const {Option} = Select;


const USERS_TABLE_COLUMNS = [
    {
        title:"S/N",
        key:"s/n",
        render:(_,__,idx)=>idx+1
    },
    {
        title:"Fullname",
        dataIndex:"fullname",
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
        dataIndex:"Stage",
        key:"Stage",
        render:(stage)=><Tag color="green">{stage?.label}</Tag>
    },
    {
        title:"Actions",
        key:"actions",
        render:(_,user)=><PreviewUser user={user}/>
    }
]


function PreviewUser({user}){
    const {flag,setFlag} = useContext(RefreshContext);

    const navigate = useNavigate();

    const deleteUser = useDeleteUser();

    const handleDeleteUser = async ()=>{
        await deleteUser(user.id);
        message.success("User deleted successfully");
        setFlag(!flag);
    }

    const handleNavigateToUserPreview = ()=>{
        return navigate("/admin/users/user",{state:user})
    }


    return(
        <>
            <Space wrap>
                <Button  type="primary" onClick={handleNavigateToUserPreview}>
                    <EyeOutlined style={{fontSize:20}}/>
                </Button>
                <Button onClick={handleDeleteUser} type="primary" danger>
                    <BiTrash style={{fontSize:20}}/>
                </Button>
            </Space>
        </>
    )
}


export default function ManageUsers(){
    const [isOpen,setIsOpen] = useState(false);
    const [stage,setStage] = useState(null);
    const [sess,setSess] = useState("");
    const {flag,setFlag} = useContext(RefreshContext);
    const {loading,users} = useUsers(flag);
    const {stages} = useStages();
    const {sessions} = useSessions();
    
    const createUser = useRegisterUser();

    const nameRef = useRef(null);
    const emailRef = useRef(null)
    const phoneRef = useRef(null)
    const departmentRef = useRef(null)
    const regRef = useRef(null)


    const handleSubmit = async ()=>{
        const payload = {
            fullname:extractValueFromInputRef(nameRef),
            email:extractValueFromInputRef(emailRef),
            phone:extractValueFromInputRef(phoneRef),
            department:extractValueFromInputRef(departmentRef),
            registrationNumber:extractValueFromInputRef(regRef),
            StageId:stage,
            SessionId:sess
        }
       const response = await createUser(payload);
        message.success(response??"user registered successfully");
        setIsOpen(false);
        setFlag(!flag);
    }


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
                <Spin spinning={loading}>
                 <DataTable data={users} cols={USERS_TABLE_COLUMNS}/>
                </Spin>
            </div>
            <Modal open={isOpen} onCancel={()=>setIsOpen(false)} footer={null} title="Add User">
                <Form>
                    <Form.Item>
                        <Input ref={nameRef} placeholder="Enter Name"/>
                    </Form.Item>
                    <Form.Item>
                        <Input ref={regRef} placeholder="Enter Registration Number"/>
                    </Form.Item>
                    <Form.Item rules={[
                        {
                            type:"email",
                        }
                    ]}>
                        <Input ref={emailRef} placeholder="Enter Email"/>
                    </Form.Item>
                    <Form.Item>
                        <Input ref={phoneRef} placeholder="Enter Phone"/>
                    </Form.Item>
                    <Form.Item name="Session">
                        <Select onChange={(e)=>setSess(e)} placeholder="Select Student Session">
                            {
                                sessions.map((s,idx)=>(
                                    <Option value={s.id} key={idx}>{s.title}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Select onChange={(e)=>setStage(e)} placeholder="Select Student Current Stage">
                            {
                                stages.map((s,idx)=>(
                                    <Option value={s.id} key={idx}>{s.name}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    {/* NOTE: this Will Eventually be Select dropdown */}
                    <Form.Item>
                        <Input ref={departmentRef} placeholder="Enter Enter Department"/>
                    </Form.Item>
                    <Form.Item wrapperCol={{
                                span:8,
                                offset:20
                              }}>
                        <Button onClick={handleSubmit} type="primary" style={{backgroundColor:"green"}}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}