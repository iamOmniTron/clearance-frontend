import { useContext, useRef, useState } from "react"
import { Breadcrumb,Button,Typography,Spin, DatePicker,Form,Input,Modal, Tag, Select,Space, message } from "antd";
import { RxDashboard } from "react-icons/rx";
import {BsFillCalendar2Fill} from "react-icons/bs";
import {PlusOutlined} from "@ant-design/icons"
import { SESSIONS } from "../../DB/sessions";
import { BiEdit,BiTrash } from "react-icons/bi";
import DataTable from "../../components/datatable";
import { useCreateSession, useDeleteSession, useSessions, useUpdateSession } from "../../hooks/sessionsQuery";
import { extractValueFromInputRef } from "../../utils/helpers";
import RefreshContext from "../../context/refreshContext";


const {Title} = Typography;
const {Option} = Select;


const SESSION_COLUMNS = [
    {
        title:"S/N",
        key:"s/n",
        render:(_,__,idx)=>idx+1
    },
    {
        title:"Title",
        key:"title",
        dataIndex:"title"
    },
    {
        title:"Year",
        key:"year",
        dataIndex:"value"
    },
    {
        title:"Status",
        key:"status",
        dataIndex:"active",
        render:(active)=>active? <Tag color="green">Active</Tag>:<Tag color="red">Not Active</Tag>
    },
    {
        title:"Actions",
        key:"actions",
        render:(_,session)=><SessionEdit session={session}/>
    }
]


function SessionEdit({session}){
    const [isLoading,setIsLoading] = useState(false);
    const [isOpen,setIsOpen] = useState(false);
    const [status,setStatus] = useState(session.active);
    const [year,setYear] = useState(session.value)

    const {flag,setFlag} = useContext(RefreshContext);


    const deleteSession = useDeleteSession();
    const updateSession = useUpdateSession();

    const titleRef = useRef(null);


    const handleDeleteSession = async ()=>{
        try {
            setIsLoading(true)
            await deleteSession(session.id);
            message.success("Session deleted successfully");
            setIsLoading(false);
            setFlag(!flag)
        } catch (error) {
            setIsLoading(false);
        }
    }

    const handleSubmit = async ()=>{
        try {
            setIsLoading(true);     
            const payload = {
                title:extractValueFromInputRef(titleRef),
                value:year,
                active:status
            }
            await updateSession(session.id,payload);
            message.success("Session Updated successfully");
            setIsLoading(false);
            setFlag(!flag);
            setIsOpen(false);
        } catch (error) {
            setIsLoading(false)
        }
    }

    return(
        <>
            <Space>
                <Button type="primary" onClick={()=>setIsOpen(true)}>
                    <BiEdit style={{fontSize:20}}/>
                </Button>
                <Button isLoading={isLoading} type="primary" danger onClick={handleDeleteSession}>
                    <BiTrash style={{fontSize:20}}/>
                </Button>
            </Space>
            <Modal title="Edit Session" footer={null} open={isOpen} onCancel={()=>setIsOpen(false)}>
                <div>
                <Form initialValues={{...session}}>
                        <Form.Item name="title">
                            <Input ref={titleRef} placeholder="Enter Size Title"/>
                        </Form.Item>
                        <Form.Item>
                            <DatePicker style={{width:"100%"}} picker="year" onChange={(_,e)=>setYear(e)}/>
                        </Form.Item>
                        <Form.Item name="active">
                            <Select placeholder="select status" onChange={(e)=>setStatus(e)}>
                                <Option key={1} value={true}>ACTIVE</Option>
                                <Option key={2} value={false}>NOT ACTIVE</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item wrapperCol={{
                                span:8,
                                offset:20
                              }}>
                            <Button loading={isLoading} type="primary" style={{backgroundColor:"green"}} onClick={handleSubmit}>
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    )
}



export default function ManageSessions(){
    const [isOpen,setIsOpen] = useState(false);
    const [status,setStatus] = useState(false);
    const [year,setYear] = useState("");
    const [running,setRunning] = useState(false);


    const {flag,setFlag} = useContext(RefreshContext);


    const titleRef = useRef(null)


    const {loading,sessions} = useSessions(flag);
    const createSession = useCreateSession();

    const handleSubmit = async ()=>{
        try {
            setRunning(true)
            const payload = {
                title:extractValueFromInputRef(titleRef),
                value:year,
                active:status
            }
            await createSession(payload);
            message.success("Session Created successfully");
            setRunning(false);
            setIsOpen(false);
            setFlag(!flag);
            
        } catch (error) {
            setRunning(false);
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
                    <BsFillCalendar2Fill  style={{
                    fontSize:"1.5em"
                }}/>
                    Sessions
                </Breadcrumb.Item>
                </Breadcrumb>
                <Button type="primary" onClick={()=>setIsOpen(true)}>
                    <PlusOutlined/>
                    Create Session
                </Button>
            </div>
            <div style={{
                height:"100%",
                witdh:"95%",
                marginTop:"2em"
            }}>
                <div style={{height:"5em"}}>
                    <Title level={4}>
                        ALL SESSIONS
                    </Title>
                </div>
                <Spin spinning={loading}>
                    <DataTable cols={SESSION_COLUMNS} data={sessions} />
                </Spin>
            </div>
            <Modal title="Create Session" footer={null} open={isOpen} onCancel={()=>setIsOpen(false)}>
                <div>
                    <Form>
                        <Form.Item>
                            <Input ref={titleRef} placeholder="Enter Session Title"/>
                        </Form.Item>
                        <Form.Item>
                            <DatePicker placeholder="Select Year" picker="year" style={{width:"100%"}} onChange={(_,e)=>setYear(e)}/>
                        </Form.Item>
                        <Form.Item>
                            <Select placeholder="select status" onChange={(e)=>setStatus(e)}>
                                <Option key={1} value={true}>ACTIVE</Option>
                                <Option key={2} value={false}>NOT ACTIVE</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item wrapperCol={{
                                span:8,
                                offset:20
                              }}>
                            <Button loading={running} type="primary" style={{backgroundColor:"green"}} onClick={handleSubmit}>
                                Create
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>        
            
            </>
    )
}