import { Breadcrumb,Space,Button,Modal,Form,Typography, Input, Select, Spin, message } from "antd";
import { RxDashboard } from "react-icons/rx";
import { DOCUMENTS } from "../../DB/documentTypes";
import DataTable from "../../components/datatable";
import {HiOutlineDocumentText} from "react-icons/hi";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { useContext, useRef, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { useCreateDocumentConfig, useDeleteDocumentConfig, useDocumentConfig, useUpdateDocumentConfig } from "../../hooks/configQuery";
import RefreshContext from "../../context/refreshContext";
import { extractValueFromInputRef } from "../../utils/helpers";

const {Title} = Typography;
const {Option} = Select;



const DOCUMENTS_COLUMNS = [
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
        title:"Format",
        key:"format",
        dataIndex:"type"
    },
    {
        title:"Actions",
        key:"actions",
        render:(_,document)=><DocumentPreview document={document}/>
    }
]


function DocumentPreview({document}){
    const [isOpen,setIsOpen] = useState(false);
    const [type,setType] = useState(document.type);

    const [form] = Form.useForm();
    const {flag,setFlag} = useContext(RefreshContext);

    const nameRef = useRef(null);
    
    const updateDocumentConfig = useUpdateDocumentConfig();
    const deleteDocumentConfig = useDeleteDocumentConfig();


    const handleDeleteDocumentConfig = async ()=>{
        await deleteDocumentConfig(document.id);
        message.success("Config deleted successfully");
        setFlag(!flag)
    }

    const handleSubmit = async ()=>{
        const payload = {
            name:extractValueFromInputRef(nameRef),
            type
        }
        await updateDocumentConfig(document.id,payload);
        message.success("Document Config updated successfully");
        form.resetFields();
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
                <Button onClick={handleDeleteDocumentConfig} type="primary" danger>
                    <BiTrash style={{
                        fontSize:20
                    }}/>
                </Button>
            </Space>
            <Modal open={isOpen} onCancel={()=>setIsOpen(false)} title="Update Document Type" footer={null}>
                <Form form={form} initialValues={{...document}}>
                    <Form.Item name="name">
                        <Input ref={nameRef} placeholder="Enter Document Name"/>
                    </Form.Item>
                    <Form.Item name="type">
                        <Select placeholder="Select Document Format" onChange={(e)=>setType(e)}>
                            <Option value="docx">docx</Option>
                        </Select>
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




export default function DocumentsPage(){
    const [isOpen,setIsOpen] = useState(false);
    const [type,setType] = useState("");

    const [form] = Form.useForm();
    const {flag,setFlag} = useContext(RefreshContext);

    const nameRef = useRef(null);


    const {loading,documentConfigs} = useDocumentConfig(flag);
    const createDocumentConfig = useCreateDocumentConfig();

    const handleSubmit = async ()=>{
        const payload = {
            name:extractValueFromInputRef(nameRef),
            type
        }
        await createDocumentConfig(payload);
        message.success("Document Config Created successfully");
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
                    <HiOutlineDocumentText style={{
                    fontSize:"1.5em"
                }}/>
                    Forms
                </Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    <Space>
                    <Button type="primary" onClick={()=>setIsOpen(true)}>
                        <PlusOutlined/>
                        Add Document Type
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
                       ALL DOCUMENT TYPES
                    </Title>
                </div>
                <Spin spinning={loading}>
                <DataTable data={documentConfigs} cols={DOCUMENTS_COLUMNS }/>
                </Spin>
            </div>
            <Modal open={isOpen} onCancel={()=>setIsOpen(false)} title="Create Document Type" footer={null}>
                <Form form={form}>
                    <Form.Item>
                        <Input ref={nameRef} placeholder="Enter Document Name"/>
                    </Form.Item>
                    <Form.Item>
                    <Select placeholder="Select Document Format" onChange={(e)=>setType(e)}>
                        <Option value="docx">docx</Option>
                    </Select>
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