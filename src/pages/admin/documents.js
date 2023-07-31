import { Breadcrumb,Space,Button,Modal,Form,Typography, Input, Select } from "antd";
import { RxDashboard } from "react-icons/rx";
import { DOCUMENTS } from "../../DB/documentTypes";
import DataTable from "../../components/datatable";
import {HiOutlineDocumentText} from "react-icons/hi";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";

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
            <Modal open={isOpen} onCancel={()=>setIsOpen(false)} title="Update Document Type" footer={null}>
                <Form initialValues={{...document}}>
                    <Form.Item name="name">
                        <Input placeholder="Enter Document Name"/>
                    </Form.Item>
                    <Form.Item name="type">
                        <Select placeholder="Select Document Format">
                            <Option value="docx">docx</Option>
                            <Option value="pdf">pdf</Option>
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
            </Modal>
        </>
    )
}




export default function DocumentsPage(){
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
                <DataTable data={DOCUMENTS} cols={DOCUMENTS_COLUMNS }/>
            </div>
            <Modal open={isOpen} onCancel={()=>setIsOpen(false)} title="Create Document Type" footer={null}>
                <Form>
                    <Form.Item>
                        <Input placeholder="Enter Document Name"/>
                    </Form.Item>
                    <Form.Item>
                    <Select placeholder="Select Document Format">
                        <Option value="docx">docx</Option>
                        <Option value="pdf">pdf</Option>
                    </Select>
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