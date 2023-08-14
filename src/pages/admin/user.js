import { Breadcrumb,Button,Descriptions,Modal,Typography, message,Input,Form,Select } from "antd"
import { RxDashboard } from "react-icons/rx"
import {DownloadOutlined} from "@ant-design/icons"
import { useEffect,useState,useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { useStages} from "../../hooks/stages";
import { useUpdateStudent } from "../../hooks/userQuery";
import { extractValueFromInputRef } from "../../utils/helpers";
import { useSessions } from "../../hooks/sessionsQuery";


const {Title} = Typography;
const {Option} = Select;




export default function SingleUser(){
    const [isOpen,setIsOpen] = useState(false);
    const {state:user} = useLocation();
    const [stage,setStage] = useState(user.Stage?.id);
    const [sess,setSess] = useState(user.Session.id)
    const navigate = useNavigate();

    useEffect(()=>{
        (!user || user == null || Object.keys(user).length <1) && navigate(-1)
    },[])


    const {stages} = useStages();
    const {sessions} = useSessions();
    const updateUser = useUpdateStudent();

    
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
        await updateUser(user.id,payload);
        message.success("User Data updates successfully")
        setIsOpen(false);
        return navigate(-1);
    }

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
                <div style={{marginTop:"2em",boxShadow:"3px 8px 17px 0px rgba(0,0,0,0.75)",padding:"1em 1em 2em 3em",borderRadius:"2px"}}>
                    <Descriptions column={1}>
                        <Descriptions.Item labelStyle={{marginRight:"2em",fontStyle:"italic"}} contentStyle={{marginBottom:"1em"}} label="Fullname">
                            <b>{user.fullname}</b>
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
                            <b>{user.Stage.label}</b>
                        </Descriptions.Item>
                    </Descriptions>
                    <div style={{display:"flex",justifyContent:"flex-end"}}>
                        <Button type="primary" onClick={()=>setIsOpen(true)}>
                            <BiEdit style={{fontSize:20}}/>
                            Edit User
                        </Button>
                    </div>
                </div>
            </div>
            <Modal open={isOpen} onCancel={()=>setIsOpen(false)} footer={null} title="Edit User">
                <Form initialValues={{...user}}>
                    <Form.Item name="fullname">
                        <Input ref={nameRef} placeholder="Enter Name"/>
                    </Form.Item>
                    <Form.Item name="registrationNumber">
                        <Input ref={regRef} placeholder="Enter Registration Number"/>
                    </Form.Item>
                    <Form.Item name="email" rules={[
                        {
                            type:"email",
                        }
                    ]}>
                        <Input ref={emailRef} placeholder="Enter Email"/>
                    </Form.Item>
                    <Form.Item name="phone">
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
                    <Form.Item name="Stage">
                        <Select onChange={(e)=>setStage(e)} placeholder="Select Student Current Stage">
                            {
                                stages.map((s,idx)=>(
                                    <Option value={s.id} key={idx}>{s.name}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="department">
                        <Input ref={departmentRef} placeholder="Enter Enter Department"/>
                    </Form.Item>
                    <Form.Item wrapperCol={{
                                span:8,
                                offset:20
                              }}>
                        <Button onClick={handleSubmit} type="primary" style={{backgroundColor:"green"}}>
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}