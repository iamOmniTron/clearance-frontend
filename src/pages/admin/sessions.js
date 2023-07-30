import { useState } from "react"
import { Breadcrumb,Button,Typography,Spin, DatePicker,Form,Input,Modal, Tag, Select,Space } from "antd";
import { RxDashboard } from "react-icons/rx";
import {BsFillCalendar2Fill} from "react-icons/bs";
import {PlusOutlined} from "@ant-design/icons"
import { SESSIONS } from "../../DB/sessions";
import { BiEdit,BiTrash } from "react-icons/bi";
import DataTable from "../../components/datatable";


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
    const [isOpen,setIsOpen] = useState(false);

    return(
        <>
            <Space>
                <Button type="primary" onClick={()=>setIsOpen(true)}>
                    <BiEdit style={{fontSize:20}}/>
                </Button>
                <Button type="primary" danger>
                    <BiTrash style={{fontSize:20}}/>
                </Button>
            </Space>
            <Modal title="Edit Session" footer={null} open={isOpen} onCancel={()=>setIsOpen(false)}>
                <div>
                <Form initialValues={{...session}}>
                        <Form.Item name="title">
                            <Input placeholder="Enter Size Title"/>
                        </Form.Item>
                        <Form.Item>
                            <DatePicker style={{width:"100%"}} picker="year"/>
                        </Form.Item>
                        <Form.Item>
                            <Select placeholder="select status">
                                <Option>ACTIVE</Option>
                                <Option>NOT ACTIVE</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item wrapperCol={{
                                span:8,
                                offset:20
                              }}>
                            <Button type="primary" style={{backgroundColor:"green"}}>
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
                <Spin spinning={false}>
                    <DataTable cols={SESSION_COLUMNS} data={SESSIONS} />
                </Spin>
            </div>
            <Modal title="Create Session" footer={null} open={isOpen} onCancel={()=>setIsOpen(false)}>
                <div>
                    <Form>
                        <Form.Item>
                            <Input placeholder="Enter Session Title"/>
                        </Form.Item>
                        <Form.Item>
                            <DatePicker placeholder="Select Year" picker="year" style={{width:"100%"}}/>
                        </Form.Item>
                        <Form.Item>
                            <Select placeholder="select status">
                                <Option>ACTIVE</Option>
                                <Option>NOT ACTIVE</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item wrapperCol={{
                                span:8,
                                offset:20
                              }}>
                            <Button type="primary" style={{backgroundColor:"green"}}>
                                Create
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>        
            
            </>
    )
}