import { Button,Breadcrumb,Modal,Form,Input,Space,message, Tag,Typography, Select, Checkbox, Radio, Spin } from "antd"
import { RxDashboard } from "react-icons/rx";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import {BiSolidHourglass, BiTrash} from "react-icons/bi"
import { useContext, useRef, useState } from "react";
import { STAGES } from "../../DB/stages";
import DataTable from "../../components/datatable";
import { FORMS } from "../../DB/forms";
import { useCreateStage, useDeleteStage, useStages, useUpdateStage } from "../../hooks/stages";
import RefreshContext from "../../context/refreshContext";
import { useDocumentConfig, useFormConfig } from "../../hooks/configQuery";
import { extractValueFromInputRef } from "../../utils/helpers";

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
        render:(pre,stage)=> stage.isIndex?<Tag color="blue">First Stage</Tag>:pre.name
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
    const [isIndex,setIsIndex] = useState(stage.isIndex);
    const [isForm,setIsForm] = useState(stage.isForm);
    const [isDocumentUpload,setIsDocumentUpload] = useState(stage.isDocumentUpload);
    const [formType,setFormType] = useState(stage.FormConfigId);
    const [documentType,setDocumentType] = useState(stage.DocumentConfigId);
    const [previousStage,setPreviousStage] = useState(stage.prerequisiteStageId);


    const {flag,setFlag} = useContext(RefreshContext);

    const {stages} = useStages(flag)
    const {formConfigs} = useFormConfig();
    const {documentConfigs} = useDocumentConfig();

    const deleteStage = useDeleteStage();
    const updateStage = useUpdateStage();

    const nameRef = useRef(null);
    const labelRef = useRef(null);

    const handleTypeSelect = (e)=>{
        if(e === "form"){
            setIsForm(true);
            setIsDocumentUpload(false);
            setDocumentType(null)
        }
        if(e === "upload"){
            setIsForm(false);
            setIsDocumentUpload(true);
            setFormType(null);
        }
    }

    const handleDeleteStage = async ()=>{
        await deleteStage(stage.id);
        message.success("Stage Deleted successfully");
        setFlag(!flag);
    }

    const handleUpdateStage = async ()=>{
        const payload = {
            name:extractValueFromInputRef(nameRef),
            label:extractValueFromInputRef(labelRef),
            isIndex,
            isForm,
            isUpload:isDocumentUpload,
            formType,
            documentType,
            previousStage
        }
        await updateStage(stage.id,payload);
        message.success("Stage Updated successfully");
        setIsOpen(false);
        setFlag(!flag);
    }
    return(
        <>
            <Space>
                <Button type="primary" onClick={()=>setIsOpen(true)}>
                    <EyeOutlined style={{
                        fontSize:20
                    }}/>
                </Button>
                <Button type="primary" danger onClick={handleDeleteStage}>
                    <BiTrash style={{
                        fontSize:20
                    }}/>
                </Button>
            </Space>
            <Modal open={isOpen} onCancel={()=>setIsOpen(false)} footer={null} title="Add Stage">
            <Form initialValues={{...stage}}>
                    <Form.Item name="name">
                        <Input ref={nameRef} placeholder="Stage Name"/>
                    </Form.Item>
                    <Form.Item name="label">
                        <Input ref={labelRef} placeholder="Stage Label"/>
                    </Form.Item>
                    <Form.Item name="prerequisiteStage">
                        <Select placeholder="Select Prerequisite stage" onChange={(e)=>setPreviousStage(e)}>
                            {
                                (stages.filter(s=>s.id !== stage.id)).map((s,idx)=>(
                                    <Option value={s.id} key={idx}>{s.name}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="isIndex">
                        <Checkbox checked={stage.isIndex} onChange={(e)=>e.target.checked?setIsIndex(true):setIsIndex(false)} disabled={!stage.isIndex && (stages.filter(s=>s.id !== stage.id)).length > 0}>
                            Is First Item?
                        </Checkbox>
                    </Form.Item>
                    <span style={{fontWeight:"bold"}}>Screening Method</span>
                    <Form.Item name="">
                        <Radio.Group defaultValue={stage.isForm?"form":"upload"} onChange={(e)=>handleTypeSelect(e.target.value)}>
                            <Radio value="form">Form</Radio>
                            <Radio value="upload">Document Upload</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {
                         isForm && 
                    <Form.Item name="FormConfig">
                        <Select placeholder="Select Form Type">
                            {
                                formConfigs.map((f,idx)=>(
                                    <Option key={idx} value={f.id}>{f.name}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    }
                    {
                        isDocumentUpload && 
                        <Form.Item name="DocumentConfig">
                            <Select placeholder="Select Document Type" onChange={(e)=>setDocumentType(e)}>
                                {
                                    documentConfigs.map((d,idx)=>(
                                        <Option key={idx} value={d.id}>{d.name}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    }
                    <Form.Item wrapperCol={{
                                span:8,
                                offset:20
                              }}>
                        <Button type="primary" onClick={handleUpdateStage}>
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
    const [isIndex,setIsIndex] = useState(false);
    const [isForm,setIsForm] = useState(false);
    const [isDocumentUpload,setIsDocumentUpload] = useState(false);
    const [formType,setFormType] = useState(null);
    const [documentType,setDocumentType] = useState(null);
    const [previousStage,setPreviousStage] = useState(null);


    const nameRef = useRef(null);
    const labelRef = useRef(null);

    const handleTypeSelect = (e)=>{
        if(e === "form"){
            setIsForm(true);
            setIsDocumentUpload(false);
            setDocumentType(null)
        }
        if(e === "upload"){
            setIsForm(false);
            setIsDocumentUpload(true);
            setFormType(null);
        }
    }

    const {flag,setFlag} = useContext(RefreshContext);

    const {loading,stages} = useStages(flag)
    const {formConfigs} = useFormConfig();
    const {documentConfigs} = useDocumentConfig();
    const createStage = useCreateStage()


    const handleSubmit = async ()=>{
        const payload = {
            name:extractValueFromInputRef(nameRef),
            label:extractValueFromInputRef(labelRef),
            isIndex,
            isForm,
            isUpload:isDocumentUpload,
            formType,
            documentType,
            previousStage
        }
        await createStage(payload);
        message.success("Stage Created Successfully");
        setIsOpen(false);
        setFlag(!flag);
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
                <Spin spinning={loading}>
                    <DataTable data={stages} cols={STAGES_COLUMN}/>
                </Spin>
            </div>
            <Modal open={isOpen} onCancel={()=>setIsOpen(false)} footer={null} title="Add Stage">
                <Form>
                    <Form.Item>
                        <Input ref={nameRef} placeholder="Stage Name"/>
                    </Form.Item>
                    <Form.Item>
                        <Input ref={labelRef} placeholder="Stage Label"/>
                    </Form.Item>
                    <Form.Item>
                    <Select placeholder="Select Prerequisite stage" onChange={(e)=>setPreviousStage(e)}>
                        {
                            stages.map((s,idx)=>(
                                <Option value={s.id} key={idx}>{s.name}</Option>
                            ))
                        }
                    </Select>
                    </Form.Item>
                    <Form.Item>
                        <Checkbox checked={isIndex} onChange={(e)=>e.target.checked?setIsIndex(true):setIsIndex(false)} disabled={stages.length >  0}>
                            Is First Item?
                        </Checkbox>
                    </Form.Item>
                    <span style={{fontWeight:"bold"}}>Screening Method</span>
                    <Form.Item>
                        <Radio.Group onChange={(e)=>handleTypeSelect(e.target.value)}>
                            <Radio value="form">Form</Radio>
                            <Radio value="upload">Document Upload</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {
                        isForm && 
                    <Form.Item>
                        <Select placeholder="Select Form Type" onChange={(e)=>setFormType(e)}>
                            {
                                formConfigs.map((f,idx)=>(
                                    <Option key={idx} value={f.id}>{f.name}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    }
                    {
                        isDocumentUpload && 
                        <Form.Item>
                            <Select placeholder="Select Document Type" onChange={(e)=>setDocumentType(e)}>
                                {
                                    documentConfigs.map((d,idx)=>(
                                        <Option key={idx} value={d.id}>{d.name}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    }
                    <Form.Item wrapperCol={{
                                span:8,
                                offset:20
                              }}>
                        <Button type="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}