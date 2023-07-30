import { Button,Breadcrumb,Modal,Form,Input,Space, Tag,Typography, Select, Checkbox, Radio } from "antd"
import { RxDashboard } from "react-icons/rx";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import {BiSolidHourglass, BiTrash} from "react-icons/bi"
import { useState } from "react";
import { STAGES } from "../../DB/stages";
import DataTable from "../../components/datatable";
import { FORMS } from "../../DB/forms";

const {Title} = Typography;
const {Option} = Select;



const STAGES_COLUMN = [
    {
        title:"S/N",
        key:"s/n",
        render:(_,__,idx)=>idx+1
    },
    {
        title:"Name",
        key:"name",
        dataIndex:"name"
    },
    {
        title:"Label",
        key:"label",
        dataIndex:"label"
    },
    {
        title:"Is First",
        key:"isIndex",
        dataIndex:"isIndex",
        render:(isIndex)=>isIndex? <Tag color="green">Yes</Tag>:<Tag color="yellow">No</Tag>
    },
    {
        title:"Prerequisite Stage",
        key:"pre-stage",
        dataIndex:"prerequisiteStage",
        render:(pre,stage)=> stage.isIndex?<Tag color="blue">First Stage</Tag>: STAGES.find(s=>s.id ===pre).name
    },
    {
        title:"Screening Method",
        key:"method",
        dataIndex:"isForm",
        render:(_,stage)=>stage.isForm ? "Form" : stage.isUpload ? "Document Upload" : "None"
    },
    {
        title:"Actions",
        key:"actions",
        render:(_,stage)=><PreviewStage stage={stage}/>
    }
];



function PreviewStage({stage}){
    const [isOpen,setIsOpen] = useState(false);
    const [method,setMethod] = useState(stage.isForm?"form":stage.isUpload?"upload":"");

    return(
        <>
            <Space>
                <Button type="primary" onClick={()=>setIsOpen(true)}>
                    <EyeOutlined style={{
                        fontSize:20
                    }}/>
                </Button>
                <Button type="primary" danger>
                    <BiTrash style={{
                        fontSize:20
                    }}/>
                </Button>
            </Space>
            <Modal open={isOpen} onCancel={()=>setIsOpen(false)} footer={null} title="Add Stage">
            <Form initialValues={{...stage}}>
                    <Form.Item name="name">
                        <Input placeholder="Stage Name"/>
                    </Form.Item>
                    <Form.Item name="label">
                        <Input placeholder="Stage Label"/>
                    </Form.Item>
                    <Form.Item name="prerequisiteStage">
                        <Select placeholder="Select Prerequisite stage">
                            {
                                STAGES.map((s,idx)=>(
                                    <Option value={s.id} key={idx}>{s.name}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="isIndex">
                        <Checkbox checked={stage.isIndex} disabled={!stage.isIndex && STAGES.length > 0}>
                            Is First Item?
                        </Checkbox>
                    </Form.Item>
                    <span style={{fontWeight:"bold"}}>Screening Method</span>
                    <Form.Item>
                        <Radio.Group value={method} onChange={(e)=>setMethod(e.target.value)}>
                            <Radio value="form">Form</Radio>
                            <Radio value="upload">Document Upload</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {
                        method === "form" && 
                    <Form.Item name="formType">
                        <Select placeholder="Select Form Type">
                            {
                                FORMS.map((f,idx)=>(
                                    <Option key={idx} value={f.id}>{f.name}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    }
                    <Form.Item wrapperCol={{
                                span:8,
                                offset:20
                              }}>
                        <Button type="primary">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}



export default function StagesPage(){
    const [isOpen,setIsOpen] = useState(false)
    const [method,setMethod] = useState("");


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
                    <BiSolidHourglass style={{
                    fontSize:"1.5em"
                }}/>
                    Stages
                </Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    <Space>
                    <Button type="primary" onClick={()=>setIsOpen(true)}>
                        <PlusOutlined/>
                        Add Stage
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
                       ALL STAGES
                    </Title>
                </div>
                <DataTable data={STAGES} cols={STAGES_COLUMN}/>
            </div>
            <Modal open={isOpen} onCancel={()=>setIsOpen(false)} footer={null} title="Add Stage">
                <Form>
                    <Form.Item>
                        <Input placeholder="Stage Name"/>
                    </Form.Item>
                    <Form.Item>
                        <Input placeholder="Stage Label"/>
                    </Form.Item>
                    <Form.Item>
                    <Select placeholder="Select Prerequisite stage">
                        {
                            STAGES.map((s,idx)=>(
                                <Option value={s.id} key={idx}>{s.name}</Option>
                            ))
                        }
                    </Select>
                    </Form.Item>
                    <Form.Item>
                        <Checkbox disabled={STAGES.length >  0}>
                            Is First Item?
                        </Checkbox>
                    </Form.Item>
                    <span style={{fontWeight:"bold"}}>Screening Method</span>
                    <Form.Item>
                        <Radio.Group onChange={(e)=>setMethod(e.target.value)}>
                            <Radio value="form">Form</Radio>
                            <Radio value="upload">Document Upload</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {
                        method === "form" && 
                    <Form.Item>
                        <Select placeholder="Select Form Type">
                            {
                                FORMS.map((f,idx)=>(
                                    <Option key={idx} value={f.id}>{f.name}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    }
                    <Form.Item wrapperCol={{
                                span:8,
                                offset:20
                              }}>
                        <Button type="primary">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}