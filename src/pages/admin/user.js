import { Breadcrumb,Button,Descriptions,Modal,Typography, message,Input,Form,Select, Space,Popconfirm } from "antd"
import { RxDashboard } from "react-icons/rx"
import {DownloadOutlined} from "@ant-design/icons"
import { useEffect,useState,useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {AiFillStepBackward,AiFillStepForward} from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { useAdvanceStudent, useReverseAdvanceStudent, useUpdateStudent } from "../../hooks/userQuery";
import { extractValueFromInputRef } from "../../utils/helpers";
import { useSessions } from "../../hooks/sessionsQuery";


const {Title} = Typography;
const {Option} = Select;




export default function SingleUser(){
    const [isOpen,setIsOpen] = useState(false);
    const [formLoading,setFormLoading] = useState(false);
    const {state:user} = useLocation();
    const [sess,setSess] = useState(user.Session.id)
    const navigate = useNavigate();

    useEffect(()=>{
        (!user || user == null || Object.keys(user).length <1) && navigate(-1)
    },[])

    const advanceUser = useAdvanceStudent();
    const revertUserStage = useReverseAdvanceStudent()
    const {sessions} = useSessions();
    const updateUser = useUpdateStudent();

    const handleAdvanceUser = async ()=>{
        const {message:response} = await advanceUser(user.id);
        message.success(response??"User stage advanced successfully");
        return navigate(-1)
    }
    const handleRevertUserStage = async ()=>{
        const {message:response} = await revertUserStage(user.id);
        message.success(response??"User stage reverted successfully");
        return navigate(-1)
    }

    
    const nameRef = useRef(null);
    const emailRef = useRef(null)
    const phoneRef = useRef(null)
    const departmentRef = useRef(null)
    const regRef = useRef(null)

    const handleSubmit = async ()=>{
        try {
            setFormLoading(true)
            const payload = {
                fullname:extractValueFromInputRef(nameRef),
                email:extractValueFromInputRef(emailRef),
                phone:extractValueFromInputRef(phoneRef),
                department:extractValueFromInputRef(departmentRef),
                registrationNumber:extractValueFromInputRef(regRef),
                SessionId:sess
            }
            await updateUser(user.id,payload);
            message.success("User Data updates successfully")
            setIsOpen(false);
            return navigate(-1);
        } catch (error) {
            setFormLoading(false)
        }
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
                        {/* <Button icon={<DownloadOutlined style={{fontSize:20}}/>} type="primary" style={{backgroundColor:"green"}}>
                            Download
                        </Button> */}
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
                    <Space wrap style={{display:"flex",justifyContent:"flex-end"}}>
                        <Popconfirm
                        title="Advance user stage"
                        description="are you sure you want to proceed?"
                        onConfirm={handleAdvanceUser}
                        okText="Yes"
                        cancelText="No"
                        >
                            <Button type="primary" style={{backgroundColor:"green",padding:"1em",display:"flex",alignItems:"center"}}>
                                <AiFillStepForward style={{fontSize:20}}/>
                                Advance User Stage
                            </Button>
                        </Popconfirm>
                        <Popconfirm
                        title="Revert user stage"
                        description="are you sure you want to proceed?"
                        onConfirm={handleRevertUserStage}
                        okText="Yes"
                        cancelText="No"
                        >
                        <Button type="primary" style={{backgroundColor:"orange",padding:"1em",display:"flex",alignItems:"center"}}>
                            <AiFillStepBackward style={{fontSize:20}}/>
                            Revert User Stage
                        </Button>
                        </Popconfirm>
                        <Button type="primary"  style={{padding:"1em",display:"flex",alignItems:"center"}} onClick={()=>setIsOpen(true)}>
                            <BiEdit style={{fontSize:20}}/>
                            Edit User
                        </Button>
                    </Space>
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
                    <Form.Item name="department">
                        <Input ref={departmentRef} placeholder="Enter Enter Department"/>
                    </Form.Item>
                    <Form.Item wrapperCol={{
                                span:8,
                                offset:20
                              }}>
                        <Button loading={formLoading} onClick={handleSubmit} type="primary" style={{backgroundColor:"green"}}>
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}